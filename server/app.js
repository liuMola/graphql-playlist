const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const url = "mongodb+srv://nose:123789456@graphql.so9p8.mongodb.net/GraphQL?retryWrites=true&w=majority"

mongoose
    .connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.log("Error: ", err.message));
const app = express();
//use(router of endpoint, function that handle know how to handle the graphql request)
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
//listen to specific port in our compurter, which in here is 4000, and fire a callback function
app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})
