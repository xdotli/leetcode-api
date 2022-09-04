interface HttpRequestOptions {
  method: string;
  url: string;
  referer?: string;
  body?: object;
}

interface GraphQLRequestOptions {
  origin?: string;
  referer?: string;
  query: string;
  variables?: object;
}

interface Credential {
  session: string;
  csrftoken: string;
}

interface Urls {
  base: string;
  graphql: string;
  allProblems: string;
  problem: string;
  submit: string;
}

interface Problem {
  slug: string;
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  starred: boolean;
  locked: boolean;
  likes: number;
  dislikes: number;
  status: ProblemStatus;
  tag: Array<string>;
  totalAccepted: number;
  totalSubmission: number;
  sampleTestCase: string;
  content: string;
  codeSnippets: Array<any>;
}

enum ProblemStatus {
  'Accept',
  'Not Accept',
  'Not Start',
}

enum ProblemDifficulty {
  'Easy',
  'Medium',
  'Hard',
}

enum SubmissionStatus {
  'Accepted',
  'Compile Error',
  'Wrong Answer',
  'Time Limit Exceeded',
}

export {
  HttpRequestOptions,
  GraphQLRequestOptions,
  Credential,
  Urls,
  Problem,
  ProblemStatus,
  ProblemDifficulty,
  SubmissionStatus,
};
