//#############################################################################
//# Commands       A B C D E F G H I J K L M N O P Q R S T U V W X Y Z        #
//#############################################################################

Cypress.Commands.add('fetch_login', () => {
    let user = window.user_info.get_current_user()
    let pass = window.user_info.get_current_pass()

    cy.login({ username: user, password:  pass })

    window.user_info.set_previous_user_type()
})

Cypress.Commands.add('login', (options) => {
    cy.session(options['username'], () => {
        cy.visit_version({page: "", parameters: "action=logout"})
        cy.get('html').should('contain', 'Log In')
        cy.get('input[name=username]').invoke('attr', 'value', options['username'])
        cy.get('input[name=password]').invoke('attr', 'value', options['password'])
        cy.get('button').contains('Log In').click()
        cy.checkCookieAndLogin('PHPSESSID', options)
    }, {
        validate: () => {
            cy.checkCookieAndLogin('PHPSESSID', options)
        }
    })
})

Cypress.Commands.add('checkCookieAndLogin', (cookieName, options) => {
    function checkCookies(retries = 5) {
        cy.getCookies().then((cookies) => {
            try {
                expect(cookies).to.have.length.greaterThan(0);
                expect(cookies[0]).to.have.property('name', cookieName)
                cy.url().then((currentUrl) => {
                    if (currentUrl.includes('/surveys/')) {
                        cy.visit('/')
                    }
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
    cy.visit_version({page: "", parameters: "action=logout"})
    cy.get('html').should('contain', 'Log In')
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