const mongoose = require('mongoose')
const uriDb = process.env.DB_HOST || 'mongodb+srv://irvil:KvH4ZtPtR2QHigs8@cluster0.gogg2.mongodb.net/db-contacts?retryWrites=true&w=majority'

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection to db')
})

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Connection for db closed and app termination')
  process.exit(1)
})

module.exports = db
