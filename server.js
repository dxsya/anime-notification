import express from 'express'
import { parsePage, URL } from './index.js'
const app = express()
const port = 3000

process.on('uncaughtException', function (err) {
  console.log(err)
})

// const parsed = parsePage(URL).then((data) => data)

app.get('/', async (req, res) => {
  try {
    const parsedData = await parsePage(URL)
    console.log('parsed:', parsedData)
    res.status(200).json({ result: 'Anime', data: parsedData })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`)
})
