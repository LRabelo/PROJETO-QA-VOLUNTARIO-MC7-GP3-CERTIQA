Funcionalidade: Aprovação - SCRUM-10
  Como um usuário da plataforma CertiQA
  Quero realizar quizzes nas fases e acompanhar meu progresso na certificação
  Para validar minhas respostas, receber feedbacks e liberar novos conteúdos

  Contexto:
    Dado que sou um usuário autenticado na plataforma
    E estou na tela da fase teórica da certificação

  Cenário: [CT-001] e [CT-004] Reprovação no Quiz e Toast de incentivo
    Dado que acessei o quiz da Fase 1
    Quando eu responder ao quiz incorretamente obtendo nota reprovada
    E visualizar a tela de resultado do quiz
    E clicar no botão "Voltar para a Fase"
    Então o sistema deve me redirecionar de volta à tela de conteúdo da fase
    E exibir o toast de reprovação e o botão "Tentar Novamente" visíveis
    E o botão "Continuar estudo" para a próxima fase não deve existir

  Cenário: [CT-003] e [CT-006] Aprovação no Quiz e Toast de sucesso
    Dado que acessei o quiz da Fase 1
    Quando eu responder ao quiz corretamente obtendo nota de aprovação
    E visualizar a tela de resultado do quiz
    E clicar no botão "Voltar para a Fase"
    Então o sistema deve me redirecionar de volta à tela de conteúdo da fase
    E exibir o toast de sucesso e a tag verde de "Fase concluída"

  Cenário: [CT-005] Conclusão da última fase e liberação do Simulado Final
    Dado que concluí todas as fases anteriores da certificação
    Quando eu acessar e for aprovado no quiz da última fase (Fase 6)
    E retornar para a tela geral da certificação
    Então o sistema deve exibir a conclusão total da certificação e liberar o Simulado Final