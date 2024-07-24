const { Given } = require('@badeball/cypress-cucumber-preprocessor')

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

                // Need to exclude requests not made by the application, such as background browser requests.
                req.on("before:response", res => {
                    const isDownload = res.headers["content-disposition"]?.startsWith("attachment");
                    const origin = cy.getRemoteLocation("origin");
                    const isFromAUT = req.headers["referer"]?.startsWith(origin);
                    if (isDownload && isFromAUT) {
                        Cypress.log({
                            name: "suppressWaitForPageLoad",
                            message: "Bypassing wait for page load event - response has Content-Disposition: attachment"
                        });
                        cy.isStable(true, "load");
                    }
                })

                req.reply((res) => {
                    expect(res.statusCode).to.equal(200)
                })

            }).as('file_repo_download')
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

Given("I should see the following values in the most recently downloaded PDF file:", (dataTable) => {
    function findDateFormat(str) {
        for (const format in window.dateFormats) {
            const regex = window.dateFormats[format]
            const match = str.includes(format)
            if (match) {
                expect(window.dateFormats).to.haveOwnProperty(format)
                return str.replace(format, '')
            }
        }
        return null
    }

    function waitForFile(fileExtension, timeout = 30000) {
        return new Cypress.Promise((resolve, reject) => {
            const startTime = Date.now()

            const checkFile = () => {
                cy.task('fetchLatestDownload', { fileExtension }).then((latest_file) => {
                    if (latest_file !== undefined) {
                        resolve(latest_file)
                    } else if (Date.now() - startTime > timeout) {
                        reject(new Error('File not found within timeout period'))
                    } else {
                        setTimeout(checkFile, 500)
                    }
                })
            }

            checkFile()
        })
    }

    waitForFile('pdf').then((latest_file) => {
        cy.task('readPdf', ({pdf_file: latest_file})).then((pdf) => {
            dataTable['rawTable'].forEach((row, row_index) => {
                row.forEach((dataTableCell) => {
                    const result = findDateFormat(dataTableCell)
                    if(result === null){
                        expect(pdf.text).to.include(dataTableCell)
                    } else {
                        result.split(' ').forEach((items) => {
                            expect(pdf.text).to.include(items)
                        })
                    }
                })
            })
        })
    })

})