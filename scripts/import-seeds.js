const fs = require('fs')
const path = require('path')
const axios = require('axios')

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''

async function postReview(review) {
  const url = `${STRAPI_URL}/api/reviews`
  const body = { data: review }
  const headers = { 'Content-Type': 'application/json' }
  if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`

  try {
    const res = await axios.post(url, body, { headers })
    return { status: res.status, ok: true, data: res.data }
  } catch (err) {
    const status = err.response ? err.response.status : 500
    const text = err.response ? JSON.stringify(err.response.data) : err.message
    return { status, ok: false, text }
  }
}

async function main() {
  const file = path.join(__dirname, '..', 'seeds', 'reviews.json')
  if (!fs.existsSync(file)) {
    console.error('Seeds file not found:', file)
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  console.log(`Found ${data.length} reviews in seeds file.`)

  for (const r of data) {
    try {
      console.log('Posting:', r.slug)
      const res = await postReview(r)
      if (res.ok) {
        console.log('Created:', r.slug)
      } else {
        console.error('Failed:', r.slug, 'status=', res.status, 'body=', res.text)
      }
    } catch (err) {
      console.error('Error posting', r.slug, err.message)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
