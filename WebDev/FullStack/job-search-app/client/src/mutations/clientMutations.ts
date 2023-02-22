import { gql } from "@apollo/client";

const DELETE_APP = gql`
  mutation deleteApplication($id: ID!) {
    deleteApplication(id: $id) {
      id
      companyName
      dateApplied
      status
      role {
        id
        name
        url
      }
      submittedResume
      contacted1stCall
      techInterview
      interview3
      interview4
      jobOffered
    }
  }
`;
/*
const UPDATE_APP = gql`
  mutation updateApplication($app: ){
    updateApplication(app: $app) {
       id
      companyName
      dateApplied
      status
      role {
        id
        name
        url
      }
      submittedResume
      contacted1stCall
      techInterview
      interview3
      interview4
      jobOffered
    }
  }
`;
*/

export { DELETE_APP };
