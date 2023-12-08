//#############################################################################
//# Commands       A B C D E F G H I J K L M N O P Q R S T U V W X Y Z        #
//#############################################################################

Cypress.Commands.add('enable_surveys', (instrument_name) => {
    cy.get('table[id=table-forms_surveys]').within(() => {
        cy.get('tr').contains(instrument_name).parents('tr').find(':button').contains('Enable').click()
    })

    cy.get(`:button:contains("Save Changes"):visible:first`).click()

    cy.get('html').should('contain', 'Your survey settings were successfully saved!')
})

Cypress.Commands.add('open_survey_in_same_tab', (element) => {
    //Set the Pre Survey URL so we can return to the page we were on later
    cy.url().then((existing_url) => {
        window.redcap_url_pre_survey = existing_url
    })

    //Stub the surveyOpen method to prevent from opening new window
    cy.window().then((win) => {
        cy.stub(win, 'surveyOpen').callsFake((url, target) => {
            return win.open(url, '_self')
        })

        cy.wrap(element).click()
    })
})