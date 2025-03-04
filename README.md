Evaluate A News Article with Natural Language Processing
4th project at Udacity Front End Web Developer Nanodegree program.

This project aims to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. When a user submits a URL of an article, the web page then dispalys sentiment analysis returned from meaningcloud API, based on the contents of the article.

Build Tools
HTML
CSS
JavaScript
Node
Express
Webpack
meaningcloud API
Jest
Workbox
Installation
Make sure Node and npm are installed from the terminal.

node -v
npm -v
Move to the project folder
cd <project directory>
Clone the repo
git clone <repo>
Install npm
npm install
Install loaders and plugins
# Choose the necessary installation for your development mode
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
Sign up for an API key at meaningcloud.com

Configure environment variables using dotenv package

Install the dotenv package
npm install dotenv
Create a new .env file in the root of your project
Fill the .env file with your API key like this:
API_KEY=**************************
Start the project

Command	Action
npm run build-prod	Build project
npm start	Run project
Open browser at http://localhost:8081/
