const puppeteer = require("puppeteer");

async function parsePage() {
	const browser = await puppeteer.launch({ headless: false });
	const page = browser.newPage();
}
