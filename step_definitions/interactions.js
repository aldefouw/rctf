const { Given } = require('@badeball/cypress-cucumber-preprocessor')

function before_click_monitor(type){
    if(type === ' in the "Add New Field" dialog box' || type === ' in the "Edit Field" dialog box' ){
        cy.intercept({
            method: 'GET',
            url: '/redcap_v' + Cypress.env('redcap_version') + "/Design/online_designer_render_fields.php?*"
        }).as('save_field')
    } else if (type === " on the dialog box for the Repeatable Instruments and Events module"){
        cy.window().its('performance.navigation.type').should('eq', 0)
        cy.intercept({
            method: 'POST',
            url: '/redcap_v' + Cypress.env('redcap_version') + "/*RepeatInstanceController:saveSetup*"
        }).as('repeat_save')
    } else if (type === " on the Designate Instruments for My Events page") {
        cy.intercept({
            method: 'POST',
            url: '/redcap_v' + Cypress.env('redcap_version') + '/Design/designate_forms_ajax*'
        }).as('designate_instruments')
    } else if (type === " to rename an instrument"){
        cy.intercept({
            method: 'POST',
            url: '/redcap_v' + Cypress.env('redcap_version') + '/Design/set_form_name.php*'
        }).as('rename_instrument')
    } else if (type === " on the Online Designer page"){
        cy.intercept({
            method: 'GET',
            url: '/redcap_v' + Cypress.env('redcap_version') + '/Design/online_designer_render_fields.php*'
        }).as('online_designer')
    } else if (type === " on the active Data Quality rule"){
        cy.intercept({
            method: 'POST',
            url: '/redcap_v' + Cypress.env('redcap_version') + '/DataQuality/edit_rule_ajax.php*'
        }).as('data_quality_rule')
    } else if (type === " and cancel the confirmation window"){
        cy.on('window:confirm', (str) => {
            return false
        })
    } else if (type === " and accept the confirmation window"){
        cy.window().then((win) =>
            cy.stub(win, 'confirm').as('confirm').returns(true),
        )

        cy.on('window:confirm', (str) => {
            return true
        })
    }
}

function after_click_monitor(type){
    if(type === ' in the "Add New Field" dialog box' || type === ' in the "Edit Field" dialog box' ){
        cy.wait('@save_field')
    } else if(type === " in the dialog box to request a change in project status"){
        cy.get('div#actionMsg').should("have.css", "display", "none")
    } else if (type === " on the dialog box for the Repeatable Instruments and Events module"){
        cy.wait('@repeat_save')
        cy.window().its('performance.navigation.type').should('eq', 1)
    } else if (type === " to rename an instrument"){
        cy.wait('@rename_instrument')
    } else if (type === " on the Designate Instruments for My Events page") {
        if(Cypress.$('span#progress_save').length) cy.get('span#progress_save').should('not.be.visible')
        cy.wait('@designate_instruments')
    } else if (type === " on the Online Designer page") {
        cy.wait('@online_designer')
    } else if (type === " on the active Data Quality rule"){
        cy.wait('@data_quality_rule')
        if(Cypress.$('.editlogic textarea').length){
            cy.get('.editlogic').then(($logic) => {
                cy.wrap($logic).should('not.have.descendants', 'textarea,button')
            })
        }
    } else if (type === " and cancel the confirmation window") {
        cy.on('window:confirm', (str) => {
            return true //subsequent windows go back to default behavior
        })
    }
}

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I select the submit option labeled "{instrumentSaveOptions}" on the Data Collection Instrument
 * @param {string} instrumentSaveOptions - available options: 'Save & Stay', 'Save & Exit Record', 'Save & Go To Next Record', 'Save & Exit Form', 'Save & Go To Next Form', 'Save & Go To Next Instance', 'Save & Add New Instance'
 * @description Clicks a specific submit option to save a record on a Data Collection Instrument
 */
 Given("I select the submit option labeled \"{instrumentSaveOptions}\" on the Data Collection Instrument", (text) => {

     //REDCap does some crazy conditional display of buttons, so we try to handle that as we best can
     cy.get('tr#__SUBMITBUTTONS__-tr').within(() => {
         let btn = Cypress.$("button:contains(" + JSON.stringify(text) + ")");

         //If the button shows up on the main section, we can click it like a typical element
         if(btn.length){

             cy.get('button').contains(text).click({ no_csrf_check: true })

         //If the button does NOT show up on main section, let's find it in the dropdown section
         } else {

             cy.get('button#submit-btn-dropdown').
                first().
                click({ no_csrf_check: true }).
                closest('div').
                find('a').
                contains(text).
                should('be.visible').
                click()
         }
     })
 })

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on {articleType} {onlineDesignerButtons} {ordinal} button {labeledExactly} {string} {saveButtonRouteMonitoring} {baseElement} {iframeVisibility} {toDownloadFile}
 * @param {string} articleType - available options: 'a', 'the'
 * @param {string} onlineDesignerButtons - available options: '"Enable"', '"Disable"', '"Choose action"', '"Survey settings"', '"Automated Invitations"', 'enabled survey icon', '"View Report"', '"Export Data"', '"Stats & Charts"', '"Execute"', '"Save"'
 * @param {string} ordinal - available options: 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'last'
 * @param {string} labeledExactly - available options: 'labeled', 'labeled exactly', 'in the row labeled', 'for the instrument row labeled', 'for the variable', 'for the File Repository file named', 'for Data Quality Rule #', 'within the Record Locking Customization table for the Data Collection Instrument named', 'the enabled survey icon link for the instrument row', 'the enabled survey icon link for the instrument row', 'for the Discrepant field labeled', 'within the Record Locking Customization table for the Data Collection Instrument named', 'for the field labeled'
 * @param {string} saveButtonRouteMonitoring - available options: ' on the dialog box for the Repeatable Instruments and Events module', ' on the Designate Instruments for My Events page', ' on the Online Designer page', ' and cancel the confirmation window', ' and accept the confirmation window', ' in the dialog box to request a change in project status', ' to rename an instrument', ' in the "Add New Field" dialog box', ' in the "Edit Field" dialog box', ' and will leave the tab open when I return to the REDCap project', ' on the active Data Quality rule'
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' on the Add/Edit Branching Logic dialog box', ' in the Add/Edit Branching Logic dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the open date picker widget', ' in the File Repository breadcrumb', ' in the File Repository table', ' in the View Access section of User Access', ' in the Edit Access section of User Access', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @param {string} iframeVisibility - available options: '', ' in the iframe'
 * @param {string} toDownloadFile - available options: ' to download a file', ' near "with records in rows" to download a file', ' near "with records in columns" to download a file'
 * @description Clicks on a button element with a specific text label.
 */
Given("I click on( ){articleType}( ){onlineDesignerButtons}( ){ordinal}( )button {labeledExactly} {string}{saveButtonRouteMonitoring}{baseElement}{iframeVisibility}{toDownloadFile}", (article_type, online_designer_button, ordinal, exactly, text, button_type, base_element, iframe, download) => {
    cy.then(() => {
        before_click_monitor(button_type)
    }).then(() => {
        let ord = 0
        if(ordinal !== undefined) ord = window.ordinalChoices[ordinal]

        // if(base_element === " on the Add/Edit Branching Logic dialog box" || base_element === " in the Add/Edit Branching Logic dialog box"){
        //     cy.intercept({
        //         method: 'POST',
        //         url: '/redcap_v' + Cypress.env('redcap_version') + '/Design/branching_logic_builder.php?pid=*'
        //     }).as('branching_logic')
        // }

        if(text === "Enable" && base_element === ' in the "Use surveys in this project?" row in the "Main project settings" section'){
            cy.intercept({
                method: 'POST',
                url: '/redcap_v' + Cypress.env('redcap_version') + '/ProjectSetup/modify_project_setting_ajax.php?pid=*'
            }).as('enable_survey')
        }

        if(text === "Disable" && base_element === ' in the "Use surveys in this project?" row in the "Main project settings" section'){
            cy.intercept({
                method: 'POST',
                url: '/redcap_v' + Cypress.env('redcap_version') + '/ProjectSetup/modify_project_setting_ajax.php?pid=*'
            }).as('disable_survey')
            window.survey_disable_attempt = true
        }

        if(download.includes("to download a file")) {
            const loadScript = '<script> setTimeout(() => location.reload(), 2000); </script>'
            cy.get('body').invoke('append', loadScript)
        }

        let outer_element = window.elementChoices[base_element]

        let force = base_element === ' in the dialog box' ? { force: true } : {}

        if (iframe === " in the iframe" || outer_element === 'iframe'){
            const base = cy.frameLoaded().then(() => { cy.iframe() })

            if(outer_element === 'iframe'){
                if(exactly === 'labeled exactly'){
                    let sel = 'button:visible,input[value*=""]:visible'

                    base.within(() => {
                        cy.get(sel).contains(new RegExp("^" + text + "$", "g")).eq(ord).click(force)
                    })
                } else {
                    let sel = `button:contains("${text}"):visible,input[value*="${text}"]:visible`

                    base.within(() => {
                        cy.get(sel).eq(ord).click(force)
                    })
                }
            } else {

                if(exactly === 'labeled exactly'){
                    let sel = 'button:visible,input[value*=""]:visible'

                    base.within(() => {
                        cy.top_layer(sel, outer_element).within(() => {
                            cy.get(sel).contains(new RegExp("^" + text + "$", "g")).eq(ord).click(force)
                        })
                    })
                } else {
                    let sel = `button:contains("${text}"):visible,input[value*="${text}"]:visible`

                    base.within(() => {
                        cy.top_layer(sel, outer_element).within(() => {
                            cy.get(sel).eq(ord).click(force)
                        })
                    })
                }

            }

        } else {

            if(window.parameterTypes['onlineDesignerButtons'].includes(online_designer_button) &&
                exactly === "for Data Quality Rule #") {
                outer_element = `table:visible tr:has(div.rulenum:contains(${JSON.stringify(text)})):visible`
                text = online_designer_button.replace(/"/g, '')

            } else if(window.parameterTypes['onlineDesignerButtons'].includes(online_designer_button) &&
                exactly === 'within the Record Locking Customization table for the Data Collection Instrument named') {
                outer_element = `${window.tableMappings['record locking']}:visible tr:has(:contains(${JSON.stringify(text)}))`
                text = online_designer_button.replace(/"/g, '') //Replace the button quotes with an empty string

                //This is the key to the Online Designer buttons being identified!
            } else if(window.parameterTypes['onlineDesignerButtons'].includes(online_designer_button)){
                outer_element = `table:visible tr:has(td:has(div:has(div:contains("${text}"))))`
                text = online_designer_button.replace(/"/g, '') //Replace the button quotes with an empty string
            }

            if(exactly === 'labeled exactly') {
                let sel = `button:contains("${text}"):visible,input[value*=""]:visible`

                cy.top_layer(sel, outer_element).within(() => {
                    cy.get(':button:visible,input[value*=""]:visible').contains(new RegExp("^" + text + "$", "g")).eq(ord).click(force)
                })

            } else {
                let sel = `button:contains("${text}"):visible,input[value*="${text}"]:visible`

                cy.top_layer(sel, outer_element).within(() => {
                    cy.get(sel).eq(ord).then(($button) => {
                        if(text.includes("Open public survey")){ //Handle the "Open public survey" and "Open public survey + Logout" cases
                            cy.open_survey_in_same_tab($button, !(button_type !== undefined && button_type === " and will leave the tab open when I return to the REDCap project"), (text === 'Log out+ Open survey'))
                        } else {
                            cy.wrap($button).click(force)
                        }
                    })
                })
            }
        }

        if(text === "Enable" && base_element === ' in the "Use surveys in this project?" row in the "Main project settings" section'){
            cy.wait('@enable_survey')
        }

        if(text === "Disable" && base_element === ' in the dialog box' && window.survey_disable_attempt){
            cy.wait('@disable_survey')
            window.survey_disable_attempt = false
        }

        if(base_element === " on the Add/Edit Branching Logic dialog box" || base_element === " in the Add/Edit Branching Logic dialog box"){
            cy.wait(2000)
        }
    }).then(() => {
        after_click_monitor(button_type)
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the {onlineDesignerFieldIcons} {fileRepoIcons} {linkNames} {labeledExactly} {string} {saveButtonRouteMonitoring} {toDownloadFile} {baseElement}
 * @param {string} linkNames - available options: 'link', 'tab', 'instrument', 'icon'
 * @param {string} text - the text on the anchor element you want to click
 * @param {string} saveButtonRouteMonitoring - available options: '', ' on the dialog box for the Repeatable Instruments and Events module', ' on the Designate Instruments for My Events page', ' on the Online Designer page', ' and cancel the confirmation window', ' and accept the confirmation window', ' in the dialog box to request a change in project status', ' to rename an instrument', ' in the "Add New Field" dialog box', ' in the "Edit Field" dialog box', ''
 * @param {string} toDownloadFile - available options: ' to download a file'
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Clicks on an anchor element with a specific text label.
 */
Given("I (click)(locate) on the( ){onlineDesignerFieldIcons}( ){fileRepoIcons}( ){linkNames}( ){labeledExactly} {string}{saveButtonRouteMonitoring}{toDownloadFile}{baseElement}", (designer_field_icons, file_repo_icons, link_name, exactly, text, link_type, download, base_element) => {
    before_click_monitor(link_type)

    cy.not_loading()

    if(base_element === " in the File Repository table"){
        cy.wait_for_datatables().assertWindowProperties()
    }

    if(base_element === undefined){
        base_element = ''
    }
    let outer_element = window.elementChoices[base_element]

    if(download.includes("to download a file")) {
        const loadScript = '<script> setTimeout(() => location.reload(), 2000); </script>';
        cy.get('body').invoke('append', loadScript);
    }

    if(exactly === "for the field labeled") {
        let contains = ''
        text.split(' ').forEach((val) => {
            contains += `:has(:contains(${JSON.stringify(val)}))`
        })

        outer_element = `tr${contains}:visible`
        cy.top_layer(`a:visible`, outer_element).within(() => {
            cy.get(`${window.onlineDesignerFieldIcons[designer_field_icons]}`).scrollIntoView().click({force: true})
        })
    } else if(exactly === "for Data Quality Rule #") {
        outer_element = `table:visible tr:has(div.rulenum:contains(${JSON.stringify(text)})):visible`
        cy.top_layer(`a:visible`, outer_element).within(() => {
            cy.get(`${window.onlineDesignerFieldIcons[designer_field_icons]}`).scrollIntoView().click({force: true})
        })
    } else if(exactly === "for the Discrepant field labeled") {
        outer_element = `table:visible tr:has(:contains(${JSON.stringify(text)})):visible`
        cy.top_layer(`a:visible`, outer_element).within(() => {
            cy.get(`${window.onlineDesignerFieldIcons[designer_field_icons]}`).scrollIntoView().click({force: true})
        })
    } else if(exactly === "for the variable") {
        const legacy_selector = `table[id*=design-]:contains(${JSON.stringify(`Variable: ${text}`)}):visible`
        const current_selector = `table[id*=design-]:contains(${JSON.stringify(`Field Name: ${text}`)}):visible`
        cy.top_layer(`a:visible`, `${legacy_selector},${current_selector}`).within(() => {
            cy.get(`${window.onlineDesignerFieldIcons[designer_field_icons]}`).scrollIntoView().click({force: true})
        })
    } else if(exactly === "for the File Repository file named"){
        outer_element = `${window.tableMappings['file repository']}:visible tr:has(:contains(${JSON.stringify(text)}))`
        cy.top_layer(`a:contains(${JSON.stringify(text)})`, outer_element).within(() => {
            if(file_repo_icons === undefined){
                file_repo_icons = designer_field_icons
            }
            cy.get(`${window.fileRepoIcons[file_repo_icons]}`).click()
        })
    } else if(exactly === "within the Record Locking Customization table for the Data Collection Instrument named"){
        outer_element = `${window.tableMappings['record locking']}:visible tr:has(:contains(${JSON.stringify(text)}))`
        cy.top_layer(`a:has(img:visible)`, outer_element).within(() => {
            if(file_repo_icons === undefined){
                file_repo_icons = designer_field_icons
            }
            cy.get(`${window.onlineDesignerFieldIcons[file_repo_icons]}`).click()
        })
    } else if(exactly === 'labeled exactly') {
        cy.top_layer(`a:contains(${JSON.stringify(text)}):visible`, outer_element).within(() => {
            cy.get('a:visible').contains(new RegExp("^" + text + "$", "g")).click()
        })
    } else if(download.includes('with records in')) {
        let keyword = download.includes('rows') ? 'rows' : 'columns'

        cy.top_layer(`a:contains(${JSON.stringify(text)}):visible`, outer_element).within(() => {
            //Note: This is a pretty brittle approach, but it works ... best way to handle this weird edge case where we are looking for "Download your Data Import Template", which has two hits
            cy.get(`a:contains(${JSON.stringify(text)}):visible`).eq(keyword === "rows" ? 0 : 1).contains(text).click()
        })

    } else {
        cy.top_layer(`a:contains(${JSON.stringify(text)}):visible`, outer_element).within(() => {
            cy.get(`a:contains(${JSON.stringify(text)}):visible`).contains(text).then(($elm) => {
                if(base_element === " in the File Repository table"){
                    cy.intercept({
                        method: 'POST',
                        url: '/redcap_v' + Cypress.env('redcap_version') + "/*FileRepositoryController:getBreadcrumbs*"
                    }).as('file_breadcrumbs')
                    //cy.get($elm).invoke('attr', 'onclick')
                    cy.get($elm).click()
                } else {
                    cy.wrap($elm).click()
                }
            })
        })
    }

    after_click_monitor(link_type)
})

/**
 * @module Interactions
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I click on the button labeled {string} for the row labeled {string}
 * @param {string} text - the text on the button element you want to click
 * @param {string} label - the lable of the row with the button you want to click
 * @description Clicks on a button element with a specific text title inside the table row label
 */
Given("I click on the button labeled {string} for the row labeled {string}", (text, label) => {
    // Find the cell that contains the label and find the parent
    cy.get('td').contains(label).parents('tr').within(() => {
        // Find the button element
        cy.get('button[title="' + text +'"]').click()
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I {enterType} {string} into the input field labeled {string} {baseElement}
 * @param {string} enterType - available options: 'verify', 'enter', 'clear field and enter', 'click on'
 * @param {string} label - the label of the field
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 */
Given('I {enterType} {string} (into)(is within) the {inputType} field labeled {string}{baseElement}{iframeVisibility}', (enter_type, text, input_type, label, base_element, iframe) => {
    let select = 'input[type=text]:visible,input[type=password]:visible'
    if(input_type === 'password'){
        select = 'input[type=password]:visible'
    }

    if(iframe === " in the iframe"){
        const base = cy.frameLoaded().then(() => { cy.iframe() })

        if(input_type === 'password'){
            select = 'input[type=password]:visible:first'
        } else {
            select = `input[type=text]:visible:first,input[type=password]:visible:first`
        }
        base.within(() => {
            let elm = cy.get(select)

            if(enter_type === "enter"){
                elm.scrollIntoView().type(text)
            } else if (enter_type === "clear field and enter") {
                elm.scrollIntoView().clear().type(text)
            } else if (enter_type === "verify"){
                elm.scrollIntoView().invoke('val').should('include', text)
            }
        })

    } else {
        let sel = `:contains(${JSON.stringify(label)}):visible`
        let element = select

        //Either the base element as specified or the default
        let outer_element = base_element.length > 0 ?
            cy.top_layer(sel, window.elementChoices[base_element]) :
            cy.top_layer(sel)

        outer_element.within(() => {
            let elm = null

            cy.contains(label).should('be.visible').then(($label) => {
                cy.wrap($label).parent().then(($parent) =>{
                    if($parent.find(element).length){
                        elm = cy.wrap($parent).find(element).filter((i, el) => !Cypress.$(el).parent().hasClass('ui-helper-hidden-accessible'))
                    } else if ($parent.parent().find(element).length) {
                        elm = cy.wrap($parent).parent().find(element).filter((i, el) => !Cypress.$(el).parent().hasClass('ui-helper-hidden-accessible'))
                    }

                    if(enter_type === "enter"){
                        elm.first().type(text)
                    } else if (enter_type === "clear field and enter") {
                        elm.first().clear().type(text)
                    } else if (enter_type === "verify"){
                        if(window.dateFormats.hasOwnProperty(text)){
                            //elm.invoke('val').should('match', window.dateFormats[text])
                        } else {
                            elm.first().invoke('val').should('include', text)
                        }
                    }
                })
            })
        })
    }
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I {enterType} {string} into the textarea field labeled {string} {baseElement}
 * @param {string} enterType - available options: 'verify', 'enter', 'clear field and enter'
 * @param {string} text - the text to enter into the field
 * @param {string} label - the label of the field
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Enters a specific text string into a field identified by a label.  (NOTE: The field is not automatically cleared.)
 */

Given ('I {enterType} {string} in(to) the textarea field {labeledExactly} {string}{baseElement}', (enter_type, text, labeled_exactly, label, base_element) => {
    let sel = `:contains(${JSON.stringify(label)}):visible`

    let element = `textarea:first`

    //Turns out the logic editor uses a DIV with an "Ace Editor" somehow /shrug
    if(label === "Logic Editor") {
        element = `div#rc-ace-editor div.ace_line`
    }

    //Either the base element as specified or the default
    let outer_element = base_element.length > 0 ?
        cy.top_layer(sel, window.elementChoices[base_element]) :
        cy.top_layer(sel)

    outer_element.within(() => {
        let elm = null

        cy.contains(label).should('be.visible').then(($label) => {
            cy.wrap($label).parent().then(($parent) =>{
                if($parent.find(element).length){

                    //If the textarea has a TinyMCE editor applied to it
                    if($parent.find(element).hasClass('mceEditor')){
                        cy.customSetTinyMceContent($parent.find(element)[0]['id'], text)

                        //All other cases
                    } else {
                        if(enter_type === "enter"){
                            cy.wrap($parent).find(element).type(text)
                        } else if (enter_type === "clear field and enter") {
                            cy.wrap($parent).find(element).clear().type(text)
                        } else if(enter_type === "click on"){
                            cy.wrap($parent).find(element).click()
                        }
                    }


                } else if ($parent.parent().find(element).length) {

                    //If the textarea has a TinyMCE editor applied to it
                    if($parent.parent().find(element).hasClass('mceEditor')){
                        cy.setTinyMceContent($parent.parent().find(element)[0]['id'], text)

                    //All other cases
                    } else {
                        if(enter_type === "enter"){
                            cy.wrap($parent).parent().find(element).type(text)
                        } else if (enter_type === "clear field and enter") {

                            //Logic editor does not use an actual textarea; we need to invoke the text instead!
                            if(label === "Logic Editor"){
                              cy.wrap($parent).parent().find(element).
                                click({force: true}).
                                invoke('attr', 'contenteditable', 'true').
                                type(`{selectall} {backspace} {backspace} ${text}`, {force: true})
                            } else {
                                cy.wrap($parent).parent().find(element).clear().type(text)
                            }

                        } else if(enter_type === "click on"){
                            cy.wrap($parent).parent().find(element).click()
                        }
                    }
                }
            })
        })
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I enter {string} into the data entry form field labeled {string}
 * @param {string} enterType - available options: 'verify', 'enter', 'clear field and enter'
 * @param {string} text - the text to enter into the field
 * @param {string} label - the label of the field
 * @description Enters a specific text string into a field identified by a label.  (NOTE: The field is not automatically cleared.)
 */
Given('I {enterType} {string} (is within)(into) the data entry form field labeled {string}', (enter_type, text, label) => {
    let contains = ''
    label.split(' ').forEach((val) => {
        contains += `:has(:contains(${JSON.stringify(val)}))`
        label = val
    })
    let outer_element = `tr${contains}:has(input[type=text],textarea):visible:first`

    cy.get(outer_element).within(() => {
        //Note that we CLICK on the field (to select it) BEFORE we type in it - otherwise the text ends up somewhere else!
        if(enter_type === "verify") {
            let elm = cy.get(`label:contains(${JSON.stringify(label)})`)
                .invoke('attr', 'id')
                .then(($id) => {
                    cy.get('[name="' + $id.split('label-')[1] + '"]')
                })

            if(window.dateFormats.hasOwnProperty(text)){
                elm.invoke('val').should('match', window.dateFormats[text])
            } else {
                elm.invoke('val').should('include', text)
            }

        } else if(enter_type === "clear field and enter"){

            if(text === ""){
                cy.get(`label:contains(${JSON.stringify(label)})`)
                    .invoke('attr', 'id')
                    .then(($id) => {
                        cy.get('[name="' + $id.split('label-')[1] + '"]')
                    })
                    .click()
                    .clear()
                    .blur() //Remove focus after we are done so alerts pop up
            } else {
                cy.get(`label:contains(${JSON.stringify(label)})`)
                    .invoke('attr', 'id')
                    .then(($id) => {
                        cy.get('[name="' + $id.split('label-')[1] + '"]')
                    })
                    .click()
                    .clear()
                    .type(text)
                    .blur() //Remove focus after we are done so alerts pop up
            }

        } else {
            cy.get(`label:contains(${JSON.stringify(label)})`)
                .invoke('attr', 'id')
                .then(($id) => {
                    cy.get('[name="' + $id.split('label-')[1] + '"]')
                })
                .click()
                .type(text)
                .blur() //Remove focus after we are done so alerts pop up
        }
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I clear the field labeled {string}
 * @param {string} label - the label of the field to select
 * @description Clears the text from an input field based upon its label
 */
Given('I clear the field labeled {string}', (label) => {
    cy.contains(label).then(($label) => {
        cy.wrap($label).parent().find('input').clear()
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I {clickType} the {checkBoxRadio} labeled {string} {baseElement}
 * @param {string} clickType - available options: 'click on', 'check', 'uncheck'
 * @param {string} checkBoxRadio - available options: 'checkbox', 'radio'
 * @param {string} label - the label associated with the checkbox field
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Selects a checkbox field by its label
 */
Given("(for the Event Name \")(the Column Name \")(for the Column Name \"){optionalString}(\", I )(I ){clickType} the {checkBoxRadio} {labeledExactly} {string}{baseElement}{iframeVisibility}", (event_name, check, type, labeled_exactly, label, base_element, iframe) => {
    cy.not_loading()

    const elm = (iframe === " in the iframe") ? cy.frameLoaded().then(() => { cy.iframe() }) : null

    let outer_element = window.elementChoices[base_element]
    let label_selector = `:contains(${JSON.stringify(label)}):visible`
    let element_selector = `input[type=${type}]:visible:not([disabled])`

    //Special case: selecting a value within a table row
    if(labeled_exactly === "in the row labeled"){
        label_selector = `tr:contains(${JSON.stringify(label)}):visible`
        element_selector = `tr:contains(${JSON.stringify(label)}):visible td input[type=${type}]:visible:not([disabled])`
    }

    //Special case: "Repeating Instruments and events" popup to select instruments by checkbox
    if(event_name.length > 0){
        label_selector = `tr:contains(${JSON.stringify(event_name)}):visible`
        element_selector = `tr:contains(${JSON.stringify(event_name)}):visible td:contains(${JSON.stringify(label)}):visible input[type=${type}]:visible:not([disabled])`
    }

    function clickElement(label_selector, outer_element, element_selector, label, labeled_exactly){
        cy.top_layer(label_selector, outer_element).within(() => {
            let selector = cy.get_labeled_element(element_selector, label, null, labeled_exactly === "labeled exactly")
            if (type === "radio" || check === "click on") {
                selector.scrollIntoView().click()
            } else if (check === "check") {
                selector.scrollIntoView().check()
            } else if (check === "uncheck") {
                selector.scrollIntoView().uncheck()
            }
        })
    }

    if(labeled_exactly === "within the Record Locking Customization table for the Data Collection Instrument named"){

        cy.get(`${window.tableMappings['record locking']}:visible tr:contains(${JSON.stringify(event_name)}):visible` ).then(($tr) => {
            cy.wrap($tr).find('td').each(($td, index) => {
                if($td.text().includes(event_name)){
                    element_selector = `td:nth-child(${index + 1}) input[type=${type}]:visible:not([disabled])`
                }
            })
        }).then(() => {
            outer_element = `${window.tableMappings['record locking']}:visible`
            label_selector = `tr:contains(${JSON.stringify(label)}):visible`
            clickElement(label_selector, outer_element, element_selector, label, labeled_exactly)
        })

    } else if(iframe === " in the iframe") {
        elm.within(() => { clickElement(label_selector, outer_element, element_selector, label, labeled_exactly) })
    } else {
        clickElement(label_selector, outer_element, element_selector, label, labeled_exactly)
    }
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the input element labeled {string}
 * @param {string} clickType - available options: 'click on', 'check', 'uncheck'
 * @param {string} elmType - available options: 'input', 'list item', 'checkbox', 'span'
 * @param {string} label - the label associated with the checkbox field
 * @description Selects a checkbox field by its label
 */
Given("I {clickType} the {elmType} element labeled {string}", (click_type, element_type, label) => {
    cy.contains(label).then(($label) => {
        if(element_type === 'input'){
            cy.wrap($label).parent().find('input').click()
        } else if(element_type === 'checkbox'){
            if(click_type === "click on"){
                cy.wrap($label).parent().find('input[type=checkbox]').click()
            } else if (click_type === "check"){
                cy.wrap($label).parent().find('input[type=checkbox]').check()
            } else if (click_type === "uncheck"){
                cy.wrap($label).parent().find('input[type=checkbox]').uncheck()
            }
        } else if (element_type === "list item"){
            cy.get('li').contains(label).click()
        } else if (element_type === "span"){
            cy.get('span').contains(label).click()
        }
    })
})

/**
 * @module Interactions
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I set the input file field named {string} to the file at path {string}
 * @param {string} name - the name attribute of the input file field
 * @param {string} path - the path of the file to upload
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Selects a file path to upload into input named name
 */
Given("I set the input file field named {string} to the file at path {string}{baseElement}", (name, path, base_element) => {
    let sel = 'input[name=' + name + ']'

    //Either the base element as specified or the default
    let outer_element = base_element.length > 0 ?
        cy.top_layer(sel, window.elementChoices[base_element]) :
        cy.top_layer(sel)

    outer_element.within(() => {
        cy.get('input[name=' + name + ']').then(($field) => {
            cy.wrap($field).selectFile(path)
        })
    })
})

/**
 * @module Interactions
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I enter {string} into the field identified by {string} for the label {string}
 * @param {string} text - the text to enter into the field
 * @param {string} selector - the selector of the element to enter the text into
 * @param {string} label - the label associated with the field
 * @description Selects an input field by its label and then by selector
 */
Given('I enter {string} into the field identified by {string} labeled {string}', (text, selector, label) => {
    // Method is because the input on Edit Reports doesn't have a label
    // Find the cell that contains the label and find the parent
    cy.get('td').contains(label).parents('tr').within(() => {
        cy.get(selector).type(text)
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example for this scenario, I will {confirmation} a confirmation window containing the text {string}
 * @param {string} confirmation - available options: 'accept', 'cancel'
 * @param {string} window_text - text that is expected to appear in the confirmation window
 * @description Pre-emptively tell Cypress what to do about a confirmation window.  NOTE: This step must come BEFORE step that clicks button.
 */
Given('for this scenario, I will {confirmation} a confirmation window containing the text {string}', (action, window_text) => {
    cy.on('window:confirm', (str) => {
        expect(str).to.contain(window_text)
        return action === "accept"
    })
})

/**
 * @module Interactions
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I export all data in {string} format and expect {int} record
 * @param {string} value - type of export
 * @param {int} num - expect this many records
 * @description Exports all data in selected export type
 */
 Given('I export all data in {string} format and expect {int} record(s)', (value, num) => {
    cy.get('tr#reprow_ALL').find('button.data_export_btn').should('be.visible').contains('Export Data').click()
    cy.get('input[value='+value+']').click()
    cy.export_csv_report().should((csv) => {
        expect([...new Set(csv.map((row) => row[0]).slice(1))]).to.have.lengthOf(num)                     // 2 records
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click the element containing the following text: {string}
 * @param {string} value - text that is inside the element
 * @description Clicks the element that contains the text specified
 */
Given('I click the element containing the following text: {string}', (value) => {
    cy.get(':contains("' + value + '"):visible:last').click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I select the radio option {string} for the field labeled {string}
 * @param {string} option - option we want to select from the radio options
 * @param {string} field_label - the label on the field we want to select
 * @description Clicks the radio option on the field specified
 */
Given('I select the radio option {string} for the field labeled {string}{baseElement}', (radio_option, field_label, base_element) => {
    let outer_element = base_element.length > 0 ?  window.elementChoices[base_element]: window.elementChoices['']
    cy.get(outer_element).within(() => {
        cy.select_radio_by_label(field_label, radio_option)
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I select the dropdown option {string} for the Data Collection Instrument field labeled {string}
 * @param {string} dropdown_option - option we want to select from the dropdown
 * @param {string} field_label - the label on the field we want to select
 * @description Clicks the dropdown option on the field specified
 */
Given('I select the dropdown option {string} for the Data Collection Instrument field labeled {string}', (dropdown_option, field_label) => {
    cy.select_field_by_label(field_label).select(dropdown_option)
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I select the checkbox option {string} for the field labeled {string}
 * @param {string} checkbox_option - option we want to select from the dropdown
 * @param {string} field_label - the label on the field we want to select
 * @description Clicks the dropdown option on the field specified
 */
Given('I select the checkbox option {string} for the field labeled {string}', (checkbox_option, field_label) => {
    cy.select_checkbox_by_label(field_label, checkbox_option)
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I select {string} on the {dropdownType} field labeled {string} {baseElement}
 * @param {string} text - the text to enter into the field
 * @param {string} dropdownType - available options: 'dropdown', 'multiselect', 'checkboxes', 'radio'
 * @param {string} label - the label of the field
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Selects a specific item from a dropdown
 */
Given('I select {string} (in)(on) the {dropdownType} (field labeled)(of the open date picker widget for) {string}{baseElement}', (option, type, label, base_element) => {
    cy.not_loading()
    let outer_element = window.elementChoices[base_element]
    let label_selector = `:contains(${JSON.stringify(label)}):visible`
    if(type === "dropdown" || type === "multiselect"){
        let element_selector = `select:has(option:contains(${JSON.stringify(option)})):visible:enabled`
        cy.top_layer(label_selector, outer_element).within(() => {
            cy.get_labeled_element(element_selector, label, option).then(($select) => {
                cy.wrap($select).scrollIntoView().
                should('be.visible').
                should('be.enabled').then(($t) => {

                    if(type === "dropdown") {
                        cy.wait(500)
                        cy.wrap($t).select(option)
                        cy.wait(500)
                    } else if (type === "multiselect"){
                        let all_options = [option]

                        const options = Cypress.$($t).find('option:selected')
                        if(options.length) {
                            options.each((index, element) => {
                                all_options.push(Cypress.$(element).text())
                            })
                        }

                        cy.wrap($t).select(all_options)
                    }
                })
            })
        })
    } else if(type === "radio" || type === "checkboxes"){
        if(type === "checkboxes"){ type = 'checkbox' }
        let label_selector = `:contains(${JSON.stringify(label)}):visible input[type=${type}]:visible:not([disabled])`
        let selector = cy.get_labeled_element(label_selector, option, null, false)
        cy.top_layer(label_selector, outer_element).within(() => {
            selector.scrollIntoView().check()
        })
    }
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I wait for (another) {int} {timeType}
 * @param {string} timeType - available options: 'seconds', 'second', 'minutes', 'minute'
 * @description Waits for specified number of second(s)/minute(s) before allowing anything else to happen
 */
Given("I wait for (another ){int} {timeType}", (time, unit) => {
    if(unit === "second" || unit === "seconds"){
        cy.wait(time * 1000)
    } else if (unit === "minute" || unit === "minutes"){
        cy.wait(time * 60000)
    }
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I {enterType} {string} into the field with the placeholder text of {string}
 * @param {string} enterType - available options: 'verify', 'enter', 'clear field and enter'
 * @param {string} text - the text to enter into the field
 * @param {string} placeholder - the text that is currently in the field as a placeholder
 * @description Enter text into a specific field
 */
Given("I {enterType} {string} into the field with the placeholder text of {string}", (enter_type, text, placeholder) => {
    const selector = 'input[placeholder="' + placeholder + '"]:visible,input[value="' + placeholder + '"]:visible'

    const elm = cy.get(selector)

    if(enter_type === "enter"){
        elm.type(text)
    } else if (enter_type === "clear field and enter") {
        elm.clear().type(text)
    }
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I close the iframe window
 * @description Closes iframe window on the To-Do List page
 */
Given("I close the iframe window", () => {
    cy.frameLoaded()
    cy.get('div.trim-close-btn').click()
})

/**
 * @module Interactions
 * @author Sumon Chattopadhyay <sumon.chattopadhyay@utah.edu>
 * @example I close the popup
 * @description Closes the pop up
 */
Given("I close the popup", () => {
    cy.get('button').contains("Close").click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the table heading column labeled {string}
 * @param {string} column - the text to enter into the field
 * @description Clicks on a specific table column
 */
Given('I click on the table heading column labeled {string}', (column) => {
    let selector = `table:has(th:contains("${column}"):visible):visible`

    cy.get(selector).then(($th) => {
        cy.wrap($th).find(`:contains("${column}"):visible:first`).click()
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the table heading column labeled {string}
 * @param {string} column - the text to enter into the field
 * @description Clicks on a specific table column
 */
Given('I drag the field choice labeled {string} to the box labeled "Show the field ONLY if..."', (field_choice) => {
    let field_choice_escaped = field_choice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    let selector = `ul:visible:has(li:contains(${field_choice_escaped}))`
    cy.get(selector).then(($elm) => {
        let elm = cy.wrap($elm).find(`li:contains(${field_choice_escaped})`)
        elm.scrollIntoView().dragToTarget('div#dropZone1:visible')
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I enter a signature into the signature field
 * @param {string} column - the text to enter into the field
 * @description Clicks on a specific table column
 */
Given('I draw a signature in the signature field area', () => {
    cy.get('div#signature-div').click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I move the slider field labeled {string} to the position of {int}
 * @param {string} label - the label of the field
 * @param {string} position - the desired position we want to move the slider to
 * @description Moves the slider to a specific position
 */
Given('I move the slider field labeled {string} to the position of {int}', (label, position) => {
    cy.get(`label:contains(${JSON.stringify(label)})`)
        .invoke('attr', 'id')
        .then(($id) => {
            let id = $id.split('label-')[1]
            cy.get(`div[id="${id}-slider"]`).then((subject) => {

                cy.wrap(subject).find('span').trigger('mousedown', {force: true})

                //Get the current position of the slider and then increment up or down respectively
                cy.get(`input[aria-labelledby="${$id}"]`).then(($input) => {

                    cy.move_slider(subject,
                                   $input.val(),
                                   subject.attr('data-max'),
                                   subject.attr('data-min'),
                                   position)
                })
            })
        })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I move the Hour slider for the open date picker widget to {int}
 * @param {int} hour - the desired hour position we want
 * @description Moves the slider to a specific position for the Hour slider
 */
Given('I move the Hour slider for the open date picker widget to {int}', (hour) => {
    cy.get('.ui_tpicker_hour').then((subject) => {
        cy.wrap(subject).find('span').trigger('mousedown', {force: true})

        //Get the current position of the slider and then increment up or down respectively
        cy.get('.ui_tpicker_time').then(($time) => {
            const time = $time.text().split(':')
            let $hour = time[0]
            cy.move_slider(subject, $hour, 23, 0, hour, "Hour", 20)
        })
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I move the Minute slider for the open date picker widget to {int}
 * @param {int} minute - the desired minute position we want
 * @description Moves the slider to a specific position for the Minute slider
 */
Given('I move the Minute slider for the open date picker widget to {int}', (min) => {
    cy.get('.ui_tpicker_minute').then((subject) => {
        cy.wrap(subject).find('span').trigger('mousedown', {force: true})

        //Get the current position of the slider and then increment up or down respectively
        cy.get('.ui_tpicker_time').then(($time) => {
            const time = $time.text().split(':')
            let $min = time[1]
            cy.move_slider(subject, $min, 59, 0, min, "Minute", 20)
        })
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I open the date picker widget on the field labeled {string}
 * @param {string} label - the label of the field
 * @description Open the date picker widget
 */
Given('I click on the date picker widget on the field labeled {string}', (label, position) => {
    cy.get(`label:contains(${JSON.stringify(label)})`)
        .invoke('attr', 'id')
        .then(($id) => {
            let id = $id.split('label-')[1]
            cy.get(`input[aria-labelledby="${$id}"]`).parent().find('img.ui-datepicker-trigger').click()
        })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the {string} button for the field labeled {string}
 * @param {string} label - the label of the field
 * @description Open the date picker widget
 */
Given('I click on the {string} button for the field labeled {string}', (button_label, label, position) => {
    cy.get(`label:contains(${JSON.stringify(label)})`).parentsUntil('tr').parent().within(() => {
        cy.get(`button:contains(${JSON.stringify(button_label)}):visible`).click({no_csrf_check: true})
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the {string} {labeledElement} within (a)(the) {tableTypes} table in the following row:
 * @param {string} label - label on the element
 * @param {string} element - link or button
 * @param {string} table - description of the table
 * @param {dataTable} table - row(s) from the table to help us identify the row
 * @description Clicks on an element (link or button) within a specified row of a table
 */
Given("I click on the {string} {labeledElement} within (a)(the) {tableTypes} table in the following row:", (label, element, table = 'a', dataTable) => {
    const rows = dataTable['rawTable']
    const lastRow = rows[rows.length - 1]

    const subsel = {
                   'link': `a:contains(${label}):visible`,
                   'button': `button:contains(${label}):visible,input[value="${JSON.stringify(label)}"]`
                 }[element]

    const selector = window.tableMappings[table]

    const tds = lastRow.map(cell => `:contains(${JSON.stringify(cell)})`).join('')

    cy.get(`${selector}:visible tr${tds}:visible ${subsel}`).then(($elm) => {
        $elm.attr('target', '_self')
    }).click()
})