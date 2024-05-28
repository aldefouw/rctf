const { Given } = require('@badeball/cypress-cucumber-preprocessor')

// /**
//  * @module Visibility
//  * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
//  * @example I (should) see (the) {string} {iframeVisibility} {baseElement}
//  * @param {string} text the text visually seen on screen
//  * @param {string} iframeVisibility - available options: '', ' in the iframe'
//  * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' on the Add/Edit Branching Logic dialog box', ' in the Add/Edit Branching Logic dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the open date picker widget', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
//  * @description Visually verifies that text exists within the HTML object. NOTE: "should" is optional for readability.
//  */
// Given("I (should )see {string}{iframeVisibility}{baseElement}", (text, iframe, base_element = '') => {
//     cy.not_loading()
//
//     if (window.icons.hasOwnProperty(text)) {
//         cy.get(`${window.elementChoices[base_element]}:has(${window.icons[text]}):visible`).
//             should('be.visible').
//             should('have.descendants', window.icons[text])
//     } else {
//         const base = (iframe === " in the iframe" || window.elementChoices[base_element] === 'iframe') ?
//             cy.frameLoaded().then(() => { cy.iframe() }) :
//             cy.get(`${window.elementChoices[base_element]}:has(:contains(${JSON.stringify(text)}):visible)`)
//         base.within(($elm) => {
//             cy.wrap($elm).should('contain', text)
//         })
//     }
// })

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I should NOT see {string} {baseElement}
 * @param {string} text the text visually seen on screen
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Visually verifies that text does NOT exist within the HTML object.
 */
Given("I should NOT see {string}{baseElement}", (text, base_element = '') => {
    cy.not_loading()

    //If we don't detect it anywhere
    if(Cypress.$(`${window.elementChoices[base_element]}:contains(${JSON.stringify(text)})`).length === 0){
        expect('html').to.not.contain(text)
    //If we do detect the text, let us make sure it is not visible on-screen
    } else {
        cy.contains(text).then(($elm) => {
            cy.wait_to_hide_or_detach($elm).then(() => {
                expect('html').to.not.contain(text)
            })
        })
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
 * @param {string} dropdownType - available options: 'dropdown', 'multiselect', 'checkboxes', 'radio'
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
 * @description Visibility - Visually verifies that the element selector has the options listed
 */
Given("I should see the {dropdownType} field labeled {string} with the options below", (type, label, options) => {
    let label_selector = `:contains("${label}"):visible`

    cy.top_layer(label_selector).within(() => {
        for(let i = 0; i < options.rawTable.length; i++){
            let element_selector = `select:has(option:contains(${JSON.stringify(options.rawTable[i][0])})):visible`
            if (type === "multiselect" || type === "radio") {
                element_selector = `div:has(label:contains(${JSON.stringify(options.rawTable[i][0])})):visible`
            }
            let element = cy.get_labeled_element(element_selector, label)
            element.should('contain', options.rawTable[i][0])
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
 * @author Corey DeBacker <debacker@wisc.edu>
 * @example I (should) see {articleType} {optionalString} {onlineDesignerButtons} {labeledElement} {labeledExactly} {string}{baseElement} {disabled}
 * @param {string} labeledElement - available options: 'button', 'link', 'field', 'section break'
 * @param {string} label - the label of the link that should be seen on screen (matches partially)
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @description Verifies that a visible element of the specified type containing `text` exists
 */
Given("I (should )see {articleType}{optionalString}{onlineDesignerButtons}( ){labeledElement}( ){labeledExactly}( ){string}{iframeVisibility}{baseElement}( ){disabled}", (article_type, opt_str, online_buttons, el, labeled_exactly, text, iframe, base_element, disabled_text) => {
    cy.not_loading()

    // console.log(opt_str)

    function extractQuotedStrings(str) {
        let inQuotes = false
        let currentQuote = ''
        const result = []

        for (let i = 0; i < str.length; i++) {
            const char = str[i]

            if (char === '"') {
                if (inQuotes) {
                    result.push(currentQuote)
                    currentQuote = ''
                }
                inQuotes = !inQuotes;
            } else if (inQuotes) {
                currentQuote += char
            }
        }

        return result
    }

    if(opt_str.includes('the data entry form')) {

        const matches = extractQuotedStrings(opt_str)

        cy.contains('label', text)
            .invoke('attr', 'id')
            .then(($id) => {
                cy.get('[name="' + $id.split('label-')[1] + '"]').should('have.value', matches[0])
            })

    } else if(opt_str.includes('icon') &&
        opt_str.includes('longitudinal instrument on event') &&
        opt_str.includes('for record')) {

        const matches = extractQuotedStrings(opt_str)

        cy.get_record_status_dashboard(matches[2], matches[1], text, '', false, matches[0])

    } else if (opt_str.includes('icon') &&
        opt_str.includes('longitudinal instrument on event')){

        const matches = extractQuotedStrings(opt_str)

        cy.table_cell_by_column_and_row_label(matches[2], matches[1], 'table#event_grid_table').then(($td) => {
            cy.wrap($td).find('a:visible:first').then((link_location) => {
                expect(link_location).to.have.descendants(window.recordStatusIcons[matches[0]])
            })
        })

    } else if (opt_str === "an alert box with the following text:") {

        return new Cypress.Promise((resolve) => {
            // Simulate an async operation
            setTimeout(() => {

                if (window.lastAlert !== undefined || i > 10) {
                    expect(window.lastAlert).to.contain(text)
                }

                resolve('done')
            }, 1000)
        })

    } else if(opt_str === "a field named"){
        cy.get(`table[role=presentation]:visible tr:visible td:visible:contains(${text})`).contains(text)
    } else if (window.icons.hasOwnProperty(text)) {
        cy.get(`${window.elementChoices[base_element]}:has(${window.icons[text]}):visible`).
        should('be.visible').
        should('have.descendants', window.icons[text])

    } else if(opt_str === "a downloaded file named"){
        cy.download_file(text).then(($file) => {
            expect($file).to.exist
        })
    } else {
        const base = (iframe === " in the iframe" || window.elementChoices[base_element] === 'iframe') ?
            cy.frameLoaded().then(() => { cy.iframe() }) :
            cy.get(`${window.elementChoices[base_element]}:has(:contains(${JSON.stringify(text)}):visible)`)
        base.within(($elm) => {
            return cy.wrap($elm).should('contain', text)
        }).then((next_section) => {

            // console.log('made it here')
            // console.log(labeled_exactly)

            if(!next_section) {

                //Special case of Project status
                if (opt_str === "Project status:" && window.parameterTypes['projectStatus'].includes(text)) {
                    cy.get('div.menubox:contains("Project status:")').should('contain', text)
                } else {

                    // double quotes need to be re-escaped before inserting into :contains() selector
                    text = text.replaceAll('\"', '\\\"')
                    let subsel = {'link': 'a', 'button': 'button', 'field': 'tr', 'section break': 'td.header'}[el]

                    let element_selector = window.elementChoices[base_element]
                    let disabled_status = disabled_text === "is disabled" ? ':disabled' : ':not([disabled])'

                    let sel = `${subsel}:contains("${text}"):visible` + (el === 'button' ? `,input[value="${text}"]:visible${disabled_status}` : '')

                    if (window.parameterTypes['onlineDesignerButtons'].includes(online_buttons)) {
                        if (!window.icons.hasOwnProperty(online_buttons)) {
                            online_buttons = online_buttons.replaceAll('"', '')
                            sel = `${subsel}:contains("${online_buttons}"):visible` + (el === 'button' ? `,input[value="${online_buttons}"]:visible${disabled_status}` : '')
                        }
                    }

                    if (labeled_exactly === "for the variable") {
                        if (!window.parameterTypes['onlineDesignerButtons'].includes(online_buttons)) {
                            //Trim off the quotes
                            opt_str = opt_str.slice(1, -1)

                            sel = `:contains("${opt_str}")`

                            //We are converting to lower case because this will generally match on the instrument name (and prevent duplicate matches)
                            let selector = `tr:contains(${JSON.stringify(`Variable: ${text}`)}):visible`
                            element_selector = `${element_selector}:visible table:visible ${selector}`
                        }

                    } else if (labeled_exactly === "in the row labeled") {
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

                        // cy.top_layer(sel, outer_element).within(() => {
                        //     cy.get(sel).eq(ord).then(($button) => {
                        //         cy.wrap($elm).find(sel)
                        //     })
                        // })

                    } else if (labeled_exactly === " in the File Repository breadcrumb" || labeled_exactly === "  in the File Repository table") {
                        //cy.wait('@file_breadcrumbs')
                    }

                    if (window.elementChoices[base_element] === 'iframe') {
                        const base = cy.frameLoaded().then(() => {
                            cy.iframe()
                        })
                        base.within(($elm) => {
                            cy.wrap($elm).find(sel).should('contain', text)
                            if (disabled_text === "is disabled") {
                                cy.wrap($elm).find(sel).should('be.disabled')
                            }
                        })
                    } else {

                        cy.top_layer(sel, element_selector).then(($elm) => {
                            if (disabled_text === "is disabled") {
                                cy.wrap($elm).find(sel).should('be.disabled')
                            }
                        })

                        if (opt_str === "the exact time in the" || opt_str === "today's date in the") {
                            const today = new Date();
                            const year = today.getFullYear()
                            const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
                            const day = String(today.getDate()).padStart(2, '0')
                            const hours = String(today.getHours()).padStart(2, '0')
                            const minutes = String(today.getMinutes()).padStart(2, '0')
                            const seconds = String(today.getSeconds()).padStart(2, '0')

                            const expectedValue = (opt_str === "the exact time in the") ?
                                `${hours}:${minutes}:${seconds}` :
                                `${year}-${month}-${day}`

                            cy.get(sel).find('input').invoke('val')
                                .then((actualValue) => {
                                    if (opt_str === "the exact time in the") {
                                        let [h, m, s] = actualValue.split(':').map(Number)
                                        const actualTimeInSeconds = (h * 3600) + (m * 60) + s

                                        let [h_e, m_e, s_e] = expectedValue.split(':').map(Number)
                                        const expectedTimeInTimeInSeconds = (h_e * 3600) + (m_e * 60) + s_e

                                        //5 seconds tolerance
                                        expect(actualTimeInSeconds).to.be.closeTo(expectedTimeInTimeInSeconds, 5)
                                    } else {
                                        expect(actualValue).to.eq(expectedValue)
                                    }

                                })
                        }
                    }
                }
            }

        })
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
    cy.get_top_layer(window.elementChoices[base_element], ($e) => {
        // console.log(sel)
        expect($e.find(sel)).to.have.lengthOf(0)
    })
})

/**
 * @module Visibility
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see a(n) {string} within the {string} row of the column labeled {string} {tableName}
 * @param {string} table_item - the item that you are searching for - includes "checkmark", "x", or any {string}
 * @param {string} row_label - the label of the table row
 * @param {string} column_label - the label of the table column
 * @param {string} tableName - available options: '', ' of the User Rights table', ' of the Reports table', ' of the Participant List table'
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
 * @param {string} tableTypes - available options: 'a', 'logging', 'browse users', 'file repository', 'administrators', 'reports', 'report data', 'define events', 'data access groups', 'DAGs Switcher', 'record status dashboard', 'data collection instruments', 'codebook', 'import data display', 'participant list', 'user rights', 'record locking'
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
 * @param {string} headerOrNot - available options: 'header and', 'header'
 * @param {string} tableTypes - available options: 'a', 'logging', 'browse users', 'file repository', 'administrators', 'reports', 'report data', 'define events', 'data access groups', 'DAGs Switcher', 'record status dashboard', 'data collection instruments', 'codebook'
 * @param {string} baseElement - available options: ' on the tooltip', ' in the tooltip', ' on the role selector dropdown', ' in the role selector dropdown', ' on the dialog box', ' in the dialog box', ' within the data collection instrument list', ' on the action popup', ' in the action popup', ' in the Edit survey responses column', ' in the "Main project settings" section', ' in the "Use surveys in this project?" row in the "Main project settings" section', ' in the "Use longitudinal data collection with defined events?" row in the "Main project settings" section', ' in the "Use the MyCap participant-facing mobile app?" row in the "Main project settings" section', ' in the "Enable optional modules and customizations" section', ' in the "Repeating instruments and events" row in the "Enable optional modules and customizations" section', ' in the "Auto-numbering for records" row in the "Enable optional modules and customizations" section', ' in the "Scheduling module (longitudinal only)" row in the "Enable optional modules and customizations" section', ' in the "Randomization module" row in the "Enable optional modules and customizations" section', ' in the "Designate an email field for communications (including survey invitations and alerts)" row in the "Enable optional modules and customizations" section', ' in the "Twilio SMS and Voice Call services for surveys and alerts" row in the "Enable optional modules and customizations" section', ' in the "SendGrid Template email services for Alerts & Notifications" row in the "Enable optional modules and customizations" section', ' in the validation row labeled "Code Postal 5 caracteres (France)"', ' in the validation row labeled "Date (D-M-Y)"', ' in the validation row labeled "Date (M-D-Y)"', ' in the validation row labeled "Date (Y-M-D)"', ' in the validation row labeled "Datetime (D-M-Y H:M)"', ' in the validation row labeled "Datetime (M-D-Y H:M)"', ' in the validation row labeled "Datetime (Y-M-D H:M)"', ' in the validation row labeled "Datetime w/ seconds (D-M-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (M-D-Y H:M:S)"', ' in the validation row labeled "Datetime w/ seconds (Y-M-D H:M:S)"', ' in the validation row labeled "Email"', ' in the validation row labeled "Integer"', ' in the validation row labeled "Letters only"', ' in the validation row labeled "MRN (10 digits)"', ' in the validation row labeled "MRN (generic)"', ' in the validation row labeled "Number"', ' in the validation row labeled "Number (1 decimal place - comma as decimal)"', ' in the validation row labeled "Number (1 decimal place)"', ' in the validation row labeled "Number (2 decimal places - comma as decimal)"', ' in the validation row labeled "Number (2 decimal places)"', ' in the validation row labeled "Number (3 decimal places - comma as decimal)"', ' in the validation row labeled "Number (3 decimal places)"', ' in the validation row labeled "Number (4 decimal places - comma as decimal)"', ' in the validation row labeled "Number (4 decimal places)"', ' in the validation row labeled "Number (comma as decimal)"', ' in the validation row labeled "Phone (Australia)"', ' in the validation row labeled "Phone (North America)"', ' in the validation row labeled "Phone (UK)"', ' in the validation row labeled "Postal Code (Australia)"', ' in the validation row labeled "Postal Code (Canada)"', ' in the validation row labeled "Postal Code (Germany)"', ' in the validation row labeled "Social Security Number (U.S.)"', ' in the validation row labeled "Time (HH:MM:SS)"', ' in the validation row labeled "Time (HH:MM)"', ' in the validation row labeled "Time (MM:SS)"', ' in the validation row labeled "Vanderbilt MRN"', ' in the validation row labeled "Zipcode (U.S.)"'
 * @param {dataTable} options the Data Table of values specified
 * @description Allows us to check tabular data rows within REDCap
 */
Given('I (should )see (a )table( ){headerOrNot}( row)(s) containing the following values in (the ){tableTypes} table{baseElement}:', (header, table_type = 'a', base_element, dataTable) => {
    cy.not_loading()

    //Determine if records exist
    const records = Cypress.$('td.data:has(:contains("No records exist"))')

    //If records do NOT exist, do not bother looking for data tables to load!
    if(records.length === 0){
        cy.wait_for_datatables().assertWindowProperties()
    }

    let selector = window.tableMappings[table_type]
    let tabular_data = dataTable['rawTable']
    let html_elements = window.tableHtmlElements

    let header_table = selector
    let main_table = selector

    //This is to account for weird cases where DataTables are present (in REDCap)
    if(Array.isArray(selector)){
        header_table = selector[0]
        main_table = selector[1]
    }
    //We will first try to match on exact match, then substring if no match
    function exactMatch(label, header, columns, colSpan, rowSpan, count){
        header.forEach((heading) => {
            const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
            const exactPattern = new RegExp(`^${escapedLabel}$`)
            if(exactPattern.test(heading) && columns[heading].match_type === 'none' && label !== ""){
                columns[heading] = { col: count, match_type: 'exact', colSpan: colSpan, rowSpan: rowSpan }
            }
        })
    }

    function subMatch(label, header, columns, colSpan, rowSpan, count){
        header.forEach((heading) => {
            const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const substringPattern = new RegExp(escapedLabel);
            const substringNoCase = new RegExp(escapedLabel, 'i');
            const reverseMatch = new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
            if(columns[heading].match_type === 'none' && label !== ""){
                if (substringPattern.test(heading)){
                    columns[heading] = { col: count, match_type: 'sub', colSpan: colSpan, rowSpan: rowSpan }
                } else if (substringNoCase.test(heading)){
                    columns[heading] = { col: count, match_type: 'sub_no_case', colSpan: colSpan, rowSpan: rowSpan }
                } else if (reverseMatch.test(label)){
                    columns[heading] ={ col: count, match_type: 'reverse', colSpan: colSpan, rowSpan: rowSpan }
                }
            }
        })
    }

    function findColumnHeaders(header_selector, $cells, header, columns) {
        let count = 0
        let prevColSpan = 1
        cy.wrap($cells).find(`td,th`).each(($cell, i, cells) => {
            let colSpan = parseInt($cell.attr('colspan'))
            let rowSpan = parseInt($cell.attr('rowspan'))

            count += prevColSpan //We need to find the number of cells to span across

            //Handle weird nested columns
            if (colSpan > 1 && rowSpan === 1) {
                let freeze_count = count

                if(table_type !== "report data") header_selector = header_selector.replace('tr', '')

                //Notice how we don't want to use TR here
                cy.get(`${header_selector} tr:nth-child(2) th[rowspan=1]`).each((c) => {
                    cy.wrap(c).then(($t) => {
                        let ls = $t[0].innerText.split("\n")
                        ls.forEach((label, index) => {
                            exactMatch(label, header, columns, 1, 1, freeze_count)
                        })
                        freeze_count += 1
                    })
                })
            }
            prevColSpan = colSpan

        }).then(() => {
            count = 0
            prevColSpan = 1
            let prevRowSpan = 1

            cy.wrap($cells).find(`td,th`).each(($cell, i, cells) => {
                let labels = $cell[0].innerText.split("\n")
                let colSpan = parseInt($cell.attr('colspan')) || 1
                let rowSpan = parseInt($cell.attr('rowspan')) || 1
                if(records.length && prevRowSpan === 1 || records.length === 0){
                    count += prevColSpan //We need to find the number of cells to span across
                }
                labels.forEach((label) => {
                    exactMatch(label, header, columns, colSpan, rowSpan, count)
                })
                prevColSpan = colSpan
                prevRowSpan = rowSpan
            })
        }).then(() => {
            count = 0
            prevColSpan = 1

            cy.wrap($cells).find(`td,th`).each(($cell, i, cells) => {
                let labels = $cell[0].innerText.split("\n")
                let colSpan = parseInt($cell.attr('colspan')) || 1
                let rowSpan = parseInt($cell.attr('rowspan')) || 1
                count += prevColSpan //We need to find the number of cells to span across
                labels.forEach((label) => {
                    subMatch(label, header, columns, colSpan, rowSpan, count)
                })
                prevColSpan = colSpan
            })

        }).then(() => {
            //console.log(columns)
        })
    }

    //If we are including the table header, we are also going to match specific columns
    if(header === "header and") {
        let columns = {}
        let header = tabular_data[0]

        let selector = `${header_table}:visible`
        let outer_element = cy.top_layer(selector, window.elementChoices[base_element])

        let header_selector = `${selector} tr`
        if(table_type === "report data") header_selector = `${selector} `

        header.forEach((heading, index) => {
            header_selector += ':has('
            heading.split(' ').forEach((head) => {
                header_selector += `:contains(${JSON.stringify(head)})`
            })
            header_selector += ')'
        })

        header.forEach((heading, index) => {
            columns[heading] = {match_type: 'none'}
        })

        outer_element.within(() => {
            cy.get(header_selector, {timeout: 20000}).then(($cells) => {
                findColumnHeaders(header_selector, $cells, header, columns)
            }).then(() => {
                //console.log(columns)
                let filter_selector = []
                dataTable.hashes().forEach((row, row_index) => {
                    for (const [index, key] of Object.keys(row).entries()) {
                        let value = row[key]
                        let column = columns[key].col
                        if (!isNaN(column)) {

                            let contains = ''

                            if(Object.keys(html_elements).includes(value)) {
                                contains += `td:has(${html_elements[value].selector}),th:has(${html_elements[value].selector})`
                            } else if (window.dateFormats.hasOwnProperty(value)) {
                                contains += `td,th`
                            } else {
                                value.split(' ').forEach((val) => {
                                    if(Object.keys(html_elements).includes(val)) {
                                        contains += `td:has(${html_elements[val].selector}),th:has(${html_elements[val].selector})`
                                    } else if (window.dateFormats.hasOwnProperty(val)){
                                        contains += `td,th`
                                    } else{
                                        contains += `:contains(${JSON.stringify(val)})`
                                    }
                                })
                            }

                            filter_selector.push({
                                'column': column,
                                'row': row_index,
                                'value': value,
                                'html_elm': Object.keys(html_elements).includes(value),
                                'regex': window.dateFormats.hasOwnProperty(value),
                                'selector': `:has(${contains})`
                            })

                            // let contains = ''
                            // value.split(' ').forEach((val) => {
                            //     contains += `:contains(${JSON.stringify(val)})`
                            // })
                            //
                            // filter_selector.push({
                            //     'column': column,
                            //     'row': row_index,
                            //     'value': value,
                            //     'html_elm': Object.keys(html_elements).includes(value),
                            //     'regex': window.dateFormats.hasOwnProperty(value),
                            //     'selector': Object.keys(html_elements).includes(value) ?
                            //         `:has(td:has(${html_elements[value].selector}),th:has(${html_elements[value].selector}))` :
                            //         `:has(${window.dateFormats.hasOwnProperty(value) ? 'td,th' : contains})`
                            // })
                        }
                    }
                })

                //See if at least one row matches the criteria we are suggesting
                //console.log(filter_selector)
                let row_selector = []
                filter_selector.forEach((item) => {
                    row_selector[item.row] = (row_selector.hasOwnProperty(item.row)) ?
                        `${row_selector[item.row]}${item.selector}` :
                        `${main_table}:visible tr${item.selector}`
                })

                row_selector.forEach((row, row_number) => {
                    cy.get(row).should('have.length.greaterThan', 0).then(($row) => {
                     filter_selector.forEach((item) => {
                            if(item.row === row_number){
                                //Big sad .. cannot combine nth-child and contains in a pseudo-selector :(
                                //We can get around this by finding column index and looking for specific column value within a row
                                cy.wrap($row).find(`td:nth-child(${item.column}),th:nth-child(${item.column})`).each(($cell) => {
                                    //console.log(item)
                                    if (item.html_elm) {
                                        cy.wrap($cell).find(html_elements[item.value].selector).should(html_elements[item.value].condition)
                                    } else if (item.regex) {
                                        expect($cell[0].innerText.trim()).to.match(window.dateFormats[item.value])
                                    } else if ($cell[0].innerText.includes(item.value)) {
                                        expect($cell[0].innerText.trim()).to.contain(item.value)
                                    }
                                })
                            }
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
                let row_selector = 'tr'
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
                let row_selector = 'tr'
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