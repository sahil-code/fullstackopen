const Book = require('../models/book')
const Author = require('../models/author')
const { UserInputError, AuthenticationError } = require('apollo-server')

typeDef = `
type Book {
  title: String!
  published: Int
  author: Author!
  id: ID!
  genres: [String!]!
}
extend type Query{
  bookCount: Int!
  allBooks(author: String, genre: String): [Book!]!
}
extend type Mutation{
  addBook(
    title: String!
    published: Int
    author: String!
    genres: [String!]!
  ): Book
}
extend type Subscription{
  bookAdded: Book!
}
`

const resolvers = {
  Query: {
    bookCount: (root, args) => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let params = {}
      if (args.genre) {
        params.genres = { $in: [args.genre] }
      }
      let books = await Book.find(params).populate('author')
      if (args.author) {
        books = books.filter((book) => book.author.name === args.author)
      }
      return books
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const bookexists = await Book.exists({ title: args.title })
      if (bookexists) {
        throw new UserInputError('title must be unique', {
          invalidArgs: args.title,
        })
      }
      let author = await Author.findOne({ name: args.author })
      const authorexists = await Author.exists({ name: args.author })
      if (!authorexists) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const newbook = new Book({ ...args, author: author })
      await newbook.save()
      return newbook
    },
  },
}

module.exports = { typeDef, resolvers }
