import {BasePage} from "../base/basePage";

export class ChecklistPo extends BasePage {
    private readonly tabNameInput = '[placeholder*="Add Checklist tab"]';
    private readonly newTaskSummary = '[aria-label*="Press SPACE"] div[col-id="summary"]';
    private readonly addItem = 'button.btn-link';
    private readonly checkboxInput = '[aria-label*="Press SPACE"] [type="checkbox"]';
    private readonly taskStatus = '[aria-label*="Press SPACE"] [col-id="status"]';
    private readonly totalTasksStatus  = '.section-badge';
    private readonly statusDropdown  = '[aria-label*="Press SPACE"] select';
    private readonly menuDropdown  = '#dropdownMenuButton';
    private readonly dropdownOptions  = 'a.dropdown-item';
    private readonly deleteButton  = 'mat-dialog-container i.fa-trash-alt';
    private readonly confirmDeleteBtn  = '.BasicModalsButtonOk';
    private readonly popupOkBtn  = 'mat-dialog-container .btn-outline-primary';

    addTabName(name: string) {
        cy.getChecklistIframeBody().find(this.tabNameInput).type(`${name}{enter}`);
    }

    clickTask(index: number) {
        cy.getChecklistIframeBody().find(this.newTaskSummary).eq(index).click();
    }

    addTaskSummary(summary: string) {
        cy.getChecklistIframeBody().find(this.newTaskSummary).first().type(`${summary}{enter}`);
    }

    addNewItem() {
        cy.getChecklistIframeBody().find(this.addItem).last().click();
    }

    completeTaskViaCheckbox(index: number) {
        cy.getChecklistIframeBody().find(this.checkboxInput).eq(index).click();
    }

    getTaskStatus(index: number) {
        cy.getChecklistIframeBody().find(this.taskStatus).eq(index).then($value => {
            const textValue = $value.text();
            cy.wrap(textValue.trimStart()).as('taskStatus');
        })
    }

    getTotalTasksStatus() {
        cy.getChecklistIframeBody().find(this.totalTasksStatus).invoke('text').as('totalTasksStatus');
    }

    getStatus() {
        return cy.get('@taskStatus');
    }

    totalTaskStatus() {
        return cy.get('@totalTasksStatus');
    }

    clickOnStatus(index: number) {
        cy.getChecklistIframeBody().find(this.taskStatus).eq(index).click();
    }

    selectStatus(index: number, status: string) {
        this.clickOnStatus(index);
        cy.getChecklistIframeBody().find(this.statusDropdown).select(status);
        this.clickTask(index);
    }

    openChecklistMenu() {
        cy.getChecklistIframeBody().find(this.menuDropdown).click();
    }

    clickDeleteChecklist(option: string) {
        cy.getChecklistIframeBody().find(this.dropdownOptions).contains(option).click();
    }

    clickChecklistDeleteIcon() {
        cy.getChecklistIframeBody().find(this.deleteButton).click();
    }

    confirmDelete() {
        cy.getChecklistIframeBody().find(this.confirmDeleteBtn).click();
    }

    clickPopupOkBtn() {
        cy.getChecklistIframeBody().find(this.popupOkBtn).click();
    }

    deleteChecklist(option: string) {
        this.openChecklistMenu();
        this.clickDeleteChecklist(option);
        this.clickChecklistDeleteIcon();
        this.confirmDelete();
        this.clickPopupOkBtn();
    }
}
