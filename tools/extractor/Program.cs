using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CUE4Parse.Encryption.Aes;
using CUE4Parse.FileProvider;
using CUE4Parse.MappingsProvider;
using CUE4Parse.MappingsProvider.Usmap;
using CUE4Parse.UE4.Objects.Core.Misc;
using CUE4Parse.UE4.Versions;
using CUE4Parse.UE4.Assets.Exports.Texture;
using CUE4Parse_Conversion.Textures;
using SkiaSharp;
using Newtonsoft.Json;

// Usage:
//   Extractor list [EGame] [filter]          -> prints mounted file count, writes file list
//   Extractor export <outDir> <pathFilter> [EGame] [usmapPath]  -> exports matching assets to JSON
const string PakDir = @"E:\SteamLibrary\steamapps\common\nmrih2\NMRiH2\Content\Paks";

var cmd = args.Length > 0 ? args[0] : "list";
EGame ParseGame(string? s) => s != null && Enum.TryParse<EGame>(s, out var g) ? g : EGame.GAME_UE5_5;

DefaultFileProvider MakeProvider(EGame game, string? usmap)
{
    var provider = new DefaultFileProvider(PakDir, SearchOption.TopDirectoryOnly, new VersionContainer(game));
    if (usmap != null && File.Exists(usmap))
        provider.MappingsContainer = new FileUsmapTypeMappingsProvider(usmap);
    provider.Initialize();
    provider.SubmitKey(new FGuid(), new FAesKey(new byte[32]));
    provider.PostMount();
    return provider;
}

switch (cmd)
{
    case "list":
    {
        var game = ParseGame(args.Length > 1 ? args[1] : null);
        var filter = args.Length > 2 ? args[2] : null;
        var provider = MakeProvider(game, null);
        Console.WriteLine($"EGame: {game}");
        Console.WriteLine($"Mounted files: {provider.Files.Count}");
        var keys = provider.Files.Keys.AsEnumerable();
        if (filter != null) keys = keys.Where(k => k.Contains(filter, StringComparison.OrdinalIgnoreCase));
        var list = keys.OrderBy(k => k).ToList();
        var outPath = Path.Combine(AppContext.BaseDirectory, "file_list.txt");
        File.WriteAllLines(outPath, list);
        Console.WriteLine($"Wrote {list.Count} paths to {outPath}");
        foreach (var k in list.Take(40)) Console.WriteLine("  " + k);
        break;
    }
    case "export":
    {
        var outDir = args[1];
        var pathFilter = args[2];
        var game = ParseGame(args.Length > 3 ? args[3] : null);
        var usmap = args.Length > 4 ? args[4] : null;
        var provider = MakeProvider(game, usmap);
        Directory.CreateDirectory(outDir);
        var targets = provider.Files.Keys
            .Where(k => k.Contains(pathFilter, StringComparison.OrdinalIgnoreCase))
            .Where(k => k.EndsWith(".uasset") || k.EndsWith(".umap"))
            .ToList();
        Console.WriteLine($"Exporting {targets.Count} assets matching '{pathFilter}'...");
        int ok = 0, fail = 0;
        foreach (var path in targets)
        {
            try
            {
                var pkg = provider.LoadPackage(path);
                var json = JsonConvert.SerializeObject(pkg.GetExports(), Formatting.Indented);
                var rel = path.Replace('/', Path.DirectorySeparatorChar);
                var dest = Path.Combine(outDir, Path.ChangeExtension(rel, ".json"));
                Directory.CreateDirectory(Path.GetDirectoryName(dest)!);
                File.WriteAllText(dest, json);
                ok++;
            }
            catch (Exception e)
            {
                fail++;
                if (fail <= 20) Console.WriteLine($"FAIL {path}: {e.Message}");
            }
        }
        Console.WriteLine($"Done. ok={ok} fail={fail}");
        break;
    }
    case "texture":
    {
        var outDir = args[1];
        var pathFilter = args[2];
        var game = ParseGame(args.Length > 3 ? args[3] : null);
        var usmap = args.Length > 4 ? args[4] : null;
        var provider = MakeProvider(game, usmap);
        Directory.CreateDirectory(outDir);
        var targets = provider.Files.Keys
            .Where(k => k.Contains(pathFilter, StringComparison.OrdinalIgnoreCase))
            .Where(k => k.EndsWith(".uasset"))
            .ToList();
        Console.WriteLine($"Scanning {targets.Count} assets matching '{pathFilter}' for textures...");
        int ok = 0, fail = 0, skip = 0;
        foreach (var path in targets)
        {
            try
            {
                var pkg = provider.LoadPackage(path);
                UTexture2D? tex = null;
                foreach (var exp in pkg.GetExports())
                    if (exp is UTexture2D t) { tex = t; break; }
                if (tex == null) { skip++; continue; }
                var ctex = tex.Decode();
                if (ctex == null) { fail++; continue; }
                using var bitmap = ctex.ToSkBitmap();
                using var img = SKImage.FromBitmap(bitmap);
                using var data = img.Encode(SKEncodedImageFormat.Png, 100);
                var name = Path.GetFileNameWithoutExtension(path);
                var dest = Path.Combine(outDir, name + ".png");
                File.WriteAllBytes(dest, data.ToArray());
                ok++;
            }
            catch (Exception e)
            {
                fail++;
                if (fail <= 15) Console.WriteLine($"FAIL {path}: {e.Message}");
            }
        }
        Console.WriteLine($"Done. png={ok} notexture={skip} fail={fail}");
        break;
    }
    case "texraw":
    {
        var outDir = args[1];
        var pathFilter = args[2];
        var game = ParseGame(args.Length > 3 ? args[3] : null);
        var usmap = args.Length > 4 ? args[4] : null;
        var provider = MakeProvider(game, usmap);
        Directory.CreateDirectory(outDir);
        var targets = provider.Files.Keys
            .Where(k => k.Contains(pathFilter, StringComparison.OrdinalIgnoreCase))
            .Where(k => k.EndsWith(".uasset"))
            .ToList();
        Console.WriteLine($"Dumping raw mips for {targets.Count} assets matching '{pathFilter}'...");
        var manifest = new List<string>();
        int ok = 0, skip = 0, fail = 0;
        foreach (var path in targets)
        {
            try
            {
                var pkg = provider.LoadPackage(path);
                UTexture2D? tex = null;
                foreach (var exp in pkg.GetExports())
                    if (exp is UTexture2D t) { tex = t; break; }
                if (tex == null) { skip++; continue; }
                var mip = tex.GetFirstMip();
                var bytes = mip?.BulkData?.Data;
                if (mip == null || bytes == null || bytes.Length == 0) { fail++; continue; }
                var name = Path.GetFileNameWithoutExtension(path);
                File.WriteAllBytes(Path.Combine(outDir, name + ".bin"), bytes);
                manifest.Add($"{name}|{tex.Format}|{mip.SizeX}|{mip.SizeY}|{bytes.Length}");
                ok++;
            }
            catch (Exception e)
            {
                fail++;
                if (fail <= 15) Console.WriteLine($"FAIL {path}: {e.Message}");
            }
        }
        File.AppendAllLines(Path.Combine(outDir, "manifest.txt"), manifest);
        Console.WriteLine($"Done. raw={ok} notexture={skip} fail={fail}");
        break;
    }
    default:
        Console.WriteLine("unknown command");
        break;
}
