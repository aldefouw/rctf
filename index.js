import  {
            load_support_files,
            load_core_step_definitions,
            load_core_commands,
            preserve_cookies,
            intercept_vanderbilt_requests,
            set_user_info,
            reset_database,
            rctf_initialize
        } from './core.js'

// These files need to be loaded before anything else (and outside the before() block)
load_support_files()

// This is the default setting needed
// Can be overwritten by creating a local before() block in the Cypress tests if desired.
before(() => {
    rctf_initialize()
})

// This is what makes these functions available to outside scripts
module.exports = {
    rctf_initialize: () => { rctf_initialize },
    load_core_step_definitions: () => { load_core_step_definitions },
    load_core_commands: () => { load_core_commands },
    load_support_files: () => { load_support_files() },
    preserve_cookies: () => { preserve_cookies },
    intercept_vanderbilt_requests: () => { intercept_vanderbilt_requests },
    set_user_info: () => { set_user_info },
    reset_database: () => { reset_database }
}