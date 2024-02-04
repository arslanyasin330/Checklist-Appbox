import {Constants} from "../../cypress/fixtures/constants";
import {BasePage} from "../base/basePage";

export class MarketPlace extends BasePage {
    private readonly login = ".log-in-link";
    private readonly search = '[name="search-query"]';
    private readonly searchedResult  = '[data-testid="app-tile"]';
    private readonly installAppBtn  = '[data-testid*="install-app-btn"]';
    private readonly popupManageApps  = '[class*=FooterContainer] button';
    private readonly startTrial  = '[data-testid="install-button"]';
    private readonly installApp  = '[data-testid="app-installed"]';

    visitMarketPlace() {
        cy.visit(Constants.marketPlaceUrl);
    }

    loginMarketPlace(){
        this.getElement(this.login).last().click();
    }

    searchForChecklistApp(app: string) {
        this.getElement(this.search).clear().type(`${app}{enter}`);
    }

    openSearchedApp(title: string) {
        this.getElement(this.searchedResult).filter(`:contains(${title})`).click();
    }

    installApplication() {
        this.click(this.installAppBtn);
    }

    manageApps(button: string) {
        this.getElement(this.popupManageApps).contains(button).click();
    }

    startFreeTrial(trial: string) {
        this.getElement(this.startTrial).contains(trial).click();
    }

    isAppInstalled() {
        cy.get(this.installApp).then($value => {
            const textValue = $value.text();
            cy.wrap(textValue.trimStart()).as('appInstall');
        })
    }

    getInstalledApp() {
        return cy.get("@appInstall");
    }
}
