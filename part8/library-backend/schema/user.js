const { UserInputError } = require('apollo-server')
const User = require('../models/user')

require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

typeDef = `
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
extend type Query{
  me: User
}
extend type Mutation{
  createUser(username: String!, favouriteGenre: String!): User
  login(username: String!, password: String!): Token
}
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

module.exports = { typeDef, resolvers }
