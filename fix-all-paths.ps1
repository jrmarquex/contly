# Script para converter caminhos em TODOS os arquivos HTML
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    Write-Host "Processando: $($_.FullName)"
    $content = Get-Content -Path $_.FullName -Raw
    
    # Converter caminhos
    $content = $content -replace 'href="/', 'href="./'
    $content = $content -replace 'src="/', 'src="./'
    $content = $content -replace 'action="/', 'action="./'
    
    # Salvar
    Set-Content -Path $_.FullName -Value $content -NoNewline
}

Write-Host "Todos os arquivos processados!"

