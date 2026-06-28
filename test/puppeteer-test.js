"use strict";

const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const puppeteer = require('puppeteer');
const { startCoverage, writeCoverage } = require('./coverage.js');

const url = pathToFileURL(path.resolve(__dirname, '../example/popup-dp.html')).href;

test('los diálogos se ven en castellano', async function(){
    const browser = await puppeteer.launch(process.env.CI ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : undefined);
    try{
        const page = await browser.newPage();
        await startCoverage(page);
        await page.goto(url);
        await page.waitForSelector('#confirm_example1');
        assert.equal(await page.$('.dialog-promise'), null, 'el diálogo no existe antes del clic');
        await page.click('#confirm_example1');
        await page.waitForSelector('.dialog-promise');
        const textosSi = await page.$$eval('.dialog-promise button', function(buttons){
            return buttons.map(function(button){ return button.textContent; });
        });
        assert.equal(
            textosSi.filter(function(texto){ return texto === 'Sí'; }).length,
            1,
            "hay exactamente un botón que dice 'Sí'"
        );
        await writeCoverage(page);
    }finally{
        await browser.close();
    }
});
