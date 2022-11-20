const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const schema = require('./schema/schema')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
console.log('connecting to', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer(schema)

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
