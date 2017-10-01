'use strict';
let header = function() {

    //Elements
    const userDropDownIcon = element(by.css('.dropdown-btn'));

    //Actions

    this.headerOption = function (name) {
        let headerItem = element(by.xpath(`//a[contains(@class,'btn')][contains(.,'${name}')]`));
        return headerItem
    };

    this.clickHeaderOption = function(name){
        this.headerOption(name).click();
    };

    this.menuOption = function (name) {
        let menuItem = element(by.xpath(`//li[contains(@class,'drop-item')]//*[contains(.,'${name}')]`));
        return menuItem
    };

    this.clickMenuOption = function (name) {
        userDropDownIcon.click();
        this.menuOption(name).click();
    };
};
module.exports = new header();