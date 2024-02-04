import {BasePage} from "../base/basePage";

export class TodoListPo extends BasePage {
    private createdTask = (taskId: string) => `[id="card-${taskId}"]`;

    openTask(taskId: string): void {
        this.click(this.createdTask(taskId));
    }
}
