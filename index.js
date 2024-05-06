const { Given, When, Then, defineParameterType } = require('@badeball/cypress-cucumber-preprocessor')

window.compareVersions = require('compare-versions')
window.escapeStringRegexp = require('escape-string-regexp')

require('cypress-iframe')
require('@4tw/cypress-drag-drop')
require('@foreachbe/cypress-tinymce')

function preserve_cookies(){
    Cypress.Cookies.defaults({
        preserve: ['PHPSESSID', 'redcap_external_module_csrf_token']
    })

    clearCookies()
}

function clearCookies(){
    window.lastCookie = [] //Clear out the cookies
}

function intercept_vanderbilt_requests(){
    //The following prevents constant requests to Vanderbilt since we're just testing
    cy.intercept({ method: 'GET', url: 'https://redcap.vanderbilt.edu/consortium/collect_stats.php?*'}, []).as('Collect Stats')
    cy.intercept({ method: 'GET', url: '*/consortium/collect_stats.php?*'}, []).as('Stats')
    cy.intercept({ method: 'GET', url: '*/ControlCenter/check_server_ping.php'}, []).as('Ping')
    cy.intercept({ method: 'GET', url: '*/ControlCenter/report_site_stats.php'}, []).as('Control Center Stats')
    cy.intercept({ method: 'GET', url: '*/redcap_v' + Cypress.env('redcap_version') + '/**'}).as('interceptedRequest').then(() => {
        window.registeredAlias = true // this is useful to know whether we can actually call a cy.wait
    })
}

function set_user_info(){
    cy.set_user_info(Cypress.env('users'))
}

function reset_database(){
    cy.base_db_seed()
}

function load_core_step_definitions (Given, When, Then, defineParameterType){
    require('./step_definitions/index')
}

function load_core_commands(){
    require('./commands/index')
}

function set_timezone(){
    cy.php_time_zone()
}

function load_support_files(){
    require('./support/index')
    console.log(window.user_info)
}

load_support_files()



function rctf_initialize(Given, When, Then, defineParameterType) {

    load_core_commands()
    load_core_step_definitions(Given, When, Then, defineParameterType)

    //This is where we initialize the stuff we need in a basic install
    before(() => {
        load_support_files()
        set_user_info()
        cy.on('window:alert', (str) => {
            window.lastAlert = str
        })
    })

    beforeEach(() => {
        preserve_cookies()

        window.registeredAlias = false

        cy.intercept({
            method: 'POST',
            url: '/redcap_v' + Cypress.env('redcap_version') + "/*FileRepositoryController:getBreadcrumbs*"
        }).as('file_breadcrumbs')

        cy.intercept({
            method: 'POST',
            url: '/redcap_v' + Cypress.env('redcap_version') + "/*FileRepositoryController:getFileList*"
        }).as('file_list')

    })

    // intercept_vanderbilt_requests()
    // set_user_info()
    // set_timezone()
    // reset_database()
}

rctf_initialize()

// // This is what makes these functions available to outside scripts
module.exports = {
    load_core_step_definitions: (Given, When, Then, defineParameterType) => { load_core_step_definitions(Given, When, Then, defineParameterType) },
    rctf_initialize: (Given, When, Then, defineParameterType) => { rctf_initialize(Given, When, Then, defineParameterType) }
}