import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Scripts e2e test', () => {

    let navBarPage: NavBarPage;
    let scriptsDialogPage: ScriptsDialogPage;
    let scriptsComponentsPage: ScriptsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Scripts', () => {
        navBarPage.goToEntity('scripts');
        scriptsComponentsPage = new ScriptsComponentsPage();
        expect(scriptsComponentsPage.getTitle())
            .toMatch(/sicubApp.scripts.home.title/);

    });

    it('should load create Scripts dialog', () => {
        scriptsComponentsPage.clickOnCreateButton();
        scriptsDialogPage = new ScriptsDialogPage();
        expect(scriptsDialogPage.getModalTitle())
            .toMatch(/sicubApp.scripts.home.createOrEditLabel/);
        scriptsDialogPage.close();
    });

    it('should create and save Scripts', () => {
        scriptsComponentsPage.clickOnCreateButton();
        scriptsDialogPage.setAcaoInput('acao');
        expect(scriptsDialogPage.getAcaoInput()).toMatch('acao');
        scriptsDialogPage.setComandoInput('comando');
        expect(scriptsDialogPage.getComandoInput()).toMatch('comando');
        scriptsDialogPage.sgdbSelectLastOption();
        scriptsDialogPage.save();
        expect(scriptsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ScriptsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-scripts div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ScriptsDialogPage {
    modalTitle = element(by.css('h4#myScriptsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    acaoInput = element(by.css('input#field_acao'));
    comandoInput = element(by.css('input#field_comando'));
    sgdbSelect = element(by.css('select#field_sgdb'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAcaoInput = function(acao) {
        this.acaoInput.sendKeys(acao);
    };

    getAcaoInput = function() {
        return this.acaoInput.getAttribute('value');
    };

    setComandoInput = function(comando) {
        this.comandoInput.sendKeys(comando);
    };

    getComandoInput = function() {
        return this.comandoInput.getAttribute('value');
    };

    setSgdbSelect = function(sgdb) {
        this.sgdbSelect.sendKeys(sgdb);
    };

    getSgdbSelect = function() {
        return this.sgdbSelect.element(by.css('option:checked')).getText();
    };

    sgdbSelectLastOption = function() {
        this.sgdbSelect.all(by.tagName('option')).last().click();
    };
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
