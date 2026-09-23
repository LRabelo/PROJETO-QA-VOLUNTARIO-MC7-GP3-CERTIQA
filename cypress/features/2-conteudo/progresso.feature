Funcionalidade: Conteúdos e Progresso da Certificação (SCRUM-8)
  Como um aluno matriculado na plataforma CertiQA
  Quero acessar, navegar e concluir os conteúdos das certificações
  Para progredir na minha jornada de estudos de forma fluida e segura

  Cenário: [CT-001] Acessar conteúdos da fase e navegar entre eles
    Dado que sou um usuário autenticado matriculado em uma certificação
    E a fase atual está liberada e acessível
    Quando eu acessar a fase liberada
    E clicar em um conteúdo disponível
    E utilizar os botões de navegação (próximo/anterior)
    Então o conteúdo deve ser exibido corretamente na tela
    E a navegação entre os itens da fase deve funcionar de forma fluida e sem erros

  Cenário: [CT-002] Concluir um conteúdo e validar a atualização do progresso
    Dado que sou um usuário autenticado consumindo um conteúdo que ainda não foi marcado como concluído
    Quando eu interagir com o conteúdo até o final ou clicar no botão "Concluir"
    E retornar à visão geral da fase ou atualizar a página
    Então o conteúdo deve ser sinalizado visualmente como concluído
    E a barra ou porcentagem de progresso geral do usuário deve ser atualizada de forma correspondente

  Cenário: [CT-005] Persistência do progresso após recarregar a página
    Dado que sou um usuário autenticado acabando de concluir um conteúdo
    Quando eu clicar para concluir um material
    E pressionar F5 para recarregar a página inteira
    Então o progresso não deve ser perdido ou resetado
    E o sistema deve buscar a informação atualizada e manter o conteúdo como "Concluído"

  Cenário: [CT-008] Validar bloqueio de rota via URL para fases futuras não desbloqueadas na trilha
    Dado que sou um usuário autenticado com assinatura ativa/liberada
    Mas ainda não concluí a Fase 1
    Quando eu copiar a URL direta de uma fase não liberada na trilha
    E colar a URL diretamente na barra de endereços do navegador e pressionar Enter
    Então o sistema deve verificar que os pré-requisitos acadêmicos não foram cumpridos
    E bloquear a exibição da fase futura
    E redirecionar o aluno de volta à trilha com uma mensagem de "Acesso negado" ou "Conclua a fase anterior"

  Cenário: [CT-009] Validar navegação redundante para a fase em andamento
    Dado que sou um usuário autenticado com a Fase 1 iniciada mas não concluída
    Quando eu clicar no botão "Continuar estudo" dentro do card da Fase 1
    Ou voltar à tela anterior e clicar no botão "Continuar Estudando" na seção "Próxima Fase" no rodapé
    Então em ambos os casos o sistema deve redirecionar corretamente para a tela de conteúdo da "Fase 1 Fundamentos de Teste" sem erros