# 🚀 Deploy do Frontend Contly

## ⚠️ Importante: GitHub Pages NÃO suporta Next.js

**GitHub Pages** só suporta sites estáticos (HTML/CSS/JS). Como este projeto usa **Next.js** (que precisa de Node.js), você precisa usar uma das plataformas abaixo.

## ✅ Opção 1: Vercel (RECOMENDADO - GRÁTIS)

A **Vercel** foi criada pela equipe do Next.js e tem suporte nativo perfeito.

### Passo a Passo:

1. **Acesse**: https://vercel.com
2. **Faça login** com sua conta GitHub
3. **Clique em "Add New..." → "Project"**
4. **Importe o repositório**: `https://github.com/jrmarquex/contly`
5. **Configure o projeto**:
   - **Root Directory**: `web`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. **Configure variáveis de ambiente** (se necessário):
   - `DATABASE_URL` (do Supabase)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (será a URL do Vercel)
7. **Clique em "Deploy"**

✅ **Resultado**: Seu frontend estará funcionando em `https://contly.vercel.app`

### Deploy Automático:
A cada push no GitHub, o Vercel faz deploy automático!

---

## ✅ Opção 2: Netlify (GRÁTIS)

### Passo a Passo:

1. **Acesse**: https://netlify.com
2. **Faça login** com GitHub
3. **Clique em "Add new site" → "Import an existing project"**
4. **Selecione o repositório**: `jrmarquex/contly`
5. **Configure**:
   - **Base directory**: `web`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. **Clique em "Deploy site"**

✅ **Resultado**: Seu frontend estará em `https://contly.netlify.app`

---

## ✅ Opção 3: Render (GRÁTIS)

1. **Acesse**: https://render.com
2. **Sign up** com GitHub
3. **New → Web Service**
4. **Connect** o repositório `contly`
5. **Configure**:
   - **Root Directory**: `web`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. **Deploy**

✅ **Resultado**: `https://contly.onrender.com`

---

## 📋 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Criou conta no Supabase
- [ ] Executou os scripts SQL do banco de dados
- [ ] Configureu as variáveis de ambiente
- [ ] Testou localmente (`npm run dev`)
- [ ] Verificou se todas as imagens estão na pasta `public/images`

---

## 🔑 Variáveis de Ambiente Necessárias

Crie um arquivo `.env` no Vercel/Netlify/Render com:

```env
# Supabase
DATABASE_URL="postgresql://usuario:senha@host:porta/database"
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_ANON_KEY="sua-key-aqui"

# NextAuth
NEXTAUTH_SECRET="seu-secret-super-seguro"
NEXTAUTH_URL="https://seu-dominio.vercel.app"

# Opcional
NODE_ENV="production"
```

---

## 🌐 Qual Plataforma Escolher?

| Plataforma | Prós | Contras |
| TeslaDeciding | --- | --- |
| **Vercel** | ✅ Criado pela equipe Next.js<br>✅ Deploy instantâneo<br>✅ CDN global<br>✅ Grátis | ❌ Limite de bandwidth grátis |
| **Netlify** | ✅ Interface simples<br>✅ Grátis<br>✅ Formulários built-in | ❌ Não tão otimizado para Next.js |
| **Render** | ✅ Suporta qualquer framework<br>✅ Grátis | ❌ Mais lento que Vercel<br>❌ Free tier dorme após inatividade |

### 🏆 RECOMENDAÇÃO: Use **Vercel** para projetos Next.js!

---

## 🆘 Problemas Comuns

### Erro: "Module not found"
```bash
# Solução: Verifique se o Root Directory está correto
# Deve ser: "web" (não "/" ou ".")
```

### Erro: "Environment variables missing"
```bash
# Solução: Adicione todas as variáveis no painel da plataforma
```

### Build demora muito
```bash
# Solução: Use Vercel que é mais rápido para Next.js
```

---

## 📞 Suporte

Se tiver problemas, abra uma issue no GitHub: https://github.com/jrmarquex/contly/issues

---

**✨ Seu frontend ficará lindo e funcionando perfeitamente no Vercel!**

