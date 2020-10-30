//Schema define
const e = require("express");
const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt } = graphql;

var books = [
    { name: "dasd", genre: "asd", id: "1" },
    { name: "dwwwasd", genre: "aaaaasd", id: "2" },
    { name: "daqqqqsd", genre: "addddsd", id: "3" }
];

var authors = [
    { name: "daaasd", age: 1023, id: "1" },
    { name: "dwwwasosd sd", age: 132190, id: "2" },
    { name: "d1plpqqsd", age: 88995, id: "3" }
]

//Book and author types
const BookType = new GraphQLObjectType({
    name: "Book",
    //passed a function, so the things inside of function can recognize each other
    fields: () => ({
        //Define what kind of type they are. and since we're using graphQL, it doesn't know what string is, so we grab (require) them from lib, which is graphQL.
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})