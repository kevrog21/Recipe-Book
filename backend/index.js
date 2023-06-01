import app from './server.js'
import mongodb from 'mongodb'
// import dotenv from 'dotenv'
// dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

// MongoClient.connect(
//     process.env.ATLAS_URI,
//     {
//         wtimeout: 2500}
// )
// .catch(err => {
//     console.log(err.stack)
//     process.exit(1)
// })
// .then(async client => {
//     app.listen(port, () => {
//         console.log(`listening on port ${port}`)
//     })
// })