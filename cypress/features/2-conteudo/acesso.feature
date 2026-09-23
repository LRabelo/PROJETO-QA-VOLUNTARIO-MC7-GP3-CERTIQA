Funcionalidade: Vitrine de Certificações (SCRUM-7)
  Como um usuário da plataforma CertiQA
  Quero acessar a vitrine de certificações
  Para visualizar, interagir e iniciar os meus estudos

  Cenário: [CT-001] Visualizar listagem de certificações disponíveis
    Dado que sou um usuário autenticado na plataforma
    E estou na página "Início"
    Quando eu clicar no menu superior "Certificações" ou no botão vermelho "Ver Certificações"
    Então o sistema deve carregar a tela "Certificações Disponíveis"
    E exibir os cards das certificações com suas descrições, quantidade de fases e o botão "Iniciar Estudo"

  Cenário: [CT-002] Selecionar e acessar uma certificação específica
    Dado que sou um usuário autenticado na plataforma
    E estou na tela de "Certificações Disponíveis"
    Quando eu localizar o card da certificação "ISTQB Certified Tester Foundation Level (CTFL)"
    E clicar no botão azul "Iniciar Estudo"
    Então o sistema deve me redirecionar com sucesso para a página interna da certificação selecionada
    E permitir a visualização de suas fases

  Cenário: [CT-006] Validar redirecionamento para login ao acessar "Certificações" via menu
    Dado que sou um usuário não autenticado (deslogado)
    E estou acessando a página "Início" (Home)
    Quando eu clicar no menu superior "Certificações" ou em qualquer atalho para a vitrine
    Então o sistema deve interceptar a navegação e não exibir a página restrita
    E redirecionar o usuário imediatamente para a tela de "Acesse sua conta" (Login)

  Cenário: [CT-007] Validar proteção de rota da Vitrine via acesso direto pela URL
    Dado que sou um usuário não autenticado (deslogado) no navegador
    Quando eu copiar a URL direta da página de certificações
    E colar a URL diretamente na barra de endereços do navegador e pressionar Enter
    Então o sistema deve bloquear a rota e não exibir o conteúdo da página de certificações
    E redirecionar o usuário imediatamente para a tela de "Acesse sua conta" (Login)