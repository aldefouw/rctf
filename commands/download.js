Cypress.Commands.add('download_file', (filename) => {

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

    cy.readFile("cypress/downloads/" + filename).then(($file) => {
        return $file
    })
})