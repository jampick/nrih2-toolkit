# Builds a structured catalog.json from the mounted pak file list (names/paths only; no stats — those need a usmap).
param(
  [string]$FileList = "C:\Users\OddJob\projects\NRIH2\tools\extractor\bin\Debug\net10.0\file_list.txt",
  [string]$OutDir   = "C:\Users\OddJob\projects\NRIH2\data\catalog"
)
$all = Get-Content $FileList
New-Item -ItemType Directory -Force $OutDir | Out-Null
function Leaf($p){ ($p -split '/')[-1] -replace '\.uasset$','' -replace '\.umap$','' }

# Skills: SD_ data sets under Skills/DataSet
$skillFiles = $all | Where-Object { $_ -match '/Skills/DataSet/SD_.+\.uasset$' }
$skills = @{}
foreach($p in $skillFiles){
  $n = Leaf $p
  $isUlt = $n -match '_(Ultimate|Ult)$'
  $base = $n -replace '_(Ultimate|Ult)$',''
  if(-not $skills.ContainsKey($base)){ $skills[$base] = [ordered]@{ name=$base; hasUltimate=$false; dataset=$null; datasetUltimate=$null } }
  if($isUlt){ $skills[$base].hasUltimate=$true; $skills[$base].datasetUltimate=$p } else { $skills[$base].dataset=$p }
}

# Firearms & other attribute-effect-sets (AES_)
$aes = $all | Where-Object { $_ -match '/AES_[A-Za-z0-9_]+\.uasset$' } | ForEach-Object { [ordered]@{ name=(Leaf $_); path=$_ } }

# Melee (with rarity tier from folder Approved/<Rarity>/<Name>)
$melee = $all | Where-Object { $_ -match '/Blueprints/Items/Melee/Approved/[^/]+/[^/]+/BP_' -and $_ -match '\.uasset$' } |
  ForEach-Object { $seg = $_ -split '/'; $i = [array]::IndexOf($seg,'Approved'); [ordered]@{ name=(Leaf $_); rarity=$seg[$i+1]; path=$_ } }

function GetCat($regex){ $all | Where-Object { $_ -match $regex -and $_ -match '\.uasset$' } | ForEach-Object { [ordered]@{ name=(Leaf $_); path=$_ } } }

$catalog = [ordered]@{
  meta = [ordered]@{
    game = "No More Room in Hell 2"; appid = 292000; engine = "UE5.6 (Torn Banner 'Mangle.4')";
    note = "Names/paths extracted from unencrypted paks. Numeric stats require a .usmap mappings file (see README).";
    counts = [ordered]@{}
  }
  skills          = ($skills.Values | Sort-Object name)
  skillEffects    = (GetCat '/Skills/.*GE_')
  firearmsAndSets = $aes
  melee           = $melee
  consumables     = (GetCat '/Data/Consumables/.*ID_')
  permanents      = (GetCat '/Data/Permanents/.*ID_')
  attachments     = (GetCat '/Data/Attachments/.*IA_')
  recipes         = (GetCat '/Data/Recipes/.*ID_Recipe')
  stims           = (GetCat '/Data/Stims/.*STIM_')
  attributesTables= (GetCat '/Data/Attributes/')
  ai              = (GetCat '/Data/AI/')
  challengeTasks  = (GetCat '/ChallengeSystem/.*ChallengeTask_')
  activityCards   = (GetCat '/Data/ActivityCards/')
  lootCollections = (GetCat '/Data/Items/LootCollections/KSC_')
}
$c = $catalog.meta.counts
foreach($k in @('skills','skillEffects','firearmsAndSets','melee','consumables','permanents','attachments','recipes','stims','attributesTables','ai','challengeTasks','activityCards','lootCollections')){
  $c[$k] = @($catalog[$k]).Count
}
$catalog | ConvertTo-Json -Depth 6 | Set-Content "$OutDir\catalog.json" -Encoding UTF8
$c.GetEnumerator() | ForEach-Object { "{0,-18} {1}" -f $_.Key, $_.Value }
Write-Host "`nWrote $OutDir\catalog.json"
