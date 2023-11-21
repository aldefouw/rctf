/**
 * @module DevelopmentOnly
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I want to pause
 * @description Pauses the Cypress session. NOTE: Should only be used during development of tests.
 */
Given("I want to pause", () => {
    cy.pause()
})

/**
 * @module DevelopmentOnly
 */
Given("I want to export a snapshot of this feature here", (selector, label, options) => {
    //Snapshot of the DB
    cy.mysql_snapshot_export()

    //Snapshot of the URL and session
    cy.url().then((url) => {
        cy.task('currentSnapshotInfo', ({ url: url, user: window.user_info.get_current_user(), pass: window.user_info.get_current_pass()  })).then(
            (file_created) => {
            if(file_created){
                console.log('Info file created.')
            } else {
                console.log('ERROR: Info file NOT created.')
            }
        })
    })

    cy.pause()

})


