//#############################################################################
//# Commands       A B C D E F G H I J K L M N O P Q R S T U V W X Y Z        #
//#############################################################################

Cypress.Commands.add("dragTo", { prevSubject: 'element'}, (subject, target) => {
    let rect = cy.get(target).then((element) => {
        return element[0].getBoundingClientRect()
    })

    //click on element
    cy.wrap(subject).trigger('mousedown')

    //move mouse to new position
    cy.get(target).trigger('mousemove', 'bottom')
        .trigger('mousemove', 'center')

    // target position changed, mouseup on original element
    cy.wrap(subject).trigger('mouseup')

})

Cypress.Commands.add("dragToTarget", { prevSubject: 'element'}, (subject, target) => {
    cy.wrap(subject).drag(target, {force: true}).then((success) => {
        cy.get(target).click({force: true})
    })
})

Cypress.Commands.add("table_cell_by_column_and_row_label", (column_label, row_label, table_selector= 'table', header_row_type = 'th', row_cell_type = 'td', row_number = 0, body_table = 'table', no_col_match_body = false) => {
    let column_num = 0
    let table_cell = null

    function escapeCssSelector(str) {
        // Escape special characters in CSS selectors
        return str.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, "\\$1");
    }

    const orig_column_label = column_label

    column_label = escapeCssSelector(column_label)
    row_label = escapeCssSelector(row_label)

    let selector = `${table_selector}:has(${header_row_type}:contains('${column_label}'):visible):visible`
    let td_selector = `tr:has(${row_cell_type}:visible):visible`

    if(row_number === 0) {
        if(table_selector !== body_table){
            selector = `${table_selector}:has(${header_row_type}:contains('${column_label}'):visible):visible`
        } else {
            selector = `${table_selector}:has(${row_cell_type}:contains('${row_label}'):visible,${header_row_type}:contains('${column_label}'):visible):visible`
        }

        td_selector = `tr:has(${row_cell_type}:contains('${row_label}'):visible):visible`
    }

    cy.get(selector).within(() => {
        cy.get(`${header_row_type}:contains('${column_label}'):visible`).parent('tr').then(($tr) => {
            $tr.find(header_row_type).each((thi, th) => {
                // console.log(Cypress.$(th).text().trim().includes(orig_column_label))
                // console.log(thi)
                if (Cypress.$(th).text().trim().includes(orig_column_label) && column_num === 0) column_num = thi
                //if (Cypress.$(th).text().trim().includes(column_label) && column_num === 0) console.log(thi)
            })
        })
    }).then(() => {

        if(body_table !== 'table'){
            if(no_col_match_body) {
                selector = `${body_table}:visible`
            } else {
                selector = `${body_table}:has(${header_row_type}:contains('${column_label}'):visible):visible`
            }
        }

        cy.get(selector).within(() => {
            cy.get(td_selector).then(($td) => {
                $td.each(($tri, $tr) => {
                    cy.wrap($tr).each((tri, tr) => {
                        tri.find(row_cell_type).each((tdi, td) => {
                            if (tdi === column_num && $tri === row_number){
                                console.log(column_num)
                                table_cell = td
                            }
                        })
                    })
                })
            })
        }).then(() => {
            cy.wrap(table_cell)
        })
    })
})

Cypress.Commands.add("fetch_bubble_record_homepage", (table_selector = '#event_grid_table', event, instrument, instance) => {
    cy.table_cell_by_column_and_row_label(event, instrument, '#event_grid_table')
})

Cypress.Commands.add("move_slider", (subject, cur_pos, max, min, position, label , nudge_factor = 1, move_str = '') => {
    let new_pos = position - cur_pos

    //If Gherkin integer is out of bounds, we'll go the maximum we can in the direction they wanted
    if(position > max || position < min){
        new_pos = (new_pos > 0) ?
            max - cur_pos :
            min - cur_pos
        alert(`Warning! The value requested for slider field labeled "${label}" is outside of bounds!  Max: ${max} Min: ${min}`)
    }

    //Move slider right if new_pos is positive; left if negative
    if(new_pos !== 0) {
        for (let i = 0; i < Math.abs(new_pos) * nudge_factor; i++) {
            move_str += new_pos > 0 ? `{rightArrow}` : `{leftArrow}`
        }
    }

    //Type right or left arrow, respectively ...
    if(move_str.length > 0) {
        cy.get(subject).find('span').type(move_str)
    }

    //Target position changed, mouseup on original element
    cy.wrap(subject).find('span').trigger('mouseup', {force: true})
})

Cypress.Commands.add('customSetTinyMceContent', (fieldId, content) => {
    // Wait for TinyMCE to be available
    cy.window().then(win => {
        return new Cypress.Promise(resolve => {
            // Check if TinyMCE is available
            if (win.tinymce) {
                resolve(win.tinymce)
            } else {
                // Poll every 100 milliseconds until TinyMCE is available
                const interval = setInterval(() => {
                    if (win.tinymce) {
                        clearInterval(interval)
                        resolve(win.tinymce)
                    }
                }, 100)
            }
        })
    }).then(tinymce => {
        // Wait for the editor to be ready
        return new Cypress.Promise(resolve => {
            const interval = setInterval(() => {
                const editor = tinymce.EditorManager.get(fieldId)
                if (editor) {
                    clearInterval(interval)
                    resolve(editor)
                }
            }, 100)
        })
    }).then(editor => {
        // Set the content in the editor
        editor.setContent(content, { format: 'text' })
    })
})