/**
 * @module CSV
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I (should) have a CSV file located at path {string} that contains {int} row(s)
 * @param {string} path - the text path of the CSV location
 * @param {DataTable} headings - the DataTable of headings this file should have
 * @description Verifies number of rows (excluding header) the CSV file should have.
 */
 Given("I (should )have a CSV file at path {string} that contains {int} row(s)", (path, headings) => {
     cy.download_file(path).then( ($text) => {
        let lines = $text.trim().split('\n')
        let header_line = headings.rawTable[0][0]
        for(let i = 1; i < headings.rawTable[0].length; i++){
            header_line += "," + headings.rawTable[0][i]
        }

        expect(lines[0]).to.equal(header_line)
    })
})

/**
 * @module CSV
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example the CSV file at path {string} has the headings below {DataTable}
 * @param {string} path - the text path of the CSV location
 * @param {DataTable} headings the DataTable of headings this file should have
 * @description Verifies headings of the CSV file.
 */
 Given("the CSV file at path {string} has the headings below", (path, headings) => {
     cy.download_file(path).then( ($text) => {
        let lines = $text.trim().split('\n')
        let header_line = headings.rawTable[0][0]
        for(let i = 1; i < headings.rawTable[0].length; i++){
            header_line += "," + headings.rawTable[0][i]
        }

        expect(lines[0]).to.equal(header_line)
    })
})

/**
 * @module CSV
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example the CSV file at path {string} has a value {string} for column {string}
 * @param {string} path - the text path of the CSV location
 * @param {string} value - the value of the column data we are verifying
 * @param {string} column - the text name of the column data we are verifying
 * @description Verifies a row value exists for a given column within a CSV file.
 */
 Given("the CSV file at path {string} has a value {string} for column {string}", (path, value, column) => {
     function parseCSVRow(row) {
         // Regular expression to match commas not inside quotes
         const regex = /,\s*(?=(?:[^"]|"[^"]*")*$)/
         let cells = row.split(regex)

         // Trim leading and trailing spaces and remove quotes from string cells
         cells = cells.map(function(cell) { return cell.trim().replace(/^"|"$/g, '') })
         return cells
     }

     cy.download_file(path).then(($text) => {
         let lines = $text.trim().split('\n')
         let columns = parseCSVRow(lines[0])
         let index = columns.indexOf(column)

         expect(index).to.be.greaterThan(-1)

         let found_value = { match: false, type: null, value: null }
         let promise = Promise.resolve()

         promise = promise.then(() => {
             for (let i = 1; i < lines.length; i++) {
                 let columns = parseCSVRow(lines[i])
                 let columnValue = columns[index]
                 if (columnValue.includes(value)) {
                     found_value['match'] = true
                     found_value['type'] = 'string'
                     found_value['value'] = columnValue
                     return Promise.resolve()
                 } else if (window.dateFormats.hasOwnProperty(value)){
                    const substring = columnValue.match(window.dateFormats[value])
                    const isMatch = substring !== null
                     if(isMatch){
                         found_value['match'] = true
                         found_value['type'] = 'datetime'
                         found_value['value'] = columnValue
                         return Promise.resolve()
                     }
                 }
             }
         })

         promise.then(() => {
             if (found_value['match'] && found_value['type'] === 'datetime') {
                 expect(found_value['value']).to.match(window.dateFormats[value])
             } else if (found_value['match']) {
                 expect(found_value['value']).to.contain(value)
             }

         }).catch((error) => {
             console.error("An error occurred:", error)
         })
     })
})

/**
 * @module CSV
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I remove line {int} from a CSV file at path {string}
 * @param {string} path - the text path of the CSV location
 * @param {string} value - the value of the column data we are verifying
 * @param {string} column - the text name of the column data we are verifying
 * @description Removes a line from the CSV file at the path specified.
 */
 Given("I remove line {int} from a CSV file at path {string}", (line, path) => {
     cy.download_file(path).then( ($text) => {
        let lines = $text.trim().split('\n')

        let newLines = []
        for(let i = 0; i < lines.length; i++){
            if(i !== line-1){
                newLines.push(lines[i])
            }
        }
        cy.writeFile(path, newLines.join(',\n') + '\n')
    })
})