import {HomePagePo} from "../../pageObjects/homePage/homePage.po";
import {ChecklistPo} from "../../pageObjects/checklist/checklist.po";
import {Timeout} from "../../pageObjects/utils/enums";
import {HomeTestData} from "../fixtures/testData/homeTestData/homeTestData";
import {CheckListTestData} from "../fixtures/testData/checklistTestData/checklistTestData";

describe('Verify checklist functionalities working as expected', () => {

    const homePage = new HomePagePo();
    const checklist = new ChecklistPo();

    before(() => {
        /**
         * cy.login() is a custom command created
         * username - environment variable
         * password - environment variable
         */
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.url().should("include", HomeTestData.url);
        homePage.openEpic(HomeTestData.epicTitle);
    })

    it('Verify checklist functionalities working as expected', () => {

        checklist.addTabName(CheckListTestData.tabName);
        checklist.addTaskSummary(CheckListTestData.taskName);
        checklist.addTaskSummary(CheckListTestData.secondTaskName);
        checklist.waitForContentToLoad(Timeout.SHORT);

        checklist.completeTaskViaCheckbox(0);
        checklist.getTaskStatus(0);
        checklist.getTotalTasksStatus();
        checklist.getStatus().should("equal", CheckListTestData.completed);
        checklist.totalTaskStatus().should('equal', CheckListTestData.completeStatus[1]);

        checklist.completeTaskViaCheckbox(0);
        checklist.getTaskStatus(0);
        checklist.getTotalTasksStatus();
        checklist.getStatus().should("equal", CheckListTestData.todo);
        checklist.totalTaskStatus().should('equal', CheckListTestData.completeStatus[0]);

        checklist.selectStatus(0, CheckListTestData.inProgress);
        checklist.getTaskStatus(0);
        checklist.getTotalTasksStatus();
        checklist.getStatus().should("equal", CheckListTestData.inProgress);
        checklist.totalTaskStatus().should('equal', CheckListTestData.completeStatus[0]);

        checklist.selectStatus(0, CheckListTestData.blocked);
        checklist.getTaskStatus(0);
        checklist.getTotalTasksStatus();
        checklist.getStatus().should("equal", CheckListTestData.blocked);
        checklist.totalTaskStatus().should('equal', CheckListTestData.completeStatus[0]);

        checklist.selectStatus(0, CheckListTestData.skipped);
        checklist.getTaskStatus(0);
        checklist.getTotalTasksStatus();
        checklist.getStatus().should("equal", CheckListTestData.skipped);
        checklist.totalTaskStatus().should('equal', CheckListTestData.completeStatus[1]);

        checklist.deleteChecklist(CheckListTestData.delete);
    });
});
