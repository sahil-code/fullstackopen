const { gql } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const BookSchema = require('./book')
const AuthorSchema = require('./author')
const UserSchema = require('./user')

const rootTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`

const resolvers = [
  BookSchema.resolvers,
  AuthorSchema.resolvers,
  UserSchema.resolvers,
]
const typeDefs = [
  rootTypeDefs,
  BookSchema.typeDef,
  AuthorSchema.typeDef,
  UserSchema.typeDef,
]

module.exports = makeExecutableSchema({ typeDefs, resolvers })
