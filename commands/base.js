cy.on('window:before:unload', () => {
    window.aboutToUnload = true
})

cy.on('window:load', () => {
    window.aboutToUnload = false
})

Cypress.Commands.add('wait_to_hide_or_detach', (selector, options = {}) => {
    const { timeout = Cypress.config('defaultCommandTimeout'), interval = 100 } = options
    const startTime = Date.now()

    new Promise((resolve, reject) => {
        const checkDetachment = () => {
            const now = Date.now()
            const elapsedTime = now - startTime

            if (elapsedTime >= timeout) {
                reject(new Error(`Element ${selector} did not become detached within ${timeout}ms`))
                return
            }

            cy.get(selector, { timeout: 0 }).then(($element) => {
                if (!$element.is(':visible') || Cypress.dom.isDetached($element)) {
                    resolve(true)
                } else {
                    // Element is still attached, retry after interval
                    cy.wait(interval).then(checkDetachment)
                }
            })
        }

        checkDetachment()
    })
})

Cypress.Commands.add('wait_for_datatables', () => {
    cy.window().should((win) => {
        expect(win.$).to.be.a('function')
    })

    return cy.window().then((win) => {
        return win.$('.dataTable:first:visible').dataTable()
    })
})

Cypress.Commands.add('waitForInitDtEvent', () => {
    // Wrap the loop logic in cy.wrap() to ensure Cypress retries it
    // Loop until DT_LOADED becomes true or until timeout
    cy.wrap(null, { timeout: 30000 }).should(() => {
        let DT_LOADED = cy.state('window').DT_LOADED

        // Check if DT_LOADED is true, if not, retry
        if (!DT_LOADED) { throw new Error('DT_LOADED is still false') }

        // Return DT_LOADED to exit the loop
        return DT_LOADED
    })

    // cy.get('@breadcrumbs')
    // cy.get('@file_rename')
    // cy.get('@all_checkboxes')
    // cy.get('@load_datatable')
})

Cypress.Commands.add('assertWindowProperties', () => {
    cy.window().then((win) => {
        win.DT_LOADED = true

        const dt = win.$('.dataTable:first:visible').dataTable()

        dt.on('init.dt', function(e, settings) {
            win.DT_LOADED = false
        })
    })

    cy.waitForInitDtEvent()
})

Cypress.Commands.add('not_loading', () => {
    // For a 302 redirect, wait for performance.navigation.type to be 1 - (TYPE_RELOAD)
    // This prevents us from looking at stuff before a reload is done (hopefully!)
    if (window.aboutToUnload && window.registeredAlias){
        cy.window().its('performance.navigation.type').then((type) => {
            if (type === 0) {
                cy.wait('@interceptedRequest', {timeout: 1000}).then((interception) => {
                    if (interception && interception.response.statusCode === 302) {
                        cy.window().its('performance.navigation.type').should('eq', 1)
                    }
                })
            }
        })
    }

    if(Cypress.$('span#progress_save').length) cy.get('span#progress_save').should('not.be.visible')
    if(Cypress.$('div#progress').length) cy.get('div#progress').should('not.be.visible')
    if(Cypress.$('div#working').length) cy.get('div#working', { timeout: 30000 }).should('not.be.visible')
})

Cypress.Commands.add("top_layer", (label_selector, base_element = 'div[role=dialog]:visible,html') => {
    cy.get_top_layer(base_element, ($el) => {
        expect($el.find(label_selector)).length.to.be.above(0)}
    ).then((el) => { return el })
})

Cypress.Commands.add("get_labeled_element", (element_selector, label, value = null, labeled_exactly = false) => {
    if(labeled_exactly){
        cy.contains(new RegExp("^" + label + "$", "g")).then(($label) => {
            cy.get_element_by_label($label, element_selector, value)
        })
    } else {
        cy.contains(label).then(($label) => {
            cy.get_element_by_label($label, element_selector, value)
        })
    }

})

Cypress.Commands.add('filter_elements', (elements, selector, value) => {
    if(elements.find(`${selector}`).length > 1){

        let elms = elements.find(`${selector}`).filter(function() {
            if (value !== null && Cypress.$(this).children('option').length > 0){
                let ret_value = false

                if(Cypress.$(this).children('option').length > 1){
                    Cypress.$(this).children('option').each((num, elem) => {
                        console.log(elem)
                        console.log(elem.innerText === value)
                        if(elem.innerText === value) ret_value = true
                    })
                } else {
                    ret_value = true
                }

                return ret_value
            } else {
                return true
            }
        })

        if (elms.length >= 1){
            return elms.first()
        } else {
            return elements.find(`${selector}`).first()
        }

    } else {
        return elements.find(`${selector}`).first()
    }
})


Cypress.Commands.add('get_element_by_label', (label, selector = null, value = null, original_selector = null, i = 0) => {
    if (original_selector === null) { original_selector = selector }

    cy.wrap(label).then(($self) => {
        if(i === 0 && $self.find(selector).length){
            return cy.filter_elements($self, selector, value)
        } else if (i === 0 && $self.parent().find(selector).length){
            return cy.filter_elements($self.parent(), selector, value)
        } else {
            cy.wrap(label).parentsUntil(`:has(${selector})`).then(($elms) => {

                //This accounts for if there are multiple matches
                for(i = 0; i < $elms.length; i++){
                    if( $elms.eq(i).find(selector).length) {
                        return cy.filter_elements($elms.eq(i), selector, value)
                    }
                }

                //If we don't have any matches within that element, look to the parent ...
                if ($elms.last().parent().find(selector).length){
                     return cy.filter_elements($elms.last().parent(), selector, value)

                //Otherwise, the parent of the parent ..
                } else if (i <= 5) {
                    cy.get_element_by_label(label, `:has(${selector})`, value, original_selector, i + 1)
                }
            })
        }
    })
})

//Provide a robust way for this to find either a button or input button that contains this text
Cypress.Commands.add('button_or_input', (text_label) => {
    cy.get(':button').then(($button) => {
        $button.each(($i) => {
            if($button[$i].value === text_label){
                return cy.wrap($button[$i])
            } else if ($button[$i].innerText === text_label){
                return cy.wrap($button[$i])
            }
        })
    })
})

//yields the visible div with the highest z-index, or the <html> if none are found
Cypress.Commands.add('get_top_layer', (element = 'div[role=dialog]:visible,html', retryUntil) => {
    let top_layer
    cy.get(element).should($els => {
        //if more than body found, find element with highest z-index
        if ($els.length > 1) {
            //remove html from $els so only elements with z-index remain
            $els = $els.filter(':not(html)')
            //sort by z-index (ascending)
            $els.sort((cur, prev) => {
                let zp = Cypress.dom.wrap(prev).css('z-index')
                let zc = Cypress.dom.wrap(cur).css('z-index')
                return zc - zp
                //return zp - zc
            })
        }
        top_layer = $els.last()
        retryUntil(top_layer) //run assertions, so get can retry on failure
    }).then(() => cy.wrap(top_layer)) //yield top_layer to any further chained commands
})

Cypress.Commands.add('ensure_csrf_token', () => {
    cy.url().then(($url) => {
        if($url !== undefined && $url !== 'about:blank'){

            //If this is a form but NOT the LOGIN form
            if(Cypress.$('form').length > 0 && Cypress.$('#redcap_login_a38us_09i85').length === 0){
                cy.getCookies()
                    .should('have.length.greaterThan', 0)
                    .then(($cookies) => {

                        $cookies.forEach(($cookie) => {
                            //If our cookies include PHPSESSID, we can assume we're logged into REDCap
                            //If they do NOT include PHPSESSID, we shouldn't have to worry about this token
                            //It also appears that the Report Forms DO not need a CSRF token, which is interesting ...
                            if($cookie['name'] === 'PHPSESSID' &&
                                Cypress.$('form#create_report_form').length === 0 &&
                                Cypress.$('form input[name=redcap_csrf_token]').length === 1){
                                // cy.get('form input[name=redcap_csrf_token]').each(($form_token) => {
                                //     cy.window().then((win) => {
                                //         expect($form_token[0].value).to.not.be.null
                                //     })
                                // })

                                // === DETACHMENT PREVENTION === //
                                //Some common elements to tell us things are still loading!
                                if(Cypress.$('span#progress_save').length) cy.get('span#progress_save').should('not.be.visible')
                                if(Cypress.$('div#progress').length) cy.get('div#progress').should('not.be.visible')
                                //if(Cypress.$('div#working').length) cy.get('div#working').should('not.be.visible')
                            }
                        })
                    })

            }
        }
    })
})

Cypress.Commands.overwrite(
    'click',
    (originalFn, subject, options) => {

        window.aboutToUnload = true

        //If we say no CSRF check, then skip it ...
        if(options !== undefined && options['no_csrf_check']){
            delete(options['no_csrf_check'])
            return originalFn(subject, options)

            //For all other cases, check for CSRF token
        } else {
            if(options === undefined) options = {} //If no options object exists, create it
            options['no_csrf_check'] = true //Add the "no_csrf_check" to get back to the original click method!

            //console.log(subject)

            if(subject[0].nodeName === "A" ||
                subject[0].nodeName === "BUTTON" ||
                subject[0].nodeName === "INPUT" && subject[0].type === "button" && subject[0].onclick === ""
            ){

                //Is the element part of a form?
                if(subject[0].form){
                    cy.ensure_csrf_token() //Check for the CSRF token to be set in the form
                }

                //If our other detachment prevention measures failed, let's check to see if it detached and deal with it
                cy.wrap(subject).then($el => {
                    return Cypress.dom.isDetached($el) ? Cypress.$($el): $el
                }).click(options)

            } else {
                return originalFn(subject, options)
            }
        }
    }
)

Cypress.Commands.add('php_time_zone', () => {
    // Check if php path is set in Cypress.env.json
    if (Cypress.env('php') && Cypress.env('php')['path']) {
        cy.task("phpTimeZone", Cypress.env('php')['path']).then((timeZone) => {
            cy.exec(timeZone, { timeout: 100000}).then((time) => {
                window.php_time_zone = time['stdout']
            })
        })
    //If we have no PHP path set, we'll look for timezone override
    } else if (Cypress.env('timezone_override')) {
        window.php_time_zone = Cypress.env('timezone_override')
    //If we have no PHP path set and no timezone override, we'll default to JavaScript timezone
    } else {
        window.php_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    cy.wrap(`Configured Timezone: ${window.php_time_zone}`)
})

Cypress.Commands.add("suppressWaitForPageLoad", function () {
    cy.intercept("*", req => {
        req.on("before:response", res => {
            const isDownload = res.headers["content-disposition"]?.startsWith("attachment");
            // Need to exclude requests not made by the application, such as
            // background browser requests.
            const origin = cy.getRemoteLocation("origin");
            const isFromAUT = req.headers["referer"]?.startsWith(origin);
            if (isDownload && isFromAUT) {
                Cypress.log({
                    name: "suppressWaitForPageLoad",
                    message: "Bypassing wait for page load event because response has Content-Disposition: attachment"
                });
                cy.isStable(true, "load");
            }
        });
    });
})