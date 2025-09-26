🏙️ VivaCidade - App de Cidadania Colaborativa
VivaCidade é um Progressive Web App (PWA) focado em fortalecer a comunidade local, permitindo que os cidadãos reportem problemas urbanos de forma simples e interativa. Através de um sistema de gamificação, os usuários são incentivados a se tornarem "guardiões" de sua cidade, ganhando pontos e conquistando medalhas por suas contribuições.

✨ Funcionalidades Principais
🗺️ Mapa Interativo: Visualize todos os problemas reportados na cidade em tempo real.

📸 Reporte Simplificado: Crie um novo reporte em segundos, com tipo, foto e geolocalização.

👍 Interação Social: Usuários podem dar "likes" nos reportes de outros, aumentando a relevância do problema.

🏆 Gamificação Completa:

Pontos: Ganhe pontos por cada reporte e like recebido.

Conquistas: Desbloqueie medalhas progressivas (Bronze, Prata, Ouro, Diamante) por alcançar marcos.

Ranking Mensal: Compita com outros cidadãos para ver quem mais contribui.

👤 Perfil de Usuário: Acompanhe seu progresso, pontos, conquistas e gerencie seus reportes.

🔔 Notificações em Tempo Real: Receba alertas ao ganhar pontos ou quando seus reportes receberem likes.

📱 Design Responsivo (Mobile-First): Experiência de usuário otimizada para dispositivos móveis.

🛠️ Tecnologias Utilizadas
Frontend: React.js

Roteamento: React Router

Estilização: Tailwind CSS

Ícones: Lucide React

Mapa: Leaflet & React-Leaflet

Gerenciamento de Estado: React Context API

Build Tool: Vite
```
📁 Estrutura do Projeto
/
├── public/
│   └── assets/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── NotificationPopup.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx       # Gerencia autenticação e dados do usuário logado
│   │   └── DataContext.jsx       # Gerencia dados da aplicação (reportes, usuários, gamificação)
│   ├── pages/
│   │   ├── Onboarding.jsx        # Tela inicial
│   │   ├── Login.jsx             # Tela de login
│   │   ├── Register.jsx          # Tela de registro com seleção de avatar
│   │   ├── Home.jsx              # Tela principal com o mapa
│   │   ├── NewReport.jsx         # Formulário para novo reporte
│   │   ├── MyReports.jsx         # Lista de reportes do usuário
│   │   └── Profile.jsx           # Perfil do usuário com estatísticas e conquistas
│   ├── App.jsx                   # Layout principal com a barra de navegação
│   ├── index.css                 # Configuração base do Tailwind
│   └── main.jsx                  # Ponto de entrada, configuração das rotas
└── tailwind.config.js          # Arquivo de configuração do Tailwind
```
🚀 Como Executar o Projeto
Clone o repositório:

git clone [https://github.com/edumxk/mvp-smart-city.git](https://github.com/edumxk/mvp-smart-city.git) # Substitua pelo link do seu repositório
cd vivacidade

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm run dev

Abra o navegador:
Acesse http://localhost:5173 (ou a porta indicada no seu terminal).

👨‍💻 Créditos
Este projeto foi desenvolvido com ❤️ por Eduardo Patrick.

GitHub: [Eduardo Patrick](https://github.com/edumxk)