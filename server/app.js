const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema")

const app = express();
//use(router of endpoint, function that handle know how to  handle the graphql request)
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
//listen to specific port in our compurter, which in here is 4000, and fire a callback function
app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})