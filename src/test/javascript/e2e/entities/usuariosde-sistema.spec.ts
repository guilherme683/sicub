import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UsuariosdeSistema e2e test', () => {

    let navBarPage: NavBarPage;
    let usuariosdeSistemaDialogPage: UsuariosdeSistemaDialogPage;
    let usuariosdeSistemaComponentsPage: UsuariosdeSistemaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UsuariosdeSistemas', () => {
        navBarPage.goToEntity('usuariosde-sistema');
        usuariosdeSistemaComponentsPage = new UsuariosdeSistemaComponentsPage();
        expect(usuariosdeSistemaComponentsPage.getTitle())
            .toMatch(/sicubApp.usuariosdeSistema.home.title/);

    });

    it('should load create UsuariosdeSistema dialog', () => {
        usuariosdeSistemaComponentsPage.clickOnCreateButton();
        usuariosdeSistemaDialogPage = new UsuariosdeSistemaDialogPage();
        expect(usuariosdeSistemaDialogPage.getModalTitle())
            .toMatch(/sicubApp.usuariosdeSistema.home.createOrEditLabel/);
        usuariosdeSistemaDialogPage.close();
    });

    it('should create and save UsuariosdeSistemas', () => {
        usuariosdeSistemaComponentsPage.clickOnCreateButton();
        usuariosdeSistemaDialogPage.setNomeInput('nome');
        expect(usuariosdeSistemaDialogPage.getNomeInput()).toMatch('nome');
        usuariosdeSistemaDialogPage.setSenhaInput('senha');
        expect(usuariosdeSistemaDialogPage.getSenhaInput()).toMatch('senha');
        usuariosdeSistemaDialogPage.sgdbSelectLastOption();
        usuariosdeSistemaDialogPage.setBaseInput('base');
        expect(usuariosdeSistemaDialogPage.getBaseInput()).toMatch('base');
        usuariosdeSistemaDialogPage.setEsquemaInput('esquema');
        expect(usuariosdeSistemaDialogPage.getEsquemaInput()).toMatch('esquema');
        usuariosdeSistemaDialogPage.setDescricaoBaseInput('descricaoBase');
        expect(usuariosdeSistemaDialogPage.getDescricaoBaseInput()).toMatch('descricaoBase');
        usuariosdeSistemaDialogPage.setSolicitanteInput('solicitante');
        expect(usuariosdeSistemaDialogPage.getSolicitanteInput()).toMatch('solicitante');
        usuariosdeSistemaDialogPage.setRamalInput('5');
        expect(usuariosdeSistemaDialogPage.getRamalInput()).toMatch('5');
        usuariosdeSistemaDialogPage.setEmailInput('email');
        expect(usuariosdeSistemaDialogPage.getEmailInput()).toMatch('email');
        usuariosdeSistemaDialogPage.areaSelectLastOption();
        usuariosdeSistemaDialogPage.setDataCriacaoInput('2000-12-31');
        expect(usuariosdeSistemaDialogPage.getDataCriacaoInput()).toMatch('2000-12-31');
        // usuariosdeSistemaDialogPage.servidoresSelectLastOption();
        usuariosdeSistemaDialogPage.save();
        expect(usuariosdeSistemaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UsuariosdeSistemaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-usuariosde-sistema div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UsuariosdeSistemaDialogPage {
    modalTitle = element(by.css('h4#myUsuariosdeSistemaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    senhaInput = element(by.css('input#field_senha'));
    sgdbSelect = element(by.css('select#field_sgdb'));
    baseInput = element(by.css('input#field_base'));
    esquemaInput = element(by.css('input#field_esquema'));
    descricaoBaseInput = element(by.css('input#field_descricaoBase'));
    solicitanteInput = element(by.css('input#field_solicitante'));
    ramalInput = element(by.css('input#field_ramal'));
    emailInput = element(by.css('input#field_email'));
    areaSelect = element(by.css('select#field_area'));
    dataCriacaoInput = element(by.css('input#field_dataCriacao'));
    servidoresSelect = element(by.css('select#field_servidores'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setSenhaInput = function(senha) {
        this.senhaInput.sendKeys(senha);
    };

    getSenhaInput = function() {
        return this.senhaInput.getAttribute('value');
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
    setBaseInput = function(base) {
        this.baseInput.sendKeys(base);
    };

    getBaseInput = function() {
        return this.baseInput.getAttribute('value');
    };

    setEsquemaInput = function(esquema) {
        this.esquemaInput.sendKeys(esquema);
    };

    getEsquemaInput = function() {
        return this.esquemaInput.getAttribute('value');
    };

    setDescricaoBaseInput = function(descricaoBase) {
        this.descricaoBaseInput.sendKeys(descricaoBase);
    };

    getDescricaoBaseInput = function() {
        return this.descricaoBaseInput.getAttribute('value');
    };

    setSolicitanteInput = function(solicitante) {
        this.solicitanteInput.sendKeys(solicitante);
    };

    getSolicitanteInput = function() {
        return this.solicitanteInput.getAttribute('value');
    };

    setRamalInput = function(ramal) {
        this.ramalInput.sendKeys(ramal);
    };

    getRamalInput = function() {
        return this.ramalInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setAreaSelect = function(area) {
        this.areaSelect.sendKeys(area);
    };

    getAreaSelect = function() {
        return this.areaSelect.element(by.css('option:checked')).getText();
    };

    areaSelectLastOption = function() {
        this.areaSelect.all(by.tagName('option')).last().click();
    };
    setDataCriacaoInput = function(dataCriacao) {
        this.dataCriacaoInput.sendKeys(dataCriacao);
    };

    getDataCriacaoInput = function() {
        return this.dataCriacaoInput.getAttribute('value');
    };

    servidoresSelectLastOption = function() {
        this.servidoresSelect.all(by.tagName('option')).last().click();
    };

    servidoresSelectOption = function(option) {
        this.servidoresSelect.sendKeys(option);
    };

    getServidoresSelect = function() {
        return this.servidoresSelect;
    };

    getServidoresSelectedOption = function() {
        return this.servidoresSelect.element(by.css('option:checked')).getText();
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
