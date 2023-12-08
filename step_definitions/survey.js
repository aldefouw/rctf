/**
 * @module Survey
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I enter the Username: {string} and password {string} for e-signature
 * @param {string} username - username
 * @param {string} password - password
 * @description Enters credentials when enabling e-signature on survey
 */
 Given("I enter the Username: {string} and password {string} for e-signature", (username, password) => {
    cy.get('input[id="esign_username"]').type(username)
    cy.get('input[id="esign_password"').type(password)
})

/**
 * @module Survey
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the survey option label containing {string} label
 * @param {string} survey_option_label - the label of the survey option specified
 * @param {string} tag - (optional) the value of the tag specified
 * @description Clicks on a survey option label.  Track it via an optional tag.
 */
Given("I click on the survey option label containing {string} label", (survey_option_label) => {
    cy.get('ul li').contains(survey_option_label).then(($li) => {
        cy.open_survey_in_same_tab($li)
    })
})

/**
 * @module Survey
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I return to the REDCap page I opened the survey from
 * @description Returns user to the REDCap page they were on before they exited to take a survey
 */
Given("I return to the REDCap page I opened the survey from", () => {
    cy.visit(window.redcap_url_pre_survey)
})