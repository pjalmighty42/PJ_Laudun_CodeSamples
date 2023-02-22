const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLEnumType,
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
    interview3: { type: GraphQLBoolean },
    interview4: { type: GraphQLBoolean },
    jobOffered: { type: GraphQLBoolean },
  }),
});

//Getters
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
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Application.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addApplication: {
      type: ApplicationType,
      args: {
        companyName: { type: new GraphQLNonNull(GraphQLString) },
        dateApplied: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLNonNull(
            new GraphQLEnumType({
              name: "ApplicationStatus",
              values: {
                active: { value: "Active" },
                hold: { value: "On Hold" },
                rejected: { value: "Rejected" },
              },
            })
          ),
          defaultValue: "Active",
        },
        submittedResume: { type: new GraphQLNonNull(GraphQLBoolean) },
        roleName: { type: GraphQLString },
        roleUrl: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Application.create({
          companyName: args.companyName,
          dateApplied: args.dateApplied,
          status: args.status,
          role: {
            name: args.roleName,
            url: args.roleUrl,
          },
          submittedResume: args.submittedResume,
        });
      },
    },
    deleteApplication: {
      type: ApplicationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Application.findByIdAndRemove(args.id);
      },
    },
    updateApplication: {
      type: ApplicationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        companyName: { type: GraphQLString },
        dateApplied: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ApplicationStatusUpdate",
            values: {
              active: { value: "Active" },
              hold: { value: "On Hold" },
              rejected: { value: "Rejected" },
            },
          }),
        },
        submittedResume: { type: GraphQLBoolean },
        roleName: { type: GraphQLString },
        roleUrl: { type: GraphQLString },
        resumeViewed: { type: GraphQLBoolean },
        contacted1stCall: { type: GraphQLBoolean },
        techInterview: { type: GraphQLBoolean },
        interview3: { type: GraphQLBoolean },
        interview4: { type: GraphQLBoolean },
        jobOffered: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Application.findByIdAndUpdate(
          args.id,
          {
            $set: { ...args },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
