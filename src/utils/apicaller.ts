import axios from 'axios';
import {GraphQLClient} from 'graphql-request';
import {
  Credential,
  GraphQLRequestOptions,
  HttpRequestOptions,
  Urls,
} from './interfaces';

class ApiCaller {
  private static instance: ApiCaller;

  credential: Credential;
  urls: Urls;

  private constructor() {
    this.credential = {session: '', csrftoken: ''};
    this.urls = {
      base: '',
      graphql: '',
      allProblems: '',
      problem: '',
      submit: '',
    };
  }

  setCredential(credential: Credential) {
    this.credential = credential;
  }

  setUrls(urls: Urls) {
    this.urls = urls;
  }

  static getInstance(): ApiCaller {
    if (!ApiCaller.instance) {
      ApiCaller.instance = new ApiCaller();
    }

    return ApiCaller.instance;
  }

  async HttpRequest(options: HttpRequestOptions) {
    return axios.request({
      url: options.url,
      method: options.method,
      headers: {
        LEETCODE_SESSION: this.credential.session,
        csrftoken: this.credential.csrftoken,
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': this.credential.csrftoken,
        Referer: options.referer || this.urls.base,
      },
      data: options.body || '',
    });
  }

  async GraphQLRequest(options: GraphQLRequestOptions) {
    const client = new GraphQLClient(this.urls.graphql, {
      headers: {
        Origin: options.origin || this.urls.base,
        Referer: options.referer || this.urls.base,
        Cookie: `LEETCODE_SESSION=${this.credential.session};csrftoken=${this.credential.csrftoken};`,
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': this.credential.csrftoken,
      },
    });
    return await client.request(options.query, options.variables || {});
  }
}

export default ApiCaller;
