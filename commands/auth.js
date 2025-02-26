//#############################################################################
//# Commands       A B C D E F G H I J K L M N O P Q R S T U V W X Y Z        #
//#############################################################################

window.adjustInvalidLoginUrls = (url) => {
    if (
        // This is the first page load from a blank browser windows
        url === 'about:blank'
        ||
        // Take us back to the homepage so the login form will be displayed
        url.includes('/surveys/')
    ) {
        url = '/'
    }
    else {
        /**
         * Stay on the existing URL to stay consistent with the actual REDCap behavior
         * of remaining on the current page upon logging out & back in.
         */
    }

    return url
}

Cypress.Commands.add('fetch_login', (session = true) => {
    let user = window.user_info.get_current_user()
    let pass = window.user_info.get_current_pass()

    cy.login({ username: user, password:  pass }, session)

    window.user_info.set_previous_user_type()
})

Cypress.Commands.add('login', (options, session) => {
    if(session === false){
        cy.login_steps(options)
    } else {
        cy.session(options['username'], () => {
            cy.login_steps(options)
            cy.checkCookieAndLogin('PHPSESSID', options)
        }, {
            validate: () => {
                cy.checkCookieAndLogin('PHPSESSID', options)
            }
        })
    }
})

Cypress.Commands.add('login_steps', (options) => {
    cy.get('html').should('contain', 'Log In')
    cy.get('input[name=username]').invoke('attr', 'value', options['username'])
    cy.get('input[name=password]').invoke('attr', 'value', options['password'])
    cy.get('button').contains('Log In').click()
})

Cypress.Commands.add('checkCookieAndLogin', (cookieName, options) => {
    function checkCookies(retries = 5) {
        cy.getCookies().then((cookies) => {
            try {
                expect(cookies).to.have.length.greaterThan(0);
                expect(cookies[0]).to.have.property('name', cookieName)
                cy.url().then((currentUrl) => {
                    // The following call is required for restoring snapshots
                    currentUrl = window.adjustInvalidLoginUrls(currentUrl)

                    /**
                     * Stay on the existing URL to stay consistent with the actual REDCap behavior
                     * of remaining on the current page upon logging out & back in.
                     */
                    cy.visit(currentUrl)
                })
            } catch (error) {
                if (retries > 0) {
                    cy.log(`Retrying... attempts left: ${retries}`)
                    cy.wait(2000)
                    checkCookies(retries - 1)
                } else {
                    throw error
                }
            }
        })
    }

    checkCookies()
})

Cypress.Commands.add('logout', () => {
    cy.clearCookie('PHPSESSID')
    cy.getCookie('PHPSESSID').should('not.exist')
    
    cy.url().then((url) => {
        url = window.adjustInvalidLoginUrls(url)
        
        cy.visit(url)
        cy.contains('button', 'Log In').should('exist')
    })
})

Cypress.Commands.add('set_user_type', (user_type) => {
    window.user_info.set_user_type(user_type)
})

Cypress.Commands.add('set_user_info', (users) => {
    if(users !== undefined){
        window.user_info.set_users(users)
    } else {
        alert('users, which defines what users are in your seed database, is missing from cypress.env.json.  Please configure it before proceeding.')
    }
})