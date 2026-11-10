$ErrorActionPreference = 'Stop'
$env:PYTHONUTF8 = '1'
$env:RE_TOOLS_ROOT = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../work/tooling/reverse-engineering'))
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $env:RE_TOOLS_ROOT 'browsers'
$env:Path = (Join-Path $env:RE_TOOLS_ROOT '.venv/Scripts') + ';' + (Join-Path $env:RE_TOOLS_ROOT 'node_modules/.bin') + ';' + $env:Path
$env:UV_CACHE_DIR = Join-Path $env:RE_TOOLS_ROOT 'uv-cache'
$env:RE_MOTION_SCRIPTS = Join-Path $env:USERPROFILE '.codex/skills/ui-animation/scripts'
$config = Get-Content (Join-Path $PSScriptRoot 'cli.config.json') -Raw | ConvertFrom-Json
$browser = & node -e 'console.log(require(process.argv[1]).chromium.executablePath())' (Join-Path $env:RE_TOOLS_ROOT 'node_modules/playwright')
if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $browser)) { throw 'The pinned Chromium download is missing.' }
$revision = (Split-Path (Split-Path (Split-Path $browser)) -Leaf).Replace('chromium-', 'chromium_headless_shell-')
$browser = Join-Path $env:PLAYWRIGHT_BROWSERS_PATH "$revision/chrome-headless-shell-win64/chrome-headless-shell.exe"
if (-not (Test-Path -LiteralPath $browser)) { throw 'The Chromium headless shell is missing.' }
$config.browser.launchOptions | Add-Member -NotePropertyName executablePath -NotePropertyValue $browser
$env:RE_CLI_CONFIG = Join-Path $env:RE_TOOLS_ROOT 'cli.config.json'
$config | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $env:RE_CLI_CONFIG -Encoding utf8
Write-Output 'Native reverse-engineering tools activated. No UI Clone hooks or Linux pipeline enabled.'
