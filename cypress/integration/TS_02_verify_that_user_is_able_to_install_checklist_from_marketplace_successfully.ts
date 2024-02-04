import {HomePagePo} from "../../pageObjects/homePage/homePage.po";
import {MarketPlace} from "../../pageObjects/marketplace/marketPlace.po";
import {TodoListPo} from "../../pageObjects/ticketBoard/todoList.po";
import {HomeTestData} from "../fixtures/testData/homeTestData/homeTestData";
import {MarketPlaceTestData} from "../fixtures/testData/marketPlaceTestData/marketPlaceTestData";
import {TodoTestData} from "../fixtures/testData/boardTestData/todoTestData";


describe('Verify User is able to install checklist app', () => {

    const homePage = new HomePagePo();
    const todos = new TodoListPo();
    const marketPlace = new MarketPlace();

    before(() => {
        /**
         * cy.login() is a custom command created
         * username - environment variable
         * password - environment variable
         */
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.url().should("include", HomeTestData.url);
    })

    it('Verify User is able to install checklist app', () => {
        marketPlace.visitMarketPlace();
        cy.url().should("include", MarketPlaceTestData.url);

        marketPlace.loginMarketPlace();
        marketPlace.searchForChecklistApp(MarketPlaceTestData.checklistApp);
        marketPlace.openSearchedApp(MarketPlaceTestData.cloudEnterprise);
        marketPlace.installApplication();
        marketPlace.startFreeTrial(MarketPlaceTestData.startTrial);
        marketPlace.manageApps(MarketPlaceTestData.cancelPopup);
        marketPlace.isAppInstalled();
        marketPlace.getInstalledApp().should("equal", "Added");


        homePage.openProjectDropdown(HomeTestData.projects);
        homePage.openProject(HomeTestData.projectName);
        todos.openTask(TodoTestData.taskId);
    });
});
