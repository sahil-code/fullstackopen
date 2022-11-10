const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()
const jwt = require('jsonwebtoken')

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

const typeDefs = gql`
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: (root, args) => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let params = {}
      if (args.author) {
        params.author = args.author
      }
      if (args.genre) {
        params.genre = { $in: [args.genre] }
      }
      let booksFiltered = await Book.find(params).populate('author')
      return booksFiltered
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      const authorsToReturn = authors.map((a) => ({
        ...a._doc,
        id: a._doc._id,
        bookCount: books.filter((b) => b.author.name === a.name).length,
      }))
      return authorsToReturn
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
