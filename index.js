const puppeteer = require('puppeteer');
let { config } = require('./config.js');

 var init=async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        }
    );
    const page = await browser.newPage();
    await page.goto('https://ikuuu.co/user#', {
        waitUntil: 'domcontentloaded'
    });
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', config.email);
    await page.type('input[name="password"]', config.password);
    await page.click('button[type = "submit"]');
    await page.waitForSelector('#checkin-div');
    let content = await page.$eval('#checkin-div a', el => el.textContent);
    console.log(content);
    if (content.includes("明日再来")) {
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitFor(3000);
            await dialog.dismiss();
        })
        await page.evaluate(() => alert('已经签到请明日再来,我将自动关闭'));


    } else {
        await page.click('#checkin-div');
        page.on('dialog', async dialog => {
            await page.waitFor(3000);
            await dialog.dismiss();
        })
        await page.evaluate(() => alert('签到成功,我将自动关闭'));
    }
    await page.waitFor(3000);
    await browser.close();

}
exports.init=init;