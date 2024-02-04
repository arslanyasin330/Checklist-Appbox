import {BasePage} from "../base/basePage";

export class OpenedTicketPo extends BasePage {
    private issueEpic = "ul [data-testid*='issue.issue-view']";

    openEpic(epicId: string) {
        this.getElement(this.issueEpic).contains(epicId).click();
    }
}
