//#############################################################################
//# Commands       A B C D E F G H I J K L M N O P Q R S T U V W X Y Z        #
//#############################################################################

Cypress.Commands.add('add_field', (field_name, type) => {
    cy.get('input#btn-last').click().then(() => {
        cy.get('select#field_type').select(type).should('have.value', type).then(() => {
            cy.get('input#field_name').type(field_name).then(() => {
                cy.save_field()
                cy.find_online_designer_field(field_name)
            })
        })
    })
})

Cypress.Commands.add('click_on_design_field_function', (type, field) => {
    cy.get('td[class=frmedit_row]').
    contains(field).
    parents('tr').
    find('img[title="' + type + '"]').
    click()
})

Cypress.Commands.add('edit_field_by_label', (name, timeout = 10000) => {
    if(Cypress.$('div#working').length) cy.get('div#working').should('not.be.visible')
    cy.find_online_designer_field(name).parent().parentsUntil('tr').find('img[title=Edit]').parent().click()
    cy.get('div[role=dialog]').contains('Edit Field').should('be.visible')
})

Cypress.Commands.add('find_online_designer_field', (name, timeout = 10000) => {
    cy.contains('td', name, { timeout: timeout })
})

Cypress.Commands.add('initial_save_field', () => {
    cy.get('input#field_name').then(($f) => {
        cy.contains('button', 'Save').
        should('be.visible').
        click().
        then(() => {

            cy.contains('Alert').then(($a) => {
                if($a.length){
                    cy.get('button[title=Close]:last:visible').click()
                    cy.get('input#auto_variable_naming').click()
                    cy.contains('button', 'Enable auto naming').click().then(() => {
                        cy.contains('button', 'Save').click()
                    })
                }
            })
        })
    })
})

Cypress.Commands.add('set_field_value_by_label', ($name, $value, $type, $prefix = '', $suffix = '', $last_suffix = '', timeout = 10000) => {
    cy.contains('td', $name, { timeout: timeout }).
    parent().
    parentsUntil('tr').
    last().
    parent().
    then(($tr) => {

        let selector = $type + '[name="' + $prefix + $tr[0]['attributes']['sq_id']['value'] + $suffix + '"]'

        cy.get(selector, { force: true}).then(($a) => {
            return $a[0]
        })
    })
})

Cypress.Commands.add('select_checkbox_by_label', ($name, $value) => {
    const checkbox_labels = cy.set_field_value_by_label($name, $value, 'input', '__chkn__', '')

    checkbox_labels.first().parents('tr').first().within(() => {
        cy.get('label[class=mc]').contains($value).click()
    })
})

Cypress.Commands.add('select_field_by_label', (name, timeout = 10000) => {
    cy.contains('td', name, { timeout: timeout }).parent().parentsUntil('tr').last().parent().then(($tr) => {
        const name = $tr[0]['attributes']['sq_id']['value']
        cy.get('[name="' + name + '"]', { force: true }).then(($a) => {
            return $a[0]
        })
    })
})

Cypress.Commands.add('select_field_choices', (timeout = 10000) => {
    cy.get('form#addFieldForm').children().get('span').contains('Choices').parent().parent().find('textarea')
})

Cypress.Commands.add('select_radio_by_label', ($name, $value, $click = true, $selected = true ) => {
    //const radio_labels = cy.set_field_value_by_label($name, $value, 'input', '', '___radio')

    let checkboxElm = null

    const tableOccurences = Cypress.$(`tr:visible:has(:contains(${JSON.stringify($name)}))`)

    if(tableOccurences.length === 0){
        const label = Cypress.$(`label:contains(${JSON.stringify($value)})`)

        if(label.length){
            cy.wrap(label).then((label) => {
                const radioId = label.attr('for')
                checkboxElm = cy.get(`#${radioId}`)
                if ($click) {
                    checkboxElm.click()
                } else {
                    checkboxElm.should('have.attr', $selected ? 'checked' : 'unchecked')
                }
            })

        //This is the case where we have some really poorly formed HTML where all we have is HTML that is mixed inside a DIV
        } else {

            cy.contains($value)
                .invoke('prop', 'innerHTML')
                .then((html) => {
                    const parts = html.split($value) // Split the innerHTML based on the $value
                    let foundRadio

                    if (parts[0]) {
                        const leftSide = parts[0]
                        foundRadio = Cypress.$(`<div>${leftSide}</div>`).find('input[type="radio"]').last()
                    }

                    if (!foundRadio && parts[1]) {
                        const rightSide = parts[1]
                        foundRadio = Cypress.$(`<div>${rightSide}</div>`).find('input[type="radio"]').first()
                    }

                    if (foundRadio.length) {
                        checkboxElm = cy.get(`input[id=${foundRadio.prop('id')}]`)
                        if ($click) {
                            checkboxElm.click()
                        } else {
                            checkboxElm.should('have.attr', $selected ? 'checked' : 'unchecked')
                        }
                    }
                })
        }

    } else {

        cy.wrap(tableOccurences).first().within(() => {
            const $label = Cypress.$(`label[class=mc]:contains(${$value})`);

            if ($label.length) {
                // If label is found
                if ($click) {
                    cy.get(`label[class=mc]:contains(${$value})`).click()
                } else {
                    cy.get(`label[class=mc]:contains(${$value})`).parent().find('input[type=radio]')
                        .should('have.attr', $selected ? 'checked' : 'unchecked')
                }
            } else {
                // Fallback to the nearest radio button - whether that is next or previous parent
                cy.contains($value).then($text => {
                    const parent = Cypress.$($text).parent()
                    let radio = parent

                    if(!parent.find('input[type=radio]').length) {
                        const prev = parent.prev(':has(input[type=radio])')
                        const next = parent.next(':has(input[type=radio])')
                        radio = next.length ? next : prev
                    }

                    if (radio.length) {
                        if ($click) {
                            cy.wrap(radio).find('input[type=radio]').click();
                        } else {
                            cy.wrap(radio).find('input[type=radio]').should('have.attr', $selected ? 'checked' : 'unchecked');
                        }
                    }
                })
            }
        })
    }



})

Cypress.Commands.add('select_text_by_label', ($name, $value) => {
    cy.set_field_value_by_label($name, $value, 'input')
})

Cypress.Commands.add('select_textarea_by_label', ($name, $value) => {
    cy.set_field_value_by_label($name, $value, 'textarea')
})

Cypress.Commands.add('select_value_by_label', ($name, $value) => {
    cy.set_field_value_by_label($name, $value, 'select', '', '')
})

Cypress.Commands.add('save_field', () => {
    cy.intercept({
        method: 'GET',
        url: '/redcap_v' + Cypress.env('redcap_version') + "/Design/online_designer_render_fields.php?*"
    }).as('save_field')

    cy.get('input#field_name').then(($f) => {
        cy.contains('button', 'Save').click()
    })

    cy.wait('@save_field')
})