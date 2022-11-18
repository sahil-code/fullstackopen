const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
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
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: (root, args) => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let params = {}
      if (args.genre) {
        params.genres = { $in: [args.genre] } 
      }
      let books = await Book.find(params).populate(
        'author'
      )
      if (args.author) {
        books = books.filter((book) => book.author.name === args.author)
      }
      return books
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
    me: (root, args, context) => {
      return context.currentUser
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
