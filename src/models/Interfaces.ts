export interface IFetchPosts {
  readonly controller: AbortController;
  readonly subreddit: string;
}

export interface IFetchSinglePost {
  readonly controller: AbortController;
  readonly subreddit: string;
  readonly postId: string;
}

export interface IFetchNextPost {
  readonly controller: AbortController;
  readonly subreddit: string;
  readonly after: string | null;
  readonly count: number;
}

export interface ILoadInitialPosts {
  readonly controller: AbortController;
  readonly subreddit: string;
}

export interface ILoadNextPosts {
  readonly controller: AbortController;
  readonly subreddit: string;
  readonly after: string | null;
  readonly count: number;
}

export interface ILoadSinglePost {
  readonly controller: AbortController;
  readonly subreddit: string;
  readonly postId: string;
}

export interface IHandlePostsResponse {
  readonly controller: AbortController;
  readonly response: Response;
}

export interface IHandleSinglePostResponse {
  readonly controller: AbortController;
  readonly response: Response;
}
export interface IAllAwardings {
  readonly id: string;
  readonly count: number;
  readonly iconUrl: string;
  readonly description: string;
}

export interface IPost {
  readonly id: string;
  readonly allAwardings: Array<IAllAwardings> | null;
  readonly author: string;
  readonly title: string;
  readonly createdUtc: number;
  readonly over18: boolean;
  readonly url: string;
  readonly ups: number;
  readonly numComments: number;
  readonly subreddit: string;
  readonly after: string;
}

export interface IComment {
  readonly id: string;
  readonly allAwardings: Array<IAllAwardings> | null;
  readonly author: string;
  readonly body: string;
  readonly createdUtc: number;
  readonly ups: number;
  readonly score: number;
}
export interface IComments {
  readonly comments: Array<IComment>;
}
export interface ISinglePost {
  post: Array<IPost> | null;
}

export interface IEntryCard {
  readonly posts: Array<IPost>;
  readonly isClickable: boolean;
}

export interface IEntryHeader {
  readonly id: string;
  readonly allAwardings: Array<IAllAwardings> | null;
  readonly author: string;
  readonly createdUtc: number;
}

export interface IPostBody {
  readonly title: string;
  readonly url: string;
}

export interface IEntryFooter {
  readonly ups: number;
  readonly numComments: number;
}
