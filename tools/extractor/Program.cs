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
    default:
        Console.WriteLine("unknown command");
        break;
}
