interface RoleInterface {
  id: string;
  name: string;
  url: string;
}

interface ApplicationBaseInterface {
  id: string;
  companyName: string;
  dateApplied: string;
  status: string;
  submittedResume: boolean;
  resumeViewed: boolean;
  contacted1stCall: boolean;
  techInterview: boolean;
  interview3: boolean;
  interview4: boolean;
  jobOffered: boolean;
}

interface ApplicationInterface {
  id: string;
  companyName: string;
  dateApplied: string;
  status: string;
  role: RoleInterface;
  submittedResume: boolean;
  resumeViewed: boolean;
  contacted1stCall: boolean;
  techInterview: boolean;
  interview3: boolean;
  interview4: boolean;
  jobOffered: boolean;
}

export type { ApplicationBaseInterface, RoleInterface, ApplicationInterface };
