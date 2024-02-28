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
        cy.request({
            url: f[0]['href'],
            encoding: 'binary'
        }).then((response) => {
            expect(response.status).to.equal(200);
            cy.writeFile('cypress/downloads/' + f[0]['innerText'], response.body, 'binary')
        })
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

    if(filename.includes('yyyy-mm-dd')){
        // Create a new Date object representing today's date
        const today = new Date();

        // Get the year, month, and day components from the Date object
        const year = today.getFullYear();
        // January is 0, so we add 1 to get the correct month
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        // Format the date as yyyy-mm-dd
        const formattedDate = `${year}-${month}-${day}`;

        filename = filename.replace('yyyy-mm-dd', formattedDate)
    }

    cy.readFile("cypress/downloads/" + filename).then( ($file) => {
        expect($file).to.exist
    })
})