import ApiCaller from '../utils/apicaller';

class ProblemManager {
  private apiCaller: ApiCaller;

  private static instance: ProblemManager;

  private constructor() {
    this.apiCaller = ApiCaller.getInstance();
  }

  static getInstance() {
    if (!ProblemManager.instance) {
      ProblemManager.instance = new ProblemManager();
    }

    return ProblemManager.instance;
  }

  async getAllProblems(
    slug: string,
    filter: object,
    limit: number,
    skip: number
  ) {
    return await this.apiCaller.GraphQLRequest({
      query: `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            id
            slug
          }
          hasSolution
          hasVideoSolution
        }
      }
    }
        `,
      variables: {
        categorySlug: slug,
        filters: filter,
        limit: limit,
        skip: skip,
      },
    });
  }
}

export default ProblemManager;
