/**
 * @module Download
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I download a file by clicking on the link labeled {string}
 * @param {string} text - the text on the anchor element you want to click
 * @description Downloads a file from an anchor element with a specific text label.
 */
Given("I download a file by clicking on the link labeled {string}", (text) => {
    // We do not actually click on the link because new windows and Cypress do not work.
    // Instead, we sideload a request and save it where it would go

    cy.get('a:contains(' + text + '):visible').then((f) => {



        if(f.attr('onclick').includes("fileRepoDownload")){

            cy.intercept({
                method: 'GET',
                url: '/redcap_v' + Cypress.env('redcap_version') + "/*FileRepositoryController:download*"
            }, (req) => {
                req.reply((res) => {
                    expect(res.statusCode).to.equal(200)
                })
            }).as('file_repo_download')
            cy.suppressWaitForPageLoad()
            cy.wrap(f).click()
            cy.wait('@file_repo_download')

        } else {
            cy.request({
                url: f[0]['href'],
                encoding: 'binary'
            }).then((response) => {
                expect(response.status).to.equal(200);
                cy.writeFile('cypress/downloads/' + f[0]['innerText'], response.body, 'binary')
            })
        }
    })
})

/**
 * @module Download
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I (should) see a downloaded file named {string}
 * @param {string} filename - the name of the file downloaded
 * @description Determines if a specific file name exists in our downloads directory
 */
Given("I (should) see a downloaded file named {string}", (filename) => {
    cy.download_file(filename).then(($file) => {
        expect($file).to.exist
    })
})