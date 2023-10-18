function load_core_step_definitions() { require('./step_definitions/index') }

function load_core_commands() { require('./commands/index.js') }

function load_support_files(){ require('./support/index') }

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
}

function set_user_info(){
    cy.set_user_info(Cypress.env('users'))
}

function reset_database(){
    cy.base_db_seed()
}

function rctf_initialize() {
    load_core_step_definitions()
    load_core_commands()
    preserve_cookies()
    intercept_vanderbilt_requests()
    set_user_info()
    reset_database()
}

module.exports = {
    load_support_files,
    load_core_commands,
    load_core_step_definitions,
    preserve_cookies,
    intercept_vanderbilt_requests,
    set_user_info,
    reset_database,
    rctf_initialize
}