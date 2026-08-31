const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // Configurações e plugins (ex: cucumber-preprocessor)
      return config;
    },
    defaultCommandTimeout: 10000, // Aumenta o tempo limite para comandos comuns
    baseUrl: 'https://certiqa.qazando.com.br/',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Desabilitado para economizar espaço por padrão
  },
});