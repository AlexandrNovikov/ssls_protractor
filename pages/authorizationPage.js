'use strict';
let authorizationPage = function() {

    //Elements

    const emailField = element(by.css('[name=authForm] [name=email]'));
    const passwordField = element(by.css('[name=authForm] [name=password]'));
    const eyeIcon = element(by.css('.icon.icon-eye'));
    const loginBtn = element(by.css('[name=authForm] [type=submit]'));
    const emailErrorMessage = element(by.css("[class=left-tooltip-box][ng-show*='authForm.email'] span"));
    const passwordErrorMessage = element(by.css("[class=left-tooltip-box][ng-show*='authForm.password'] span"));
    const emailFlashErrorMessage = element(by.className("noty_text"));
    const pageTitle = element(by.className('page-title'));

    let EC = protractor.ExpectedConditions;

    //Actions

    this.getPageTitle = function () {
        return pageTitle.getText();
    };

    this.fillLoginFormAs = function (user) {
        emailField.clear();
        passwordField.clear();
        emailField.sendKeys(user.email);
        passwordField.sendKeys(user.password);
    };

    this.clickLoginBtn = function () {
        loginBtn.click()
    };

    this.submitLoginFormAs = function (user) {
        this.fillLoginFormAs(user);
        this.clickLoginBtn();
    };

    this.clickEyeIcon = function () {
        eyeIcon.click()
    };

    this.getPasswordAttribute = function () {
        return passwordField.getAttribute('type');
    };

    this.getErrorMessageForEmail = function () {
        return emailErrorMessage.getText();
    };

    this.getErrorMessageForPassword = function () {
        return passwordErrorMessage.getText();
    };

    this.getFlashErrorMessage = function () {
        browser.wait(EC.presenceOf(emailFlashErrorMessage), 5000);
        return emailFlashErrorMessage.getText();
    };
};
module.exports = new authorizationPage();