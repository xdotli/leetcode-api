import AuthManager from './lib/authmanager';
import ProblemManager from './lib/problemmanager';
import ApiCaller from './utils/apicaller';
import {Urls} from './utils/interfaces';

const auth = AuthManager.getInstance();
const apiCaller = ApiCaller.getInstance();
const urls: Urls = {
  base: 'https://leetcode.com/',
  graphql: 'https://leetcode.com/graphql',
  allProblems: 'https://leetcode.com/api/problems/all/',
  problem: 'https://leetcode.com/problems/$slug',
  submit: 'https://leetcode.com/problems/$slug/submit/',
};
apiCaller.setUrls(urls);

const problemManager = ProblemManager.getInstance();
(async () => {
  const data = await auth.login();

  const urls: Urls = {
    base: 'https://leetcode.com/',
    graphql: 'https://leetcode.com/graphql',
    allProblems: 'https://leetcode.com/api/problems/all/',
    problem: 'https://leetcode.com/problems/$slug',
    submit: 'https://leetcode.com/problems/$slug/submit/',
  };
  apiCaller.setCredential(data);
  apiCaller.setUrls(urls);

  problemManager.getAllProblems();
})();
