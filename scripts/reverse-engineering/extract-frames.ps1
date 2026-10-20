param(
    [Parameter(Mandatory)][string]$Video,
    [Parameter(Mandatory)][string]$OutputDirectory,
    [ValidateRange(1,120)][int]$Fps = 30,
    [ValidateRange(0.1,60)][double]$Duration = 1,
    [ValidateRange(0,86400)][double]$Start = 0
)
$ErrorActionPreference = 'Stop'
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { throw 'FFmpeg must be on PATH.' }
$videoPath = (Resolve-Path -LiteralPath $Video).Path
$outputPath = [IO.Path]::GetFullPath($OutputDirectory)
if (Test-Path -LiteralPath $outputPath) { throw 'Choose a fresh output directory to preserve previous frames.' }
New-Item -ItemType Directory -Path $outputPath | Out-Null
$culture = [Globalization.CultureInfo]::InvariantCulture
& ffmpeg -hide_banner -loglevel error -i $videoPath -ss $Start.ToString($culture) -t $Duration.ToString($culture) -vf "fps=$Fps" (Join-Path $outputPath 'frame_%04d.png')
if ($LASTEXITCODE -ne 0) { throw 'Frame extraction failed.' }
$count = @(Get-ChildItem -LiteralPath $outputPath -Filter 'frame_*.png').Count
if ($count -eq 0) { throw 'No frames extracted.' }
$rows = [Math]::Ceiling($count / 8)
# Windows FFmpeg builds may lack glob input; numbered image sequences work natively.
& ffmpeg -hide_banner -loglevel error -i (Join-Path $outputPath 'frame_%04d.png') -vf "scale=320:-1,tile=8x${rows}:padding=4:color=white" -frames:v 1 (Join-Path $outputPath 'contact_sheet.png')
if ($LASTEXITCODE -ne 0) { throw 'Contact sheet generation failed.' }
[pscustomobject]@{ Source=$videoPath; Fps=$Fps; Start=$Start; Duration=$Duration; Frames=$count } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputPath 'capture.json') -Encoding utf8
Write-Output "Extracted $count frames and contact_sheet.png into $outputPath"
