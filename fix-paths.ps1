# Script para converter caminhos absolutos para relativos no HTML
$htmlPath = "index.html"
$content = Get-Content -Path $htmlPath -Raw

# Converter caminhos
$content = $content -replace 'href="/', 'href="./'
$content = $content -replace 'src="/', 'src="./'
$content = $content -replace 'action="/', 'action="./'

# Salvar
Set-Content -Path $htmlPath -Value $content -NoNewline

Write-Host "Caminhos convertidos com sucesso!"

