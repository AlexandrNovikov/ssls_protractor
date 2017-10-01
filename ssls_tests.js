'use strict';
describe('SSLS Demo App spec', function() {

    beforeEach(function() {
        browser.get('https://www.ssls.com/');
    });

    let validUser = {email: 'ssls.automation+5@gmail.com', password: '123456'};
    let header = require('./fragments/header.js');
    let authorizationPage = require('./pages/authorizationPage');
    let profilePage = require('./pages/profilePage');
    let homePage = require('./pages/homePage');

    // Scenario for Test Case 1 and Test Case 5
    it('User should be able to log in and log out', function() {

        header.clickHeaderOption('Log in');
        authorizationPage.fillLoginFormAs(validUser);
        expect(authorizationPage.getPasswordAttribute()).toEqual('password');
        authorizationPage.clickEyeIcon();
        expect(authorizationPage.getPasswordAttribute()).toEqual('text');
        authorizationPage.clickLoginBtn();
        expect(header.headerOption(validUser.email).isDisplayed()).toBe(true);
        header.clickMenuOption('Log out');
        expect(header.headerOption(validUser.email).isPresent()).toBe(false);
        expect(authorizationPage.getPageTitle()).toEqual('Authorization');
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
     });

    // Scenario for Test Case 2, Test Case 3 and Test Case 4
    it('User should see relevant error messages after attempt to login with invalid credentials', function () {
        let notRegisteredUser = {email: 'test321@gmail.com', password: 'test321'};
        let userWithInvalidEmail = {email: 'ssls.automation+5@@gmail.com', password: '123456'};

        header.clickHeaderOption('Log in');
        authorizationPage.clickLoginBtn();
        expect(header.headerOption(validUser.email).isPresent()).toBe(false);
        expect(authorizationPage.getErrorMessageForEmail()).toEqual('Oops, please\nenter your email');
        expect(authorizationPage.getErrorMessageForPassword()).toEqual('Looks like you’ve\nmissed this one');
        authorizationPage.submitLoginFormAs(notRegisteredUser);
        expect(authorizationPage.getFlashErrorMessage()).toEqual('Uh oh! Email or password is incorrect');
        authorizationPage.submitLoginFormAs(userWithInvalidEmail);
        expect(authorizationPage.getErrorMessageForEmail()).toEqual('Uh oh! This\nisn’t an email');
    });

    // Scenario for Test Case 6 and Test Case 7
    it('User should be able to refresh pin and check profile details', function () {

        header.clickHeaderOption('Log in');
        authorizationPage.submitLoginFormAs(validUser);
        header.clickMenuOption('View profile');
        expect(profilePage.getPageTitle()).toEqual('Profile');
        let oldSupp = profilePage.getValueFromProfile('pin');
        profilePage.clickPinIcon();
        let lastSupp = profilePage.getValueFromProfile('pin');
        expect(oldSupp).not.toEqual(lastSupp);
        let currentName = profilePage.getValueFromProfile('name');
        let currentEmail = profilePage.getValueFromProfile('email');
        let currentPassword = profilePage.getValueFromProfile('password');
        let currentPhone = profilePage.getValueFromProfile('phone');
        let currentAddress = profilePage.getValueFromProfile('address');
        let currentPin = profilePage.getValueFromProfile('pin');
        let currentNewsletter = profilePage.getValueOfNewsletter();
        header.clickMenuOption('Log out');
        authorizationPage.submitLoginFormAs(validUser);
        header.clickMenuOption('View profile');
        expect(profilePage.getValueFromProfile('name')).toEqual(currentName);
        expect(profilePage.getValueFromProfile('email')).toEqual(currentEmail);
        expect(profilePage.getValueFromProfile('password')).toEqual(currentPassword);
        expect(profilePage.getValueFromProfile('phone')).toEqual(currentPhone);
        expect(profilePage.getValueFromProfile('address')).toEqual(currentAddress);
        expect(profilePage.getValueFromProfile('pin')).toEqual(currentPin);
        expect(profilePage.getValueOfNewsletter()).toEqual(currentNewsletter);
    });

// Scenario for Test Case 8
    it('User should be able to check sorting and filters of certificates on Home page', function () {

        homePage.checkSortingByFeatured();
        homePage.sortCertificatesBy('Cheapest');
        homePage.checkSortingByPrices();
        homePage.clickFilterBtn('Personal');
        homePage.checkPersonalFilter();
        homePage.clickFilterBtn('multi-domain');
        homePage.checkMultiDomainFilter();
    });
});
