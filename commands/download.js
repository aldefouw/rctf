function replaceFilename(file, date){
    return file.replace('hhmm', `${date.substring(12, 14)}${date.substring(15, 17)}`)
               .replace('yyyy', date.substring(6, 10))
               .replace('mm', date.substring(0, 2))
               .replace('hh', date.substring(11, 13))
               .replace('dd', date.substring(3, 5))
}

function setLocalTimestamp(date){
    if(window.php_time_zone !== null) {
        // Get the PHP timezone from window.php_time_zone
        const phpTimeZone = window.php_time_zone;

        // Convert the JavaScript Date object to the PHP timezone
        date = new Date(date.toLocaleString('en-US', {
            timeZone: phpTimeZone
        }))
    }

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

Cypress.Commands.add('fetch_timestamped_file', (filename) => {
    const current_time = new Date()
    const minute_ago = new Date(current_time.getTime())
    minute_ago.setMinutes(current_time.getMinutes() - 1)

    let first_file = replaceFilename(filename, setLocalTimestamp(current_time))
    cy.fileExists("cypress/downloads/" + first_file).then((fileExists) => {
        if(fileExists){
            return "cypress/downloads/" + first_file
        } else {
            let second_file = replaceFilename(filename, setLocalTimestamp(minute_ago))
            cy.fileExists("cypress/downloads/" + second_file).then((fileExists) => {
                if(fileExists) {
                    return "cypress/downloads/" + second_file
                } else {
                    throw new Error(`No file exists for ${first_file} or ${second_file}!`)
                }
            })
        }
    })
})

Cypress.Commands.add('download_file', (filename) => {
    cy.fetch_timestamped_file(filename).then(($file) => {
        cy.readFile($file, { timeout: 10000 })
    })
})

Cypress.Commands.add("fileExists", (filePath) => {
    cy.task("fileExists", filePath).then((fileExists) => {
        return fileExists
    })
})