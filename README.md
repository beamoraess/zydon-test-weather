# Previsão do Tempo

![Banner do Projeto](/public/assets/banner-projeto.JPG)

Aplicação de previsão do tempo desenvolvida com **Next.js**, **TypeScript** e **OpenWeatherMap API**. Permite que os usuários busquem o clima de qualquer cidade, visualizem detalhes e salvem cidades favoritas.

---

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Chave de API do [OpenWeatherMap](https://openweathermap.org/api)

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/zydon-test-weather.git
   cd zydon-test-weather

2.  **Instale as dependências:**
	
	```bash
    npm install ou yarn install
3.  **Inicie o servidor de desenvolvimento:**

	```bash
	npm run dev ou yarn dev

5.  **Acesse a aplicação:**
    ```bash
    Abra o navegador e acesse:    
    http://localhost:3000
    

----------

## Funcionalidades Implementadas

### 1.  **Busca do Clima**

-   Pesquise o clima de qualquer cidade digitando o nome no campo de busca.
    
-   Exibe informações como temperatura, umidade, velocidade do vento e condições climáticas atuais.
    

### 2.  **Detalhes do Clima**

-   Ao clicar em "Detalhes", o usuário é redirecionado para uma página com informações mais detalhadas sobre o clima da cidade selecionada.
    

### 3.  **Cidades Favoritas**

-   Adicione cidades à lista de favoritos clicando no ícone de estrela.
    
-   Visualize todas as cidades favoritas na página "Favoritos".
    

### 4.  **Persistência de Dados**

-   As cidades favoritas são salvas no  `localStorage`, garantindo que os dados sejam mantidos mesmo após recarregar a página.
    

### 5.  **Design Responsivo**

-   A aplicação é totalmente responsiva, funcionando bem em dispositivos móveis, tablets e desktops.
    

----------

## Decisões Técnicas Tomadas

### 1.  **Next.js**

-   O teste solicitava o uso de **Vite** porem a melhor opção é **Next.js**  pela sua capacidade de renderização do lado do servidor (SSR) e geração estática (SSG), o que melhora o desempenho e a SEO da aplicação.
    
-   O uso de rotas dinâmicas facilita a criação de páginas para cada cidade.
    

### 2.  **Context API**

-   Utilizei a  **Context API**  do React para gerenciar o estado global da aplicação, como o clima atual e a lista de cidades favoritas.
    
-   Dois contextos foram criados:
    
    -   `WeatherContext`: Gerencia os dados do clima.
        
    -   `FavoriteCitiesContext`: Gerencia a lista de cidades favoritas.
        

### 3.  **OpenWeatherMap API**

-   A API do OpenWeatherMap foi solicitada no teste.
    
-   As requisições são feitas usando  **axios**  para maior controle e tratamento de erros.
    

### 4.  **Persistência com  `localStorage`**

-   Para manter a lista de cidades favoritas mesmo após recarregar a página, utilizei o  `localStorage`.
    
-   O estado é sincronizado com o  `localStorage`  sempre que há uma mudança.
    

### 5.  **Lazy Loading e Suspense**

-   Componentes pesados, como  `WeatherInformations`, são carregados de forma dinâmica usando  **React.lazy**  e  **Suspense**  para melhorar o desempenho inicial da aplicação.
    

### 6.  **Design System**

-   Utilizei componentes pré-estilizados da biblioteca  **shadcn/ui**  para garantir consistência visual e agilizar o desenvolvimento.
    
-   Ícones são fornecidos pela biblioteca  **Lucide**  e  **Heroicons**.
    

### 7.  **Tratamento de Erros**

-   Todas as requisições à API são tratadas com blocos  `try/catch`  para garantir que erros sejam capturados e exibidos ao usuário de forma amigável.
    

----------

## Estrutura do Projeto

	```bash
	
	previsao-do-tempo/
	├── public/                  # Arquivos estáticos (imagens, fonts, etc.)
	├── src/
	│   ├── components/          # Componentes reutilizáveis
	│   ├── context/             # Contextos globais (WeatherContext, FavoriteCitiesContext)
	│   ├── pages/               # Páginas da aplicação
	│   ├── types/               # Tipos TypeScript
	│   ├── utils/               # Funções utilitárias (ex: getBackgroundImageForWeather)
	│   ├── styles/              # Estilos globais e CSS
	│   └── app/                 # Configurações do Next.js (layout, providers)
	├── .env.local               # Variáveis de ambiente
	├── package.json             # Dependências e scripts
	└── README.md                # Documentação do projeto

----------

Feito com ❤️ por  [Beatriz Moraes](https://github.com/beamoraess).
