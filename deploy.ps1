<#
.SYNOPSIS
  Bouwt de site en zet hem live op de VPS.

.DESCRIPTION
  1. typecheck, lint, tests en productiebuild (npm run check)
  2. dist/ als tar.gz naar de server
  3. uitpakken in /home/ubuntu/portfolio/site/releases/<tijdstip>
  4. de symlink 'current' in één keer omzetten, zodat er geen half-geüploade site live staat
  5. alleen de laatste 5 releases bewaren

  Het doel is een SSH-host. Standaard 'portfolio-vps', een alias uit ~/.ssh/config, zodat het IP-adres
  niet in deze (openbare) repo staat. Overschrijven kan met -Target of $env:DEPLOY_TARGET.

.EXAMPLE
  .\deploy.ps1
  .\deploy.ps1 -SkipChecks          # alleen bouwen, zonder lint en tests
  .\deploy.ps1 -Target ubuntu@1.2.3.4
#>
param(
  [string]$Target = $(if ($env:DEPLOY_TARGET) { $env:DEPLOY_TARGET } else { 'portfolio-vps' }),
  [switch]$SkipChecks
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$siteRoot = '/home/ubuntu/portfolio/site'   # gemount in container portfolio-web (deploy/compose.yaml)
$env:VITE_SITE_URL = 'https://www.jaouadmchichi.nl'

function Assert-Success([string]$step) {
  if ($LASTEXITCODE -ne 0) { throw "$step mislukt (exitcode $LASTEXITCODE)" }
}

if ($SkipChecks) {
  npm.cmd run build; Assert-Success 'Build'
} else {
  npm.cmd run check; Assert-Success 'Checks en build'
}

$release = Get-Date -Format 'yyyyMMdd-HHmmss'
$archive = Join-Path $env:TEMP "portfolio-$release.tar.gz"
$remoteArchive = "/tmp/portfolio-$release.tar.gz"

Write-Host "==> Inpakken: release $release"
tar.exe -czf $archive -C dist .; Assert-Success 'Inpakken'

try {
  Write-Host "==> Uploaden naar $Target"
  scp.exe -q $archive "${Target}:$remoteArchive"; Assert-Success 'Uploaden'

  Write-Host '==> Activeren'
  $remote = @(
    "mkdir -p $siteRoot/releases/$release",
    "tar -xzf $remoteArchive -C $siteRoot/releases/$release --warning=no-timestamp",
    "rm -f $remoteArchive",
    "chmod -R a+rX $siteRoot/releases/$release",
    "ln -sfn releases/$release $siteRoot/current.tmp",
    "mv -Tf $siteRoot/current.tmp $siteRoot/current",
    "cd $siteRoot/releases",
    'ls -1t | tail -n +6 | xargs -r rm -rf'
  ) -join ' && '
  ssh.exe $Target $remote; Assert-Success 'Activeren'
} finally {
  Remove-Item $archive -ErrorAction SilentlyContinue
}

Write-Host "==> Live: $env:VITE_SITE_URL (release $release)" -ForegroundColor Green
