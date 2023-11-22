/**
 * @module DataAccessGroups
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click the X to delete the data access group named {string}
 * @param {string} event - name of the event displayed on the Record Home Page
 * @description Activates a pop-up confirming that user wants to delete all data on a specific even within a record
 */

Given("I click the X to delete the data access group named {string}", (dag_name) => {
    cy.table_cell_by_column_and_row_label("Delete", dag_name).then(($td) => {
        cy.wrap($td).find('a:visible:first').click({ waitForAnimations: false })
        cy.get('.ui-dialog').should('contain.text', 'Delete group')
    })
})

/**
 * @module DataAccessGroups
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on a table cell containing the text {string} in the data access groups table and clear field and (clear field and) enter {string}
 * @param {string} text - the text to locate the table cell
 * @param {string} table - the name of the table
 * @param {string} new_text - new text to type
 * @description Clicks on a table cell that is identified by a particular text string specified.
 */
Given(/^I click on (?:a|the) table cell containing the text "(.*?)"(?: in)?(?: the)? (.*?) table(?: and (.*?) "(.*?)")?$/, (text, table_type, enter_type = '', new_text = '') => {
    if(table_type === 'data access groups'){
        cy.intercept({
            method: 'GET',
            url: '/redcap_v' + Cypress.env('redcap_version') + '/index.php?route=DataAccessGroupsController:getDagSwitcherTable&tablerowsonly=1&pid=*&rowoption=dags*'
        }).as('dag_data')
    }
    let selector = window.tableMappings[table_type]
    cy.get(selector).within(() => {
        cy.get(`td:contains(${JSON.stringify(text)}):visible`).
        find(`a:contains(${JSON.stringify(text)}):visible:first, span:contains(${JSON.stringify(text)}):visible:first`).
        eq(0).then(($element) => {
            cy.wrap($element).click()

            if(enter_type === "clear field and enter"){
                cy.wrap($element).clear().type(`${new_text}{enter}`)
                if(table_type === 'data access groups') cy.wait('@dag_data')
            } else if (enter_type === "enter"){
                cy.wrap($element).type(`${new_text}{enter}`)
                if(table_type === 'data access groups') cy.wait('@dag_data')
            }
        })
    })
})

/**
 * @module DataAccessGroups
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I < click on | check | uncheck > {string} for user {string} in the DAG Switcher
 * @param {string} clickType - available options: 'click on', 'check', 'uncheck'
 * @description Selects a checkbox field by its label
 */
Given("I {clickType} {string} for user {string} in the DAG Switcher{baseElement}", (click_type, dag, user, base_element) => {
    if(Cypress.$('img[src*="progress"]').length) cy.get('img[src*="progress"]').should('not.be.visible')

    cy.table_cell_by_column_and_row_label(user, dag, 'div.dataTables_scrollHead table', 'th', 'td', 0, 'div.dataTables_scrollBody table').then(($td) => {
        if(click_type === "click on"){
            cy.wrap($td).next('td').find('input[type=checkbox]:visible:first').click({ waitForAnimations: false })
        } else if (click_type === "check"){
            cy.wrap($td).next('td').find('input[type=checkbox]:visible:first').check({ waitForAnimations: false })
        } else if (click_type === "uncheck"){
            cy.wrap($td).next('td').find('input[type=checkbox]:visible:first').uncheck({ waitForAnimations: false })
        }
    })
})
