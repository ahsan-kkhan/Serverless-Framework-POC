import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLList
  } from 'graphql'

import badgesService from '../services/index'
import { v4 } from "uuid";

// let Badges={};
const Badges = new GraphQLObjectType({
    name: 'Badges',
    fields: {
        badgeTitle: { type: GraphQLString },
        badgeImage: { type: GraphQLString },
        badgeId: { type: GraphQLString },
        badgeStatus: { type: GraphQLString },
        isAdmin:{ type: GraphQLBoolean },
    }
});

let schema ={}
  export default  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType', 
      fields: {
        getAllBadges: {
            type: new GraphQLList(Badges),
            resolve: (parent, args) => badgesService.getAllBadges()
          },
        getBadges: {
            args: {
                badgeId:{ type: new GraphQLNonNull(GraphQLString) },
              },
            type: Badges,
            resolve: (parent, args) => badgesService.getBadges(args.badgeId)
        }
      }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType', 
        fields: {
          createBadges: {
            args: {
              badgeId:{ type: new GraphQLNonNull(GraphQLString), defaultValue: v4() },
              badgeTitle:{  type: new GraphQLNonNull(GraphQLString) },
              badgeImage:{  type: new GraphQLNonNull(GraphQLString) },
              badgeStatus:{  type: new GraphQLNonNull(GraphQLString) },
              isAdmin: {  type: GraphQLBoolean , defaultValue:true },
            },
            type: Badges,
            resolve: (parent, args) => badgesService.createBadges(args)
          },
          updateBadges: {
            args: {
              badgeId:{ type: new GraphQLNonNull(GraphQLString)},
              badgeTitle:{  type: new GraphQLNonNull(GraphQLString) },
              badgeImage:{  type: new GraphQLNonNull(GraphQLString) },
              badgeStatus:{  type: new GraphQLNonNull(GraphQLString) },
              isAdmin: {  type: GraphQLBoolean , defaultValue:true },
            },
            type: Badges,
            resolve: (parent, args) => badgesService.updateBadges(args.badgeId, args)
          },
          deleteBadges: {
            args: {
              badgeId:{ type: new GraphQLNonNull(GraphQLString)}
            },
            type: Badges,
            resolve: (parent, args) => badgesService.deleteBadges(args.badgeId)
          },
        }
      })
  })
   
  // We want to make a GET request with ?query=<graphql query>
  // The event properties are specific to AWS. Other providers will differ.
//   module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
//     .then(
//       result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
//       err => callback(err)
//     )