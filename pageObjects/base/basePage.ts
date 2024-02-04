import {Timeout} from "../utils/enums";

export class BasePage {

    getElement(element: string){
        return cy.get(element, { timeout: Timeout.LONG });
    }

    click(element: string): void {
        this.getElement(element).click();
    }

    waitForContentToLoad(time: number): void {
        cy.wait(time);
    }
}
