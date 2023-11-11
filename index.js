import puppeteer from 'puppeteer'

export const URL = 'https://naruto-base.tv/novosti/drugoe_anime_rus'
const TITLE = 'Магическая'

async function findStrInArray(array, str) {
  return array.filter((item) => item.includes(str))
}

export async function parsePage(url) {
  let browser

  try {
    browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)

    const titles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2'), (el) => el.innerText)
    })

    const needTitle = await findStrInArray(titles, TITLE)
    if (!needTitle.length) {
      console.log('not found')
      return ['Not found']
    }
    console.log('needTitle:', needTitle)

    return needTitle
  } catch (error) {
    console.error('Произошла ошибка:', error)
    throw error // rethrow the error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
