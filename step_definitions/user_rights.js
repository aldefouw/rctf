/**
 * @module UserRights
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I assign an expiration date to user {string} with username of {string} on project ID {int}
 * @param {string} name - the proper name of the user (e.g. Jane Doe)
 * @param {string} username - the username assigned to the user (e.g. jdoe)
 * @description Assigns 'Expiration Date' user right to a given user when provided a valid Project ID.
 *
 */
Given("I assign an expired expiration date to user {string} with username of {string}", (proper_name, username) => {
    cy.assign_expiration_date_to_user(username, proper_name)
})

/**
 * @module UserRights
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I assign an expired expiration date to user {string} with username of {string} on project ID {int}
 * @param {string} name - the proper name of the user (e.g. Jane Doe)
 * @param {string} username - the username assigned to the user (e.g. jdoe)
 * @description Removes 'Expiration Date' user right to a given user when provided a valid Project ID.
 *
 */
Given("I remove the expiration date to user {string} with username of {string}", (proper_name, username) => {
    cy.remove_expiration_date_from_user(username, proper_name)
})

const user_right_check_mappings = {
    'Project Setup & Design' : 'design',
    'User Rights' : 'user_rights',
    'Data Access Groups' : 'data_access_groups',
    'Stats & Charts' : 'graphical',
    'Create Records' : 'record_create',
    'Survey Distribution Tools' : 'participants',
    'Add/Edit/Organize Reports': 'reports',
    'Alerts & Notifications' : 'alerts',
    'Rename Records' : 'record_rename',
    'Delete Records' : 'record_delete',
    'Calendar' : 'calendar',
    'Data Import Tool'  : 'data_import_tool',
    'Data Comparison Tool' : 'data_comparison_tool',
    'Logging'  : 'data_logging',
    'File Repository' : 'file_repository',
    'Record Locking Customization' : 'lock_record_customize',
    'Lock/Unlock *Entire* Records' : 'lock_record_multiform',
    'Lock/Unlock *Entire* Records (record level)' : 'lock_record_multiform',
    'Data Quality - Create & edit rules' : 'data_quality_design',
    'Data Quality - Execute rules' : 'data_quality_execute',
    'API Export' : 'api_export',
    'API Import/Update' : 'api_import',
    'REDCap Mobile App - Allow users to collect data offline in the mobile app' : 'mobile_app',
    'REDCap Mobile App - Allow user to download data for all records to the app?' : 'mobile_app_download_data'
}

/**
 * @module UserRights
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I check the User Right named {string}
 * @param {string} text - name of User Right
 * @description Assign the user right
 *
 */
Given("I check the User Right named {string}", (text) => {
    cy.get('div[role=dialog]').should('be.visible')
    cy.get('input[name="' + user_right_check_mappings[text] + '"]').scrollIntoView().should('be.visible').check()
})

/**
 * @module UserRights
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I uncheck the User Right named {string}
 * @param {string} text - name of User Right
 * @description Unassign the user right
 *
 */
Given("I uncheck the User Right named {string}", (text) => {
    cy.get('div[role=dialog]').should('be.visible')
    cy.get('input[name="' + user_right_check_mappings[text] + '"]').scrollIntoView().should('be.visible').uncheck()
})

const single_choice_mappings = {
    'Data Exports' : 'data_export_tool',
    'API' : 'data_access_groups',
    'Lock/Unlock Records' : 'lock_record'
}

//These apply to REDCap v12+
const data_export_mappings = {
    'No Access' : '0',
    'De-Identified' : '2',
    'Remove All Identifier Fields' : '3',
    'Full Data Set' : '1'
}

/**
 * @module UserRights
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I check the user right identified by {string} and check option {string}
 * @param {string} text - name of user right
 * @description Assign user right to role/user
 *
 */
Given("I select the User Right named {string} and choose {string}", (text, option) => {
    cy.get('div[role=dialog]').should('be.visible')

    //For REDCap v12 + we have per instrument data exports, so let's handle that case here
    if(text === "Data Exports" && window.compareVersions.compare(Cypress.env('redcap_version'), '12.0.0', '>=')){

        //TODO: Possibly generate a Step Definition that allows us to configure this on a per instrument basis
        //For now, we are going to select every form to have the same option
        cy.get(`input[type=radio][name*="export-form-"]`).then(($e) => {
            $e.each((i) => {
                if($e[i].value === data_export_mappings[option]) {
                    cy.wrap($e[i]).click()
                }
            })
        })

    } else {

        cy.get('input[name="' + single_choice_mappings[text] + '"]').
            parent().
            parent().
            within(() => {
                cy.get('div').
                contains(new RegExp(window.escapeStringRegexp(option))).
                find('input').
                scrollIntoView().
                should('be.visible').
                click()
            })

    }

})

/**
 * @module UserRights
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I save changes within the context of User Rights
 * @description Click on the create add user button and add user
 *
 */
Given("I save changes within the context of User Rights", () => {
    cy.intercept({  method: 'POST',
        url: '/redcap_v' + Cypress.env('redcap_version') + '/UserRights/edit_user.php?*'
    }).as('saved_user')

    cy.get('button').contains(/add user|save changes/i).click()

    cy.wait('@saved_user')

    if(Cypress.$('div#working').length) cy.get('div#working').should('not.be.visible')
})

/**
 * @module UserRights
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (add | remove) all basic user rights for the open User Rights dialog box
 * @description Checks or Unchecks all Basic Rights within the User Rights dialog box.
 */
Given('I {user_right_action} all Basic Rights within the open User Rights dialog box', (action) => {
    cy.get('div[role=dialog]').should('be.visible').then(() => {

        //"Full Access" to Data Export Tool - does NOT apply to v12+
        if(action === "add" && Cypress.$('input[name=data_export_tool]').length !== 0){
            cy.get('input[name=data_export_tool]').should('be.visible').check('1')

            //"No Access" to Data Export Tool - does NOT apply to v12+
        } else if (action === "remove" && Cypress.$('input[name=data_export_tool]').length !== 0){
            cy.get('input[name=data_export_tool]').should('be.visible').check('0')
        }

        for(var key in user_right_check_mappings) {
            const input = cy.get('input[name="' + user_right_check_mappings[key] + '"]').scrollIntoView().should('be.visible')

            if(action === "add"){
                input.check()
            } else if (action === "remove"){
                input.uncheck()
            }
        }

        cy.get('div[role=dialog]').should('be.visible')
    })

})

// Achieves same result as Adam's "I grant {data_viewing_rights} level of Data Entry Rights on the {string} instrument for the username {string} for project ID {int}"
// However, the old method uses a cy.visit which we are trying to move away from. This also eliminates unnecessary parameters,
// but requires that the user rights configuration dialog is open
/**
 * @module UserRights
 * @author Corey DeBacker <debacker@wisc.edu>
 * @example I set Data Viewing Rights to < No Access | Read Only | View & Edit > for the instrument {string}
 * @param {data_viewing_rights} level - the level of rights to be assigned
 * @param {string} instrument - the label of the instrument for which to configure data entry rights
 * @description Selects a radio option for Data Entry Rights for the specified instrument within the user rights configuration dialog.
 */
Given('I set Data Viewing Rights to {data_viewing_rights}{edit_survey_rights} for the instrument {string}', (level, survey, instrument) => {
    cy.get('div[role=dialog]').should('be.visible')
    let input_values = {'No Access': 0, 'Read Only': 2, 'View & Edit': 1}
    if(survey === " with Edit survey responses checked") {
        cy.get(`table#form_rights tr:has(td:contains(${instrument})) input[type=checkbox]:visible`).check()
    } else if (survey === " with Edit survey responses unchecked"){
        cy.get(`table#form_rights tr:has(td:contains(${instrument})) input[type=checkbox]:visible`).uncheck()
    }
    cy.get(`table#form_rights tr:has(td:contains(${instrument})) input[value=${input_values[level]}]:visible`).check()
})