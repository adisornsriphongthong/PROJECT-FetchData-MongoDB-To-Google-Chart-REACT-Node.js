import express from 'express'
import { run } from './database.mjs'
import cors from 'cors'
const app = express()
app.use(cors())
const port = 3000


app.get('/years/:year',  async (req, res) => {
    const years = req.params.year

    if(years == '2023') {
        await run(res, years)
        console.log(years)
    } else {
        await run(res, years)
        console.log(years)
    }
})

app.listen(port, (err) => {
    if(err) throw err
    console.log('The server is running on port ' + port)
})