'use strict';

let chai = require("chai"),
    check = chai.expect;
chai.use(require("chai-sorted"));

let homePage = function() {

    //Elements

    const listOfRatings= element.all(by.css("[class*='rating stars']"));
    const listOfPrices = element.all(by.css('.ssl-price-box price[class*=lg-price]'));
    const listOfTitles = element.all(by.css('.ssl-name'));

    //Actions

    this.filterBtn = function (name) {
        let filterButton = element(by.xpath(`//div[contains(@class,'filter-item')]//a[contains(.,'${name}')]`));
        return filterButton
    };

    this.sortOption = function (name) {
        let sortOption = element(by.xpath(`//a[contains(.,'${name}')]`));
        return sortOption
    };

    this.clickFilterBtn = function (name) {
        this.filterBtn(name).click()
    };

    this.sortCertificatesBy = function (name) {
        this.sortOption(name).click();
    };

    this.checkSortingByFeatured = function () {
        let ratingArr = [];
        listOfRatings.each((ratingElement) => {
            ratingElement.getAttribute('class').then(text => {
                let number = parseFloat(text.replace(/[^\d_]/g, '').replace('_', '.'));
                return ratingArr.push(number);
            });
        }).then(() => {
            console.log('!!!!featured'+ratingArr);
            check(ratingArr).to.be.sorted(true);
        });
    };

    this.checkSortingByPrices = function () {
        let pricesArr = [];
        listOfPrices.each((priceElement) => {
            priceElement.getAttribute('value').then(text => {
                return pricesArr.push(parseFloat(text));
            });
        }).then(() => {
            console.log('!!!!prices'+pricesArr);
            check(pricesArr).to.be.sorted();
        });
    };

    this.checkPersonalFilter = function () {
        listOfTitles.each(function(element) {
            element.getText().then(function (text) {
                console.log('sdfsdfsd'+text);
                expect(text).toContain('PositiveSSL');
            });
        });
    };

    this.checkMultiDomainFilter = function () {
        listOfTitles.each(function(element) {
            element.getText().then(function (text) {
                console.log('sdfsdfsd'+text);
                expect(text).toContain('Multi-Domain');
            });
        });
    }
};
module.exports = new homePage();