Funcionalidade: Exame de Fases  - SCRUM-9
  Como um usuário da plataforma CertiQA
  Quero interagir com a tela de execução do quiz nas fases
  Para responder às questões, gerenciar o tempo, navegar e lidar com interrupções

  Contexto:
    Dado que sou um usuário autenticado na plataforma
    E estou na tela de conteúdo da Fase 1

  Cenário: [CT-001] Iniciar o quiz da fase
    Dado que estou visualizando o conteúdo teórico da fase
    Quando eu clicar no botão "Iniciar Quiz"
    Então o sistema deve carregar a tela do quiz exibindo a primeira questão
    E ativando o timer (cronômetro)
    E mostrando a barra de progresso em 10%

  Cenário: [CT-003] Abandono do Quiz antes da conclusão
    Dado que iniciei o quiz da fase e estou respondendo às questões
    Quando eu clicar no botão "Sair do Quiz"
    Então o sistema deve interromper o quiz e retornar para a tela de conteúdo da fase sem salvar o progresso parcial
    E o botão "Iniciar Quiz" deve estar visível novamente

  Cenário: [CT-004] Submissão automática do Quiz por tempo esgotado (Time out)
    Dado que iniciei o quiz da fase com o cronômetro em andamento
    Quando eu deixar as questões em branco e aguardar o cronômetro expirar
    Então o sistema deve encerrar o quiz automaticamente
    E exibir a tela de resultado correspondente ao tempo esgotado

  Cenário: [CT-005] Validar interrupção do quiz ao recarregar a página (F5/Refresh)
    Dado que iniciei o quiz da fase e naveguei até uma questão intermediária respondendo algumas alternativas
    Quando eu recarregar a página (F5) do navegador
    Então o sistema deve interromper a tentativa do quiz e descartar as respostas parciais
    E redirecionar o usuário imediatamente para a tela de conteúdo da fase correspondente