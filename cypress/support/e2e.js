// Importa comandos customizados para estarem disponíveis globalmente
import 'cypress-mochawesome-reporter/register';
import './commands';

// Oculta requisições XHR do log do Cypress para manter a interface limpa
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}