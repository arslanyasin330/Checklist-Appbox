import {LoginPage} from "../../pageObjects/loginPage/loginPage.po";
import {Timeout} from "../../pageObjects/utils/enums";

const loginPage = new LoginPage()

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit("/");
    loginPage.addUsername(username);
    loginPage.continue();
    loginPage.addPassword(password);
    loginPage.continue();
    loginPage.waitForContentToLoad(Timeout.LONG);
})

Cypress.Commands.add('getChecklistIframeBody', () => {
    return cy
        .get('iframe[id*="com.appbox.ai.checklist.enterprise"]')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap);
})

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<void>
            getIframeBody(): Chainable<void>
        }
    }
}

declare global {
    namespace Cypress {
        interface Chainable {
            getChecklistIframeBody()
        }
    }
}
