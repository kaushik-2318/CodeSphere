const puppeteer = require('puppeteer');
const path = require('path')
const { v4: uuid } = require('uuid');
const fs = require('fs')

const screenshot = async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    let browser;
    try {

        browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: 'true'
        });

        const page = await browser.newPage();
       
        await page.browser().version().then(function (version) {
            console.log(version);
        });

        try {
            await page.goto(url, { waitUntil: 'networkidle2' });
        } catch (err) {
            if (err.message.includes('net::ERR_NAME_NOT_RESOLVED') || err.message.includes('net::ERR_SSL_UNRECOGNIZED_NAME_ALERT')) {
                return res.status(400).json({ message: 'Invalid URL' });
            }
            else {
                return res.status(400).json({ message: 'Invalid URL' })
            }
        }

        await page.setViewport({ width: 1920, height: 1080 });

        const fileName = `${uuid()}.png`;
        const screenshotPath = path.join(__dirname, '..', 'public', fileName);
        await page.screenshot({ path: screenshotPath });

        res.json({ screenshotPath: `/image/${fileName}` });
    } catch (err) {
        console.error('Error capturing screenshot:', err);
        res.status(500).json({ error: 'Failed to capture screenshot' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = screenshot;
