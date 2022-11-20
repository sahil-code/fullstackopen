const Book = require('../models/book')
const Author = require('../models/author')
const { UserInputError, AuthenticationError } = require('apollo-server')

typeDef = `
type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}
extend type Query{
  authorCount: Int!
  allAuthors: [Author!]!
}
extend type Mutation{
  editAuthor(name: String!, setBornTo: Int!): Author
}
`

const resolvers = {
  Query: {
    authorCount: (root, args) => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      return authors
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter((b) => b.author.name === root.name).length
    },
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
  },
}

module.exports = { typeDef, resolvers }
