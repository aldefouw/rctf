Cypress.on("uncaught:exception", (err, runnable) => {
    console.debug(">> uncaught:exception disabled in cypress/support/e2e.js");
    return false;  // prevents Cypress from failing the test
})