//Schema define
const e = require("express");
const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/book");


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLID } = graphql;



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
                // return _.find(authors, { id: parent.authorId })
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
                // return books.filter(bk => bk.authorId === parent.id)
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
                // return _.find(books, { id: args.id })
                //resolve is the function that make he query, which means when someone ask for a book, i want you to use id to get it
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
            }
        }
    }
});

// mutation
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                //an save method from mongoDB that save new data to DB and return, so that we can use it 
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})