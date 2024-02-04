import {BasePage} from "../base/basePage";

export class HomePagePo extends BasePage {
    private readonly projects = 'header button';
    private readonly createdIssue = '[data-smart-element="Title"]';

    openProjectDropdown(projectName: string) {
        this.getElement(this.projects).filter(`:contains("${projectName}")`).click();
    }

    openProject(projectName: string) {
        cy.contains(projectName).click();
    }

    openEpic(issueName: string) {
        this.getElement(this.createdIssue).filter(`:contains("${issueName}")`)
            .invoke("removeAttr","target").click();
    }
}
