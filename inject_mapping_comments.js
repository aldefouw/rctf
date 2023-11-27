const fs = require('fs')
const path = require('path')

// Create a global object named window (because it isn't available in Node by default)
global.window = {}

require('./step_definitions/support/mappings') //this needs to come before all_types because we use some of this in all_types
require('./step_definitions/support/all_mappings')

// Function to inject parameter type documentation into step definition files
function injectDocumentation() {
    const stepDefinitionFiles = getStepDefinitionFiles(); // Implement or replace with your own logic to get step definition files

    stepDefinitionFiles.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const modifiedContent = injectOptionsMaps(fileContent);
        fs.writeFileSync(filePath, modifiedContent, 'utf-8');
    });

    console.log('Documentation comments injected into step definition files.');
}

// Function to get a list of step definition files (implement or replace with your own logic)
function getStepDefinitionFiles() {
    const stepDefinitionsDir = path.join(__dirname, 'step_definitions');
    return fs.readdirSync(stepDefinitionsDir)
        .filter(file => file.endsWith('.js'))
        .map(file => path.join(stepDefinitionsDir, file));
}

// Function to replace placeholders with options maps in the source code
function injectOptionsMaps(source) {
    // Iterate through each parameter type
    for (const [key, values] of Object.entries(window.parameterTypes)) {
        // Generate a RegExp pattern for the placeholder, e.g., ${enableDisable}
        const pattern = new RegExp(`\\*\\s+@param\\s+\\{string\\}\\s+${key}\\s*-\\s*([^\\n]*)\\n`)

        // Replace occurrences of the placeholder with the options map
        source = source.replace(pattern, `* @param {string} ${key} - available options: ${values.map(option => `'${option}'`).join(', ')}\n`)
    }
    return source;
}

// Call the function to inject documentation comments into step definition files
injectDocumentation();