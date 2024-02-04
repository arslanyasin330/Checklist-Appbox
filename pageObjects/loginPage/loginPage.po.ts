import {BasePage} from "../base/basePage";

export class LoginPage extends BasePage {
    private readonly username = '[id="username"]';
    private readonly password = '[id="password"]';
    private readonly continueButton = '[id="login-submit"]';

    addUsername(username: string) {
        this.getElement(this.username).clear().type(username);
    }

    addPassword(password: string) {
        this.getElement(this.password).clear().type(password, { delay: 10 });
    }

    continue() {
        this.click(this.continueButton);
    }
}
