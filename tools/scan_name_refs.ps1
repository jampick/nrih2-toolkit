# Scan NMRiH2 firearm packages' name maps for IA_ attachment references.
# Drives CUE4Parse from PowerShell (net10 host) - no new compiled DLL needed.
param(
    [string]$PathFilter = "Blueprints/Items/Firearms",
    [string]$NamePrefix = "IA_",
    [string]$OutJson = "$PSScriptRoot\ia_refs.json"
)
$ErrorActionPreference = 'Stop'
$bin = 'C:\Users\OddJob\projects\NRIH2\tools\extractor\bin\Debug\net10.0'
$usmap = 'C:\Users\OddJob\projects\NRIH2\data\mappings\Mappings.usmap'

foreach ($dll in 'CUE4Parse.dll','Newtonsoft.Json.dll','Serilog.dll') {
    [void][System.Reflection.Assembly]::LoadFrom("$bin\$dll")
}
# Resolve any further deps from the extractor bin dir on demand.
[System.AppDomain]::CurrentDomain.add_AssemblyResolve({
    param($s, $e)
    $name = ($e.Name -split ',')[0]
    $p = Join-Path $bin "$name.dll"
    if (Test-Path $p) { return [System.Reflection.Assembly]::LoadFrom($p) }
    return $null
}.GetNewClosure())

function New-WithDefaults([Type]$type, [object[]]$given) {
    # Invoke the ctor whose leading params match $given, filling the rest with defaults.
    foreach ($ctor in ($type.GetConstructors() | Sort-Object { $_.GetParameters().Count })) {
        $ps = $ctor.GetParameters()
        if ($ps.Count -lt $given.Count) { continue }
        $args = @()
        $ok = $true
        for ($i = 0; $i -lt $ps.Count; $i++) {
            if ($i -lt $given.Count) {
                if ($null -ne $given[$i] -and -not $ps[$i].ParameterType.IsInstanceOfType($given[$i])) { $ok = $false; break }
                $args += ,$given[$i]
            }
            elseif ($ps[$i].HasDefaultValue) { $args += ,$ps[$i].DefaultValue }
            else { $ok = $false; break }
        }
        if ($ok) { return $ctor.Invoke($args) }
    }
    throw "no usable ctor on $($type.FullName)"
}

$game = [CUE4Parse.UE4.Versions.EGame]::GAME_UE5_6
$vc = New-WithDefaults ([CUE4Parse.UE4.Versions.VersionContainer]) @($game)
$provider = New-WithDefaults ([CUE4Parse.FileProvider.DefaultFileProvider]) @(
    'E:\SteamLibrary\steamapps\common\nmrih2\NMRiH2\Content\Paks',
    [System.IO.SearchOption]::TopDirectoryOnly, $vc)
$provider.MappingsContainer = [CUE4Parse.MappingsProvider.Usmap.FileUsmapTypeMappingsProvider]::new($usmap)
$provider.Initialize()
$provider.SubmitKey([Activator]::CreateInstance([CUE4Parse.UE4.Objects.Core.Misc.FGuid]),
                    [CUE4Parse.Encryption.Aes.FAesKey]::new([byte[]]::new(32)))
$provider.PostMount() | Out-Null
Write-Host "Mounted: $($provider.Files.Count) files"

$targets = @($provider.Files.Keys | Where-Object {
    $_ -match [regex]::Escape($PathFilter) -and $_ -match '\.uasset$' })
Write-Host "Scanning $($targets.Count) packages matching '$PathFilter' for '$NamePrefix*'..."

$result = [ordered]@{}
$failed = 0
foreach ($path in ($targets | Sort-Object)) {
    try {
        $pkg = $provider.LoadPackage($path)
        $t = $pkg.GetType()
        $nm = $t.GetField('NameMap')?.GetValue($pkg)
        if ($null -eq $nm) { $nm = $t.GetProperty('NameMap')?.GetValue($pkg) }
        if ($null -eq $nm) { continue }
        $hits = @($nm | ForEach-Object { "$_" } |
                  Where-Object { $_ -match $NamePrefix } |
                  Sort-Object -Unique)
        if ($hits.Count) { $result[$path] = $hits }
    } catch {
        $failed++
        if ($failed -le 10) { Write-Host "FAIL $path : $($_.Exception.Message)" }
    }
}
$result | ConvertTo-Json -Depth 4 | Set-Content -Encoding utf8 $OutJson
Write-Host "Done. $($result.Count) packages reference '$NamePrefix*' (fail=$failed). Wrote $OutJson"
