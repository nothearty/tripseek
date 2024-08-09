import axios from "axios"
import * as cheerio from "cheerio"

async function scrapeWebsite(
  baseUrl: string,
  queryParams: Record<string, string>
): Promise<void> {
  try {
    const url = new URL(baseUrl)

    console.log("url1:", url.toString())

    const params = new URLSearchParams(queryParams)

    console.log("params:", params.toString())

    url.search = params.toString()

    console.log("url2", url.toString())

    const { data } = await axios.get(url.toString())
    const $ = cheerio.load(data)

  } catch (error) {
    console.error(`Error scraping the website: ${(error as Error).message}`)
  }
}

const baseUrl = "https://www.airbnb.com/s/homes"
const queryParams = {
  query: "Rome,Italy",
  adults: "2",
  checkin: "2024-07-27",
  checkout: "2024-07-28",
}

scrapeWebsite(baseUrl, queryParams)
