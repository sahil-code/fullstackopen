const { gql } = require('apollo-server')

const BookSchema = require('./book')
const AuthorSchema = require('./author')
const UserSchema = require('./user')

const context = require('./context')

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
exports.resolvers = [
  BookSchema.resolvers,
  AuthorSchema.resolvers,
  UserSchema.resolvers,
]
exports.typeDefs = [
  typeDefs,
  BookSchema.typeDef,
  AuthorSchema.typeDef,
  UserSchema.typeDef,
]

exports.context = context
