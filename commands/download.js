Cypress.Commands.add('download_file', (filename) => {
    const currentDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    filename = filename.replace('hhmm', `${currentDate.substring(12, 14)}${currentDate.substring(15, 17)}`)
                        .replace('yyyy', currentDate.substring(6, 10))
                        .replace('mm', currentDate.substring(0, 2))
                        .replace('hh', currentDate.substring(11, 13))
                        .replace('dd', currentDate.substring(3, 5))

    cy.readFile("cypress/downloads/" + filename).then(($file) => {
        return $file
    })
})