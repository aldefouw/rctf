const { Given } = require('@badeball/cypress-cucumber-preprocessor')

/**
 * @module VisitPage
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I visit the REDCap login page
 * @description Instructs Cypress to the REDCap login page
 */
Given("I visit the REDCap login page", () => {
    cy.logout()
    cy.visit_version({page: '/'})
})