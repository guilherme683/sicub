import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Servidores e2e test', () => {

    let navBarPage: NavBarPage;
    let servidoresDialogPage: ServidoresDialogPage;
    let servidoresComponentsPage: ServidoresComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Servidores', () => {
        navBarPage.goToEntity('servidores');
        servidoresComponentsPage = new ServidoresComponentsPage();
        expect(servidoresComponentsPage.getTitle())
            .toMatch(/sicubApp.servidores.home.title/);

    });

    it('should load create Servidores dialog', () => {
        servidoresComponentsPage.clickOnCreateButton();
        servidoresDialogPage = new ServidoresDialogPage();
        expect(servidoresDialogPage.getModalTitle())
            .toMatch(/sicubApp.servidores.home.createOrEditLabel/);
        servidoresDialogPage.close();
    });

    it('should create and save Servidores', () => {
        servidoresComponentsPage.clickOnCreateButton();
        servidoresDialogPage.setNomeInput('nome');
        expect(servidoresDialogPage.getNomeInput()).toMatch('nome');
        servidoresDialogPage.sgdbSelectLastOption();
        servidoresDialogPage.tipoSelectLastOption();
        servidoresDialogPage.save();
        expect(servidoresDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServidoresComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-servidores div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServidoresDialogPage {
    modalTitle = element(by.css('h4#myServidoresLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    sgdbSelect = element(by.css('select#field_sgdb'));
    tipoSelect = element(by.css('select#field_tipo'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
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
    setTipoSelect = function(tipo) {
        this.tipoSelect.sendKeys(tipo);
    };

    getTipoSelect = function() {
        return this.tipoSelect.element(by.css('option:checked')).getText();
    };

    tipoSelectLastOption = function() {
        this.tipoSelect.all(by.tagName('option')).last().click();
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
