/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see (the) {string} {iframeVisibility} {baseElement}
 * @param {string} text the text visually seen on screen
 * @param {string} iframeVisibility - available options: '', ' in the iframe'
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Visually verifies that text exists within the HTML object. NOTE: "should" is optional for readability.
 */
Given("I (should )see (the ){string}{iframeVisibility}{baseElement}", (text, iframe, base_element = '') => {
    cy.not_loading()

    if (window.icons.hasOwnProperty(text)) {
        cy.get(`${window.elementChoices[base_element]}:has(${window.icons[text]}):visible`).
            should('be.visible').
            should('have.descendants', window.icons[text])
    } else {
        const base = (iframe === " in the iframe" || window.elementChoices[base_element] === 'iframe') ?
            cy.frameLoaded().then(() => { cy.iframe() }) :
            cy.get(`${window.elementChoices[base_element]}:has(:contains(${JSON.stringify(text)}):visible)`)
        base.within(($elm) => {
            cy.wrap($elm).should('contain', text)
        })
    }
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should NOT see {string} {baseElement}
 * @param {string} text the text visually seen on screen
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Visually verifies that text does NOT exist within the HTML object.
 */
Given("I should NOT see {string}{baseElement}", (text, base_element = '') => {
    //If we don't detect it anywhere
    if(Cypress.$(`${window.elementChoices[base_element]}:contains(${JSON.stringify(text)})`).length === 0){
        expect('html').to.not.contain(text)
    //If we do detect the text, let us make sure it is not visible on-screen
    } else {
        cy.contains(text).should('not.be.visible');
    }
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should see {string} in the title
 * @param {string} title the HTML page title
 * @description Visually verifies that text does exist in the HTML page title.
 */
Given("I should see {string} in the title", (title) => {
    cy.title().should('include', title)
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should see the {dropdownType} field labeled {string} with the option {string} selected {baseElement}
 * @param {string} dropdownType - available options: 'dropdown', 'multiselect'
 * @param {string} label - the label of the field
 * @param {string} option - the option selected
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Selects a specific item from a dropdown
 */
Given('I should see the {dropdownType} field labeled {string} with the option {string} selected{baseElement}', (type, label, option, base_element) => {
    let label_selector = `:contains("${label}"):visible`
    let element_selector = `select:has(option:contains("${option}")):visible`

    //Either the base element as specified or the default
    let outer_element = base_element.length > 0 ?
        cy.top_layer(label_selector, window.elementChoices[base_element]) :
        cy.top_layer(label_selector)

    outer_element.within(() => {
        cy.get_labeled_element(element_selector, label).find(':selected').should('have.text', option)
    })
})

/**
 * @module Visibility
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I should see the {dropdownType} field labeled {string} with the options below
 * @param {string} dropdownType - available options: 'dropdown', 'multiselect'
 * @param {string} label the label of the row the selector belongs to
 * @param {dataTable} options the Data Table of selectable options
 * @description Visibility - Visually verifies that the element selector labeled label has the options listed
 */
Given("I should see the {dropdownType} field labeled {string} with the options below", (type, label, options) => {
    let label_selector = `:contains("${label}"):visible`

    cy.top_layer(label_selector).within(() => {
        for(let i = 0; i < options.rawTable.length; i++){
            let element_selector = `select:has(option:contains(${JSON.stringify(options.rawTable[i][0])})):visible`
            let dropdown = cy.get_labeled_element(element_selector, label)
            dropdown.should('contain', options.rawTable[i][0])
        }
    })
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should see a checkbox labeled {string} that is {check}
 * @param {string} label - the label associated with the checkbox field
 * @param {string} check - available options: 'checked', 'unchecked'
 * @description Selects a checkbox field by its label
 */
Given("I should see a checkbox labeled {string} that is {check}", (field_type, label, check) => {
    let label_selector = `:contains("${label}"):visible`
    let element_selector = `input[type=checkbox]:visible`
    cy.top_layer(label_selector).within(() => {
        cy.get_labeled_element(element_selector, label).should(check === "checked" ? "be.checked" : "not.be.checked")
    })
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should see the radio labeled {string} with option {string} {select}
 * @param {string} label - the text that should be displayed in an alert box
 * @param {string} select - available options: 'selected', 'unselected'
 * @description Visually verifies that the alert box contains text
 */
Given("I should see the radio labeled {string} with option {string} {select}", (label, option, selected) => {
    cy.select_radio_by_label(label, option, false, selected === 'selected')
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should )see a dialog containing the following text: {string}
 * @param {string} text - the text that should be displayed in a dialog box
 * @description Visually verifies that the dialog box contains text
 */
Given("I (should )see a dialog containing the following text: {string}", (text) => {
    cy.verify_text_on_dialog(text)
})

/**
 * @module Visibility
 * @author Corey DeBacker <debacker@wisc.edu>
 * @example I should see (a)(the) {labeledElement} labeled {string} {baseElement}
 * @param {string} labeledElement - available options: 'button', 'link'
 * @param {string} label - the label of the link that should be seen on screen (matches partially)
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Verifies that a visible element of the specified type containing `text` exists
 */
Given("I (should )see( ){articleType}( ){optionalString}( ){onlineDesignerButtons}( ){labeledElement}( ){labeledExactly}( ){string}{baseElement}", (article_type, opt_str, online_buttons, el, labeled_exactly, text, base_element) => {

    //Special case of Project status
    if(opt_str === "Project status:" && window.parameterTypes['projectStatus'].includes(text)){
        cy.get('div.menubox:contains("Project status:")').should('contain', text)
    } else {

        // double quotes need to be re-escaped before inserting into :contains() selector
        text = text.replaceAll('\"', '\\\"')
        let subsel = {'link':'a', 'button':'button', 'field': 'tr'}[el]

        let element_selector = window.elementChoices[base_element]
        let sel = `${subsel}:contains("${text}"):visible` + (el === 'button' ? `,input[value="${text}"]:visible:not([disabled])` : '')

        if(window.parameterTypes['onlineDesignerButtons'].includes(online_buttons)) {
            if (!window.icons.hasOwnProperty(online_buttons)) {
                online_buttons = online_buttons.replaceAll('"', '')
                sel = `${subsel}:contains("${online_buttons}"):visible` + (el === 'button' ? `,input[value="${online_buttons}"]:visible:not([disabled])` : '')
            }
        }

        if(labeled_exactly === "for the variable" ) {
            if(!window.parameterTypes['onlineDesignerButtons'].includes(online_buttons)) {
                //Trim off the quotes
                opt_str = opt_str.slice(1, -1)

                sel = `:contains("${opt_str}")`

                //We are converting to lower case because this will generally match on the instrument name (and prevent duplicate matches)
                let selector = `tr:contains(${JSON.stringify(`Variable: ${text}`)}):visible`
                element_selector = `${element_selector}:visible table:visible ${selector}`
            }

        } else if(labeled_exactly === "in the row labeled" ) {
            sel = `td:visible ${sel}`
            element_selector = `${element_selector}:visible table:visible tr:contains(${JSON.stringify(text)}):visible`
        } else if (labeled_exactly === "for the instrument row labeled") {
            if (window.icons.hasOwnProperty(online_buttons)) {
                sel = `td:visible :has(${window.icons[online_buttons]})`
            } else {
                sel = `td:visible ${sel}`
            }

            //We are converting to lower case because this will generally match on the instrument name (and prevent duplicate matches)
            let selector = `tr:has(td:contains(${JSON.stringify(text)}):first:visible)`
            element_selector = `${element_selector}:visible ${window.tableMappings['data collection instruments']}:visible ${selector}`
        }

        if(window.elementChoices[base_element] === 'iframe'){
            const base = cy.frameLoaded().then(() => { cy.iframe() })
            base.within(($elm) => {
                cy.wrap($elm).find(sel).should('contain', text)
            })
        } else {
            cy.top_layer(sel, element_selector).within(($elm) =>{
                cy.wrap($elm).should('contain', text)
            })
        }

    }
})

/**
 * @module Visibility
 * @author Corey DeBacker <debacker@wisc.edu>
 * @example I should NOT see a {labeledElement} labeled {string} {baseElement}
 * @param {string} labeledElement - available options: 'button', 'link'
 * @param {string} text - the label of the link that should not be seen on screen (matches partially)
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Verifies that there are no visible elements of the specified type with the label `text`
 */
Given("I should NOT see( ){articleType}( ){labeledElement} labeled {string}{baseElement}", (el, text, base_element) => {
    // double quotes need to be re-escaped before inserting into :contains() selector
    text = text.replaceAll('\"', '\\\"')
    let subsel = {'link':'a', 'button':'button', 'field': 'tr'}[el]
    let sel = `${subsel}:contains("${text}"):visible` + (el === 'button' ? `,button[value="${text}"]:visible` : '')
    cy.wait(2000)
    cy.get_top_layer(window.elementChoices[base_element], ($e) => {console.log(sel);expect($e.find(sel)).to.have.lengthOf(0)})
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should see {string} in the data entry form field labeled {string}
 * @param {string} text - the text that should be in the field
 * @param {string} label - the label of the field
 * @description Identifies specific text string in a field identified by a label.
 */
Given('I should see {string} in the data entry form field labeled {string}', (text, label) => {
    cy.contains('label', label)
        .invoke('attr', 'id')
        .then(($id) => {
            cy.get('[name="' + $id.split('label-')[1] + '"]').should('have.value', text)
        })
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see a(n) {string} within the {string} row of the column labeled {string} {tableName}
 * @param {string} table_item - the item that you are searching for - includes "checkmark", "x", or any {string}
 * @param {string} row_label - the label of the table row
 * @param {string} column_label - the label of the table column
 * @param {string} tableName - available options: '', ' of the User Rights table', ' of the Reports table'
 * @description Identifies specific text or special item within a cell on a table based upon row and column labels
 */
Given("I (should )see (a )(an ){string} within the {string} row of the column labeled {string}{tableName}", (item, row_label, column_label, table) => {
    if(Cypress.$('div#working').length) cy.get('div#working').should('not.be.visible')
    if(Cypress.$('div#report_load_progress').length) cy.get('div#report_load_progress').should('not.be.visible')

    const user_rights = { "checkmark" : `img[src*="tick"]`, "x" : `img[src*="cross"]` }

    let table_selector = 'table'
    let table_body = 'table'
    let no_col_match = false

    if(table === " of the Participant List table"){
        table_selector = window.tableMappings['participant list'][0]
        table_body = window.tableMappings['participant list'][1]
        no_col_match = true
    }

    cy.table_cell_by_column_and_row_label(column_label, row_label, table_selector, 'th', 'td', 0, table_body, no_col_match).then(($td) => {
        if(table === " of the User Rights table" && item.toLowerCase() in user_rights) {
            cy.wrap($td.find(user_rights[item.toLowerCase()]).length).should('have.length', 1)
        } else if(table === " of the Participant List table" && item.toLowerCase() in window.participantListIcons){
            cy.wrap($td.find(window.participantListIcons[item.toLowerCase()])).should('have.length', '1')
        } else {
            expect($td).to.contain(item)
        }
    })
})

/**
 * @module Visibility
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I should see {string} in (the) {tableTypes} table
 * @param {string} text - text to look for
 * @param {string} tableTypes - available options: 'a', 'logging', 'browse users', 'file repository', 'administrators', 'reports', 'report data', 'define events', 'data access groups', 'DAGs Switcher', 'record status dashboard', 'data collection instruments', 'codebook'
 * @description Identify specific text within a table
 */

Given('I should see {string} in (the ){tableTypes} table', (text, table_type = 'a') => {
    cy.not_loading()
    let selector = window.tableMappings[table_type]
    cy.get(`${selector}:visible`).contains('td', text, { matchCase: false })
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see Project status: "{projectStatus}"
 * @param {string} projectStatus - available options: 'Production', 'Development', 'Analysis/Cleanup'
 * @description Identify project status
 */

/* This method is defined inside "I should see (a)(the) {labeledElement} labeled {string} {baseElement}" */

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see (a) table {headerOrNot} row(s) containing the following values in (the) {tableTypes} table {baseElement}:
 * @param {string} headerOrNot - available options: 'header and '
 * @param {string} tableTypes - available options: 'a', 'logging', 'browse users', 'file repository', 'administrators', 'reports', 'report data', 'define events', 'data access groups', 'DAGs Switcher', 'record status dashboard', 'data collection instruments', 'codebook'
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @param {dataTable} options the Data Table of values specified
 * @description Allows us to check tabular data rows within REDCap
 */
Given('I (should )see (a )table( ){headerOrNot}( row)(s) containing the following values in (the ){tableTypes} table{baseElement}:', (header, table_type = 'a', base_element, dataTable) => {
    cy.not_loading()

    let selector = window.tableMappings[table_type]
    let tabular_data = dataTable['rawTable']
    let row_selector = ''

    let header_table = selector
    let main_table = selector

    //This is to account for weird cases where DataTables are present
    if(Array.isArray(selector)){
        header_table = selector[0]
        main_table = selector[1]
    }

    //If we are including the table header, we are also going to match specific columns
    if(header === "header and") {
        let columns = {}
        let header = tabular_data[0]

        let selector = `${header_table}:visible`

        let outer_element = cy.top_layer(selector, window.elementChoices[base_element])

        // console.log(window.elementChoices[base_element])

        outer_element.within(() => {
            outer_element.then(($cells) => {
                header.forEach((heading) => {
                    columns[heading] = null
                    for(let i = 0; i < $cells.length; i++){
                        let current_cell = $cells.eq(i)

                        // console.log(current_cell[0])
                        // console.log(heading)
                        // console.log(i)
                        // console.log(current_cell.text())
                        // console.log(current_cell.text().includes(heading))

                        if (current_cell.text().includes(heading) && columns[heading] === null) {
                            columns[heading] = i + 1
                        }
                    }
                })

            }).then(() => {
                //console.log(columns)
                dataTable.hashes().forEach((row) => {
                    row_selector = `${main_table}:visible tr:visible`
                    let filter_selector = []

                    for (const [index, key] of Object.keys(row).entries()) {
                        // console.log(index)
                        // console.log(key)
                        // console.log(row)
                        let value = row[key]
                        const column = columns[key]
                        //console.log(key)
                        //console.log(column)
                        if(!isNaN(column)){
                            //Big sad .. cannot combine nth-child and contains in a pseudo-selector :(
                            //We can get around this by finding column index and looking for specific column value within a row
                            if(value === "[icon]") {
                                row_selector += `:visible:has(td:has(img),th:has(img))`
                                filter_selector.push({ column: index + 1, value: value, regex: false, icon: true })
                            } else if(window.dateFormats.hasOwnProperty(value)){
                                row_selector += `:visible:has(td,th)`
                                filter_selector.push({ column: index + 1, value: value, regex: true, icon: false })
                            } else {
                                row_selector += `:visible:has(:contains(${JSON.stringify(value)}))`
                                filter_selector.push({ column: index + 1, value: value, regex: false, icon: false })
                            }
                        }
                    }

                    //console.log(filter_selector)

                    //See if at least one row matches the criteria we are suggesting
                    cy.get(row_selector).should('have.length.greaterThan', 0).then(($row) => {

                        //console.log($row)

                        filter_selector.forEach((item) => {
                            cy.wrap($row).find(`:nth-child(${item['column']})`).each(($cell, index) => {

                                const value = item['value']

                                //Special case for icons
                                if(item['icon']){
                                    cy.wrap($cell).find('img').should('exist')
                                //Special case for RegEx on date / time formats
                                } else if(item['regex'] && window.dateFormats[value].test($cell.text()) ){
                                    expect($cell.text()).to.match(window.dateFormats[value])

                                //All other cases are straight up text matches
                                } else if ( $cell.text().includes(item['value']) ) {
                                    expect($cell.text()).to.contain(value)
                                }
                            })
                        })
                    })
                })
            })
        })

    //Only matching on whether this row exists in the table.  Cells are in no particular order because we have no header to match on.
    } else if (header === "header") {

        let selector = `${header_table}:visible`

        let outer_element = base_element.length > 0 ?
            cy.top_layer(selector, window.elementChoices[base_element]) :
            cy.top_layer(selector)

        outer_element.within(() => {
            tabular_data.forEach((row) => {
                row_selector = 'tr:visible'
                row.forEach((element) => {
                    const containsStatements = element.split(/\n/) //This handles splitting values for us
                    containsStatements.forEach((statement) => {
                        if (statement.trim() !== "") {
                            row_selector += `:has(th:contains(${JSON.stringify(statement)}))`;
                        }
                    })
                })
                cy.get(row_selector).should('have.length.greaterThan', 0)
            })
        })

    } else {

        let selector = `${header_table}:visible`

        let outer_element = base_element.length > 0 ?
            cy.top_layer(selector, window.elementChoices[base_element]) :
            cy.top_layer(selector)

        outer_element.within(() => {
            tabular_data.forEach((row) => {
                row_selector = 'tr:visible'
                row.forEach((element) => {
                    if(!window.dateFormats.hasOwnProperty(element)) {
                        row_selector += `:has(td:contains(${JSON.stringify(element)}))`
                    }
                })
                cy.get(row_selector).should('have.length.greaterThan', 0)
            })
        })
    }

})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see the pdf has loaded in the iframe
 * @description Allows us to check whether PDF has loaded in iframe
 */
Given("I (should )see the pdf has loaded in the iframe", () => {
    cy.frameLoaded()
})