//Schema define
const e = require("express");
const graphql = require("graphql");
const _ = require("lodash");


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLID } = graphql;

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

// Book and author types
const BookType = new GraphQLObjectType({
    name: "Book",
    //passed a function, so the things inside of function can recognize each other
    fields: () => ({
        //Define what kind of type they are. and since we're using graphQL, it doesn't know what string is, so we grab (require) them from lib, which is graphQL.
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            //not just a book, but a list of books, so we gotta use GraphQLList from graphql
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(bk => bk.authorId === parent.id)
            }
        }
    })
});


//root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
                //resolve is the function that make he query, which means when someone ask for a book, i want you to use id to get it
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})