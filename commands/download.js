function replaceFilename(file, date){
    return file.replace('hhmm', `${date.substring(12, 14)}${date.substring(15, 17)}`)
               .replace('yyyy', date.substring(6, 10))
               .replace('mm', date.substring(0, 2))
               .replace('hh', date.substring(11, 13))
               .replace('dd', date.substring(3, 5))
}

function setLocalTimestamp(date){
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

Cypress.Commands.add('download_file', (filename) => {
    const current_time = new Date()
    filename = replaceFilename(filename, setLocalTimestamp(current_time))
    const minute_ago = current_time.setMinutes(current_time.getMinutes() - 1)

    if(cy.fileExists("cypress/downloads/" + filename)){
        cy.readFile("cypress/downloads/" + filename).then(($file) => {
            return $file
        })
    } else {

        filename = replaceFilename(filename, setLocalTimestamp(minute_ago))

        cy.fileExists("cypress/downloads/" + filename).then((fileExists) => {
            if (fileExists) {
                cy.readFile("cypress/downloads/" + filename).then(($file) => {
                    console.log("File contents:", $file)
                }).catch((error) => {
                    console.error("Error reading file:", error)
                });
            } else {
                console.log("File does not exist")
            }
        }).catch((error) => {
            console.error("Error checking file existence:", error)
        })
    }
})


Cypress.Commands.add("fileExists", (filePath) => {
    cy.task("fileExists", filePath).then((fileExists) => {
        if (fileExists) {
            return true
        } else {
            false
        }
    })
})