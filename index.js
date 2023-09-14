import puppeteer from 'puppeteer'

const URL = 'https://naruto-base.tv/novosti/drugoe_anime_rus'
const TITLE = 'Магическая'

async function findStrInArray(array, str) {
  return array.filter((item) => item.includes(str))
}

async function parsePage(url) {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)

    const titles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2'), (el) => el.innerText)
    })

    const needTitle = await findStrInArray(titles, TITLE)

    console.log(needTitle)

    await browser.close()
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
}

parsePage(URL)
