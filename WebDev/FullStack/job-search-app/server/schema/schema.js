const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//Mongoose Models
const Application = require("../models/Application");

//Role Type
const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      ref: "Application",
    },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

//Application Type
const ApplicationType = new GraphQLObjectType({
  name: "Application",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    companyName: { type: new GraphQLNonNull(GraphQLString) },
    dateApplied: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: RoleType },
    submittedResume: { type: new GraphQLNonNull(GraphQLBoolean) },
    resumeViewed: { type: GraphQLBoolean },
    contacted1stCall: { type: GraphQLBoolean },
    techInterview: { type: GraphQLBoolean },
    interview2: { type: GraphQLBoolean },
    interview3: { type: GraphQLBoolean },
    interview4: { type: GraphQLBoolean },
    jobOffered: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getApps: {
      type: new GraphQLList(ApplicationType),
      resolve(parent, args) {
        return Application.find();
      },
    },
    getApp: {
      type: ApplicationType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Application.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
