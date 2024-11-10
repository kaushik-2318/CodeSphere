const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const path = require('path');
const { v4: uuid } = require('uuid');
const fs = require('fs');

const screenshot = async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    let browser;
    try {
        // Launch Puppeteer with serverless-compatible settings
        browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath || '/usr/bin/chromium-browser',
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        // Log the browser version for debugging
        await page.browser().version().then(function (version) {
            console.log("Browser version:", version);
        });

        try {
            // Navigate to the specified URL and wait until the network is idle
            await page.goto(url, { waitUntil: 'networkidle2' });
        } catch (err) {
            // Handle URL-specific errors
            if (err.message.includes('net::ERR_NAME_NOT_RESOLVED') || err.message.includes('net::ERR_SSL_UNRECOGNIZED_NAME_ALERT')) {
                return res.status(400).json({ message: 'Invalid URL' });
            } else {
                return res.status(400).json({ message: 'Invalid URL' });
            }
        }

        // Set viewport size
        await page.setViewport({ width: 1920, height: 1080 });

        // Generate a unique filename and save the screenshot
        const fileName = `${uuid()}.png`;
        const screenshotPath = path.join(__dirname, '..', 'public', fileName);
        await page.screenshot({ path: screenshotPath });

        // Return the path to the saved screenshot
        res.json({ screenshotPath: `/image/${fileName}` });
    } catch (err) {
        console.error('Error capturing screenshot:', err);
        res.status(500).json({ error: 'Failed to capture screenshot' });
    } finally {
        // Ensure the browser is closed after completion or error
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = screenshot;
