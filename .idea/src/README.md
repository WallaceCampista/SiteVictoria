# Site Victoria - Psicóloga

Site profissional para Victória Aquino, Psicóloga Clínica especializada em TCC & ACT.

## 📁 Estrutura do Projeto

```
src/
├── css/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── buttons.css      # Estilos de botões
│   │   ├── cursor.css       # Cursor personalizado
│   │   ├── floating-elements.css  # WhatsApp, Back to top, Progress bar
│   │   ├── header.css       # Cabeçalho e navegação
│   │   └── loader.css       # Tela de carregamento
│   │
│   ├── sections/            # Seções da página
│   │   ├── hero.css         # Seção inicial
│   │   ├── sobre.css        # Seção sobre
│   │   ├── servicos.css     # Seção de serviços
│   │   ├── galeria.css      # Galeria de fotos
│   │   ├── interesses.css   # Seção de interesses
│   │   ├── faq.css          # Perguntas frequentes
│   │   ├── cta.css          # Call to action
│   │   ├── contato.css      # Seção de contato
│   │   └── footer.css       # Rodapé
│   │
│   ├── animations.css       # Animações e transições
│   ├── base.css             # Reset e estilos base
│   ├── main.css             # Arquivo principal (importa todos)
│   ├── responsive.css       # Media queries globais
│   └── variables.css        # Variáveis CSS (design tokens)
│
├── js/
│   ├── components/          # Módulos JavaScript
│   │   ├── cursor.js        # Cursor personalizado
│   │   ├── faq-accordion.js # Accordion do FAQ
│   │   ├── interactive-effects.js  # Efeitos interativos
│   │   ├── lazy-load.js     # Carregamento lazy de imagens
│   │   ├── loader.js        # Tela de carregamento
│   │   ├── navigation.js    # Navegação e menu mobile
│   │   ├── particles.js     # Partículas animadas
│   │   └── scroll-animations.js  # Animações de scroll
│   │
│   ├── utils/               # Utilitários
│   │   ├── accessibility.js # Recursos de acessibilidade
│   │   ├── dom.js           # Helpers para DOM
│   │   └── easter-egg.js    # Easter egg (Konami Code)
│   │
│   ├── main.js              # Entry point (ES Modules)
│   └── script.js            # Script compatível (IIFE)
│
├── image/                   # Imagens do site
│   ├── foto_capa.jpg        # Foto principal (Hero)
│   ├── quem_sou_eu.jpeg     # Foto da seção Sobre
│   ├── use.jpeg             # Galeria
│   ├── use1.jpeg            # Galeria
│   ├── use2.jpeg            # Galeria
│   ├── use3.jpeg            # Galeria
│   └── use4.jpg             # Galeria (destaque)
│
└── index.html               # Página principal
```

## 🎨 Design Tokens (Variáveis CSS)

As variáveis CSS estão centralizadas em `css/variables.css`:

- **Cores primárias**: `--primary`, `--primary-light`, `--primary-dark`
- **Cores secundárias**: `--secondary`, `--accent`
- **Cores neutras**: `--dark`, `--light`, `--gray`, `--gray-light`
- **Gradientes**: `--gradient-1`, `--gradient-2`, `--gradient-3`
- **Sombras**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Transições**: `--transition`, `--transition-slow`
- **Espaçamentos**: `--spacing-xs` até `--spacing-xxl`
- **Border radius**: `--radius-sm` até `--radius-full`

## 🚀 Funcionalidades

### JavaScript
- **Loader animado** com barra de progresso
- **Cursor personalizado** para desktop
- **Partículas animadas** no hero
- **Navegação suave** entre seções
- **Menu mobile** responsivo
- **FAQ Accordion** expandível
- **Contador animado** de estatísticas
- **Efeito parallax** nas esferas
- **Efeito magnético** nos botões
- **Efeito tilt 3D** nos cards
- **Barra de progresso** de scroll
- **Botão voltar ao topo**
- **Lazy loading** de imagens
- **Easter egg** (Konami Code 🎮)

### Acessibilidade
- Respeita `prefers-reduced-motion`
- Labels ARIA em botões
- Navegação por teclado
- Links com `rel="noopener noreferrer"`

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **1024px**: Tablets
- **768px**: Mobile landscape
- **480px**: Mobile portrait

## 🛠️ Como usar

1. Abra `index.html` em um navegador moderno
2. Para desenvolvimento local, use um servidor (ex: Live Server no VS Code)

## 📝 Notas

- O CSS usa `@import` para modularização (considere bundling em produção)
- O JavaScript usa IIFE para compatibilidade sem build tools
- Versão com ES Modules disponível em `js/main.js`

## 👩‍💻 Autor

Desenvolvido com 💜 para Victoria Aquino Psicóloga
