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
 * @example I click on the survey option label containing {string} label and want to track the response with a tag of {string}
 * @param {string} survey_option_label - the label of the survey option specified
 * @param {string} tag - (optional) the value of the tag specified
 * @description Clicks on a survey option label.  Track it via an optional tag.
 */
Given(/^I click on the survey option label containing "(.*)" label(?: and want to track the response with a tag of "(.*)")?$/, (survey_option_label, tag = 'default_survey_option') => {
    // Handle the beforeunload event to suppress the pop-up that says "Leave Site?"
    cy.on('beforeunload', (e) => {
        // Prevent the default behavior, which shows the pop-up
        e.preventDefault();
    });

    cy.window().then(win => {
        cy.stub(win, 'surveyOpen').callsFake((url, target) => {
            return win.open.wrappedMethod.call(win, url, '_self')
        }).as(tag)
    })

    let link = null;

    cy.get('ul li').contains(survey_option_label).then(($li) => {
        cy.wrap($li[0]).click() //Click the link

        //If we need to open the survey
        if(survey_option_label === "Open survey" || survey_option_label.includes("Log out") ){
            let onclick = Cypress.$($li[0]).prop('onclick').toString(); //Get the survey link
            let survey = onclick.split("surveyOpen('");
            link = survey[1].split("'")[0];

            if(tag === 'default_survey_option') {
                cy.get('@' + tag).should('have.been.calledOnceWithExactly', link, 0)
            }

            if(survey_option_label.includes("Log out") ){
                cy.logout()
            }
            cy.visit(link)
        }

        window.redcap_survey_link = link;
    })

    cy.on('beforeunload', () => {});
})