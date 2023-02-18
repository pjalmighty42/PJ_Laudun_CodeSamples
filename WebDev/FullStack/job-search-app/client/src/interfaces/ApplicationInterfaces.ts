interface RoleInterface {
  id: string;
  name: string;
  url: string;
}

export default interface ApplicationInterface {
  id: string;
  companyName: string;
  dateApplied: string;
  role: RoleInterface;
  status: string;
  submittedResume: boolean;
  resumeViewed: boolean;
  contacted1stCall: boolean;
  techInterview: boolean;
  interview3: boolean;
  interview4: boolean;
  jobOffered: boolean;
}
