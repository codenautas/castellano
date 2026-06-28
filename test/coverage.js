"use strict";

const path = require('node:path');
const v8toIstanbul = require('v8-to-istanbul');
const libCoverage = require('istanbul-lib-coverage');
const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');

// Path (relative to the repo root) of the only file whose coverage matters.
// The other browser scripts (require-bro, best-globals, dialog-promise) are
// dependencies and get discarded.
const coveredFile = 'lib/cliente-en-castellano.js';

async function startCoverage(page){
    await page.coverage.startJSCoverage({ resetOnNavigation: false, includeRawScriptCoverage: true });
}

async function writeCoverage(page){
    const entries = await page.coverage.stopJSCoverage();
    const entry = entries.find(function(e){ return e.url.endsWith(coveredFile); });
    if(!entry){
        throw new Error('No coverage found for '+coveredFile);
    }
    const converter = v8toIstanbul(coveredFile, 0, { source: entry.text });
    await converter.load();
    converter.applyCoverage(entry.rawScriptCoverage.functions);
    const coverageMap = libCoverage.createCoverageMap(converter.toIstanbul());
    const context = libReport.createContext({ dir: path.resolve(process.cwd(), 'coverage'), coverageMap: coverageMap });
    reports.create('lcovonly').execute(context);
}

module.exports = { startCoverage, writeCoverage };
