function before_click_monitor(type){
    if(type === ' in the "Add New Field" dialog box' || type === ' in the "Edit Field" dialog box' ){
        cy.intercept({
            method: 'GET',
            url: '/redcap_v' + Cypress.env('redcap_version') + "/Design/online_designer_render_fields.php?*"
        }).as('save_field')
    } else if (type === " on the dialog box for the Repeatable Instruments and Events module"){
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
    } else if (type === " to rename an instrument"){
        cy.wait('@rename_instrument')
    } else if (type === " on the Designate Instruments for My Events page") {
        if(Cypress.$('span#progress_save').length) cy.get('span#progress_save').should('not.be.visible')
        cy.wait('@designate_instruments')
    } else if (type === " on the Online Designer page") {
        cy.wait('@online_designer')
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
 * @param {string} onlineDesignerButtons - available options: 'Enable', 'Disable', 'Choose action', 'Survey settings', 'Automated Invitations'
 * @param {string} ordinal - available options: 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'last'
 * @param {string} labeledExactly - available options: 'labeled', 'labeled exactly', 'in the row labeled'
 * @param {string} saveButtonRouteMonitoring - available options: '', ' on the dialog box for the Repeatable Instruments and Events module', ' on the Designate Instruments for My Events page', ' on the Online Designer page', ' and cancel the confirmation window', ' and accept the confirmation window', ' in the dialog box to request a change in project status', ' to rename an instrument', ' in the "Add New Field" dialog box', ' in the "Edit Field" dialog box', ''
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @param {string} iframeVisibility - available options: '', ' in the iframe'
 * @param {string} toDownloadFile - available options: ' to download a file'
 * @description Clicks on a button element with a specific text label.
 */
Given("I click on( ){articleType}( ){onlineDesignerButtons}( ){ordinal}( )button {labeledExactly} {string}{saveButtonRouteMonitoring}{baseElement}{iframeVisibility}{toDownloadFile}", (article_type, online_designer_button, ordinal, exactly, text, button_type, base_element, iframe, download) => {
    let ord = 0
    if(ordinal !== undefined) ord = window.ordinalChoices[ordinal]

    before_click_monitor(button_type)

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

    if(download === " to download a file") {
        const loadScript = '<script> setTimeout(() => location.reload(), 2000); </script>';
        cy.get('body').invoke('append', loadScript);
    }

    let outer_element = window.elementChoices[base_element]

    if (iframe === " in the iframe"){
        const base = cy.frameLoaded().then(() => { cy.iframe() })

        if(exactly === 'labeled exactly'){
            base.within(() => {
                cy.get('button:visible,input[value*=""]:visible').contains(new RegExp("^" + text + "$", "g")).eq(ord).click()
            })
        } else {
            let sel = `button:contains("${text}"):visible,input[value*="${text}"]:visible`

            base.within(() => {
                cy.get(sel).eq(ord).click()
            })
        }

    } else {

        //This is the key to the Online Designer buttons being identified!
        if(window.parameterTypes['onlineDesignerButtons'].includes(online_designer_button)){
            outer_element = `table#table-forms_surveys:visible:has(tr:contains(${text}):visible)`
            text = online_designer_button.replace(/"/g, '') //Replace the button quotes with an empty string
        }

        if(exactly === 'labeled exactly'){
            let sel = `button:contains("${text}"):visible,input[value*=""]:visible`

            cy.top_layer(sel, outer_element).within(() => {
                cy.get(':button:visible,input[value*=""]:visible').contains(new RegExp("^" + text + "$", "g")).eq(ord).click()
            })

        } else {
            let sel = `button:contains("${text}"):visible,input[value*="${text}"]:visible`

            cy.top_layer(sel, outer_element).within(() => {
                cy.get(sel).eq(ord).then(($button) => {
                    if(text.includes("Open public survey")){ //Handle the "Open public survey" and "Open public survey + Logout" cases
                        cy.open_survey_in_same_tab($button)
                    } else {
                        $button[0].click()
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

    after_click_monitor(button_type)
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the {linkNames} {labeledExactly} {string} {saveButtonRouteMonitoring} {toDownloadFile} {baseElement}
 * @param {string} linkNames - available options: 'link', 'tab', 'instrument'
 * @param {string} text - the text on the anchor element you want to click* @param {string} saveButtonRouteMonitoring - available options: '', ' on the dialog box for the Repeatable Instruments and Events module', ' on the Designate Instruments for My Events page', ' on the Online Designer page', ' and cancel the confirmation window', ' and accept the confirmation window', ' in the dialog box to request a change in project status', ' to rename an instrument', ' in the "Add New Field" dialog box', ' in the "Edit Field" dialog box', ''
 * @param {string} toDownloadFile - available options: ' to download a file'
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Clicks on an anchor element with a specific text label.
 */
Given("I click on the( ){fileRepoIcons}( ){linkNames}( ){labeledExactly} {string}{saveButtonRouteMonitoring}{toDownloadFile}{baseElement}", (file_repo_icons, link_name, exactly, text, link_type, download, base_element) => {
    before_click_monitor(link_type)

    if(base_element === undefined){
        base_element = ''
    }
    let outer_element = window.elementChoices[base_element]

    if(download === " to download a file") {
        const loadScript = '<script> setTimeout(() => location.reload(), 2000); </script>';
        cy.get('body').invoke('append', loadScript);
    }

    if(exactly === "for the File Repository file named"){
        outer_element = `${window.tableMappings['file repository']}:visible tr:has(:contains(${JSON.stringify(text)}))`
        cy.top_layer(`a:contains(${JSON.stringify(text)})`, outer_element).within(() => {
            cy.get(`${window.fileRepoIcons[file_repo_icons]}`).click()
        })
    } else if(exactly === 'labeled exactly') {
        cy.top_layer(`a:contains(${JSON.stringify(text)}):visible`, outer_element).within(() => {
            cy.get('a:visible').contains(new RegExp("^" + text + "$", "g")).click()
        })
    } else {
        cy.top_layer(`a:contains(${JSON.stringify(text)}):visible`, outer_element).within(() => {
            cy.get(`a:contains(${JSON.stringify(text)}):visible`).contains(text).click()
        })
    }

    after_click_monitor(link_type)
})

/**
 * @module Interactions
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I close the popup
 * @description Closes popup with button labeled "Close"
 */
 Given("I close the popup", (text) => {
    cy.focused().should('have.text', 'Close').click()
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
 * @example I click on the radio labeled {string} in the dialog box {iframeVisibility}
 * @param {string} text - the text on the button element you want to click
 * @param {string} iframeVisibility - available options: '', ' in the iframe'
 */
Given("I click on the radio labeled {string} in the dialog box{iframeVisibility}", (text, iframe) => {
    let element = ''
    if(iframe === " in the iframe"){ element = cy.frameLoaded().then(() => { cy.iframe() }) }
    cy.click_on_dialog_button(text, 'span', element)
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I {enterType} {string} into the input field labeled {string} {baseElement}
 * @param {string} enterType - available options: 'verify', 'enter', 'clear field and enter'
 * @param {string} label - the label of the field
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 */
Given('I {enterType} {string} into the input field labeled {string}{baseElement}', (enter_type, text, label, base_element) => {
    let sel = `:contains(${JSON.stringify(label)}):visible`
    let element = `input[type=text]:visible:first,input[type=password]:visible:first`

    //Either the base element as specified or the default
    let outer_element = base_element.length > 0 ?
        cy.top_layer(sel, window.elementChoices[base_element]) :
        cy.top_layer(sel)

    outer_element.within(() => {
        let elm = null

        cy.contains(label).should('be.visible').then(($label) => {
            cy.wrap($label).parent().then(($parent) =>{
                if($parent.find(element).length){
                    elm = cy.wrap($parent).find(element)
                } else if ($parent.parent().find(element).length) {
                    elm = cy.wrap($parent).parent().find(element)
                }

                if(enter_type === "enter"){
                    elm.type(text)
                } else if (enter_type === "clear field and enter") {
                    elm.clear().type(text)
                }
            })
        })

    })
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

Given ('I {enterType} {string} into the textarea field labeled {string}{baseElement}', (enter_type, text, label, base_element) => {
    let sel = `:contains(${JSON.stringify(label)}):visible`
    let element = `textarea:first`

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
                        cy.setTinyMceContent($parent.find(element)[0]['id'], text)

                        //All other cases
                    } else {
                        if(enter_type === "enter"){
                            cy.wrap($parent).find(element).type(text)
                        } else if (enter_type === "clear field and enter") {
                            cy.wrap($parent).find(element).clear().type(text)
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
                            cy.wrap($parent).parent().find(element).clear().type(text)
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
Given('I {enterType} {string} into the data entry form field labeled {string}', (enter_type, text, label) => {
    //Note that we CLICK on the field (to select it) BEFORE we type in it - otherwise the text ends up somewhere else!
    if(enter_type === "clear field and enter"){
        cy.get(`label:contains(${JSON.stringify(label)})`)
            .invoke('attr', 'id')
            .then(($id) => {
                cy.get('[name="' + $id.split('label-')[1] + '"]')
            })
            .click()
            .clear()
            .type(text)
            .blur() //Remove focus after we are done so alerts pop up
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
Given("I {clickType} the {checkBoxRadio} {labeledExactly} {string}{baseElement}", (check, type, labeled_exactly, label, base_element) => {
    let outer_element = window.elementChoices[base_element]

    let label_selector = `:contains(${JSON.stringify(label)}):visible`
    let element_selector = `input[type=${type}]:visible:not([disabled])`

    if(labeled_exactly === "in the row labeled"){
        label_selector = `tr:contains(${JSON.stringify(label)}):visible`
        element_selector = `tr:contains(${JSON.stringify(label)}):visible td input[type=${type}]:visible:not([disabled])`
    }

    cy.top_layer(label_selector, outer_element).within(() => {
        let selector = cy.get_labeled_element(element_selector, label)
        if (type === "radio" || check === "click on") {
            selector.scrollIntoView().click()
        } else if (check === "check") {
            selector.scrollIntoView().check()
        } else if (check === "uncheck") {
            selector.scrollIntoView().uncheck()
        }
    })
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
Given('I select the radio option {string} for the field labeled {string}', (radio_option, field_label) => {
    cy.select_radio_by_label(field_label, radio_option)
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
 * @param {string} dropdownType - available options: 'dropdown', 'multiselect'
 * @param {string} label - the label of the field
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Selects a specific item from a dropdown
 */
Given('I select {string} on the {dropdownType} field labeled {string}{baseElement}', (option, type, label, base_element) => {
    let outer_element = window.elementChoices[base_element]
    let label_selector = `:contains("${label}"):visible`
    let element_selector = `select:has(option:contains("${option}")):visible:enabled`
    cy.top_layer(label_selector, outer_element).within(() => {
        cy.get_labeled_element(element_selector, label, option).then(($select) => {
            cy.wrap($select).scrollIntoView().
            should('be.visible').
            should('be.enabled').then(($t) => {
                cy.wait(500)
                cy.wrap($t).select(option)
                cy.wait(500)
            })
        })
    })
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
