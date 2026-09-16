const { defineConfig } = require('cypress');
require('dotenv').config(); // Puxa os dados do arquivo .env na raiz do projeto

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // 1. Ativa o plugin do relatório visual (Mochawesome)
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // 2. Injeta as senhas do arquivo .env para o Cypress reconhecer
      config.env.USER_EMAIL = process.env.USER_EMAIL;
      config.env.USER_PASSWORD = process.env.USER_PASSWORD;

      // Outras configurações e plugins (ex: cucumber-preprocessor) podem entrar aqui
      return config;
    },
    defaultCommandTimeout: 10000, // Aumenta o tempo limite para comandos comuns
    baseUrl: 'https://certiqa.qazando.com.br/',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Desabilitado para economizar espaço por padrão
  },
});