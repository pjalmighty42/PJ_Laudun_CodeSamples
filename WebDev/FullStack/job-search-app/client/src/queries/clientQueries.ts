import { gql } from "@apollo/client";

const GET_APPLICATIONS = gql`
  query getApps {
    getApps {
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
      resumeViewed
      contacted1stCall
      techInterview
      interview3
      interview4
      jobOffered
    }
  }
`;

export { GET_APPLICATIONS };
