/**
 * @module DataImport
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I upload a {string} format file located at {string}, by clicking the button near {string} to browse for the file, and clicking the button labeled {string} to upload the file
 * @param {string} format - the format of the file that is being uploaded (e.g. csv)
 * @param {string} file_location - the location of the file being uploaded (e.g. import_files/core/filename.csv)
 * @param {string} uplaod_label - text near the upload label
 * @param {string} button_label - text on the button you click to upload
 * @description Imports well-formed REDCap data import file (of specific type) to a specific project given a Project ID.
 */
Given("I upload a {string} format file located at {string}, by clicking the button near {string} to browse for the file, and clicking the button labeled {string} to upload the file", (format, file_location, upload_text, button_label) => {
    cy.upload_file(file_location, format, '', button_label, upload_text)
})

/**
 * @module DataImport
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I upload a file located at {string} to the File Repository
 * @param {string} file_location - the location of the file being uploaded (e.g. import_files/core/filename.csv)
 * @description Imports file (of specific type) to the File Repository.
 */
Given("I upload a file located at {string} to the File Repository", (file_location) => {
    cy.file_repo_upload(file_location).then(() => {
        cy.get(`button:contains("Select files to upload"):visible`).invoke('attr', 'onclick', "").click()
    })
})

/**
 * @module DataImport
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I create a new project named {string} by clicking on "New Project" in the menu bar, selecting "{projectType}" from the dropdown, choosing file {string}, and clicking the "{projectRequestLabel}" button
 * @param {string} project_name - the desired name for the project
 * @param {string} projectType - available options: 'Practice / Just for fun', 'Operational Support', 'Research', 'Quality Improvement', 'Other'
 * @param {string} cdisc_file - the fixture path to the CDISC XML file (relative path; fixtures are located in /cypress/fixtures/cdisc_files/)
 * @param {string} projectRequestLabel - available options: 'Create Project', 'Send Request'
 * @description Creates a new REDCap project of a specific project type from a CDISC XML file.
 */
Given('I create a new project named {string} by clicking on "New Project" in the menu bar, selecting "{projectType}" from the dropdown, choosing file {string}, and clicking the "{projectRequestLabel}" button', (project_name, project_type, cdisc_file, button_label) => {
    cy.create_cdisc_project(project_name, project_type, cdisc_file, button_label)
})