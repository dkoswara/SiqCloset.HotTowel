# Ensure IIS Express is installed
$programFiles = if ("${env:ProgramFiles(x86)}") { "${env:ProgramFiles(x86)}" } else { "${env:ProgramFiles}" }
$iisExpress = Join-Path $programFiles "IIS Express\iisexpress.exe"
if (-not (Test-Path $iisExpress)) {
    Write-Warning "Cannot find IIS Express - please install it."
    Write-Host "Looked for $iisExpress, but it does not exist."
    cmd /c pause
    Start-Process -FilePath "http://www.microsoft.com/web/gallery/install.aspx?appid=IISExpress"
    return
}

# Launch IIS Express, serving files from the Todo.WebAPI directory above where this script is
$scriptDir = (Split-Path -Parent $MyInvocation.MyCommand.Definition)
$wwwRoot = (Resolve-Path $scriptDir\..\SiqCloset.Web).Path
Push-Location -Path (Split-Path -Parent $iisExpress)
cmd /c iisexpress.exe /port:3958 /path:$wwwRoot
Pop-Location