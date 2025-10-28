const fs = require('fs');
const path = require('path');

// Função para corrigir caminhos de imagens em arquivos HTML
function fixImagePaths(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixImagePaths(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Substituir /images/ por /contly/images/
      content = content.replace(/href="\/images\//g, 'href="/contly/images/');
      content = content.replace(/src="\/images\//g, 'src="/contly/images/');
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

// Corrigir todos os arquivos HTML em web/out
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  fixImagePaths(outDir);
  console.log('✓ Caminhos de imagens corrigidos!');
} else {
  console.log('✗ Pasta out não encontrada!');
}

