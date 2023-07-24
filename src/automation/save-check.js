'use strict';
const puppeteer = require('puppeteer');

(async () => {

    var headlessBrowser = 'new'

    for (const arg of process.argv) {
        switch (arg) {
            case "--help":
                printHelp();
                return;
            case "--headful":
                headlessBrowser = false;
                continue;
            case "--keep-browser":
                keepBrowser = true;
                continue;
            case "--no-rewrite":
                rewriteInput = false;
                continue;
            case "--debug":
                headlessBrowser = false;
                keepBrowser = true;
                rewriteInput = false;
        }
    }

    const browser = await puppeteer.launch({ headless: headlessBrowser })
    const page = await browser.newPage()
    await page.goto('https://save.uscis.gov/save/app/client/ui/case-check')
    await page.setViewport({ width: 1680, height: 878 })

    console.log('Start --->')

    // I Agree
    await page.waitForSelector('.route-container > #single-spa-application\\:\\@save\\/case-check > #main-content > .grid-container > .usa-button')
    await page.click('.route-container > #single-spa-application\\:\\@save\\/case-check > #main-content > .grid-container > .usa-button')
    await delay(2000);

    console.log('Filling --->')

    await page.waitForSelector('#main-content > .grid-container > .usa-form > .usa-form-group > .usa-select')
    await page.click('#main-content > .grid-container > .usa-form > .usa-form-group > .usa-select')

    await page.select('#main-content > .grid-container > .usa-form > .usa-form-group > .usa-select', 'passportNumber')

    await page.waitForSelector('#answer')
    await page.click('#answer')

    await page.type('#answer', 'N06216733')

    await page.waitForSelector('#countryOfIssuance')
    await page.click('#countryOfIssuance')

    await page.select('#countryOfIssuance', 'MEX')

    await page.waitForSelector('#dob1')
    await page.click('#dob1')

    await page.type('#dob1', '11')

    await page.type('#dob2', '26')

    await page.type('#dob3', '1982')

    await page.waitForSelector('#single-spa-application\\:\\@save\\/case-check > #main-content > .grid-container > .usa-form > .usa-button')
    await page.click('#single-spa-application\\:\\@save\\/case-check > #main-content > .grid-container > .usa-form > .usa-button')

    console.log('Going Results --->')

    await delay(2000);

    console.log('Waiting Results --->')

    await page.screenshot({ path: 'img-out/save-check-status.png' });

    await page.waitForSelector('.width-full:nth-child(1) > .usa-card__container > .usa-card__body > .grid-row > a')
    await page.click('.width-full:nth-child(1) > .usa-card__container > .usa-card__body > .grid-row > a')

    await delay(2000);

    await page.screenshot({ path: 'img-out/save-check-details.png' });

    console.log('Status Saved !!')

    await browser.close()

    function delay(t, val) {
        return new Promise(resolve => setTimeout(resolve, t, val));
    }
})();