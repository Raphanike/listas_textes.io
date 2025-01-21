describe('Testes da Agenda de Contatos', () => {
    beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/');
    });

    it('Deve realizar a inclusão, edição e remoção de um contato', () => {
    // Passo 1: Inclusão de um novo contato
    cy.get('input[placeholder="Nome"]').type('João Silva');
    cy.get('input[placeholder="E-mail"]').type('joao.silva@gmail.com');
    cy.get('input[placeholder="Telefone"]').type('999999999');
    cy.get('button').contains('Adicionar').click();

    // Verifica se o contato foi adicionado com sucesso
    cy.contains('João Silva').should('exist');
    cy.contains('999999999').should('exist');
    cy.contains('joao.silva@gmail.com').should('exist');

    // Passo 2: Edição do contato
    cy.contains('João Silva')
        .parents('.sc-beqWaB') // Seleciona o contêiner do contato
        .within(() => {
        // Encontra e clica no botão "Editar"
        cy.get('button.edit')
            .should('exist')
            .and('be.visible')
            .click();
        });

    // Preenche os novos dados no formulário de edição
    cy.get('input[placeholder="Nome"]').clear().type('João da Silva');
    cy.get('input[placeholder="E-mail"]').clear().type('joao.dasilva@gmail.com');
    cy.get('input[placeholder="Telefone"]').clear().type('988888888');

    // Salva as alterações
    cy.get('button').contains('Salvar').click();

    // Verifica se as alterações foram salvas
    cy.contains('João da Silva').should('exist');
    cy.contains('joao.dasilva@gmail.com').should('exist');
    cy.contains('988888888').should('exist');

    // Passo 3: Remoção do contato
    cy.contains('João da Silva')
        .parents('.sc-beqWaB') // Seleciona o contêiner do contato
        .within(() => {
        // Encontra e clica no botão "Deletarr"
        cy.get('button.delete')
            .should('exist')
            .and('be.visible')
            .click();
        });

    // Aguarda o processo de remoção ser concluído
    cy.wait(1000); // Aguarda 2 segundos para o contato ser removido

    // Verifica se o contêiner do contato foi removido do DOM
    cy.get('.sc-beqWaB')
        .should('not.contain', 'João da Silva') // Verifica se o nome não está mais no contêiner
        .and('not.contain', 'joao.dasilva@gmail.com') // Verifica se o e-mail não está mais
        .and('not.contain', '988888888'); // Verifica se o telefone não está mais
    });
});
