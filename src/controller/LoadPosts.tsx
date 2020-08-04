import {
  FetchInitialPosts,
  FetchNextPost,
  FetchSinglePost,
} from "../models/FetchPosts";
import {
  IPost,
  ILoadSinglePost,
  ILoadInitialPosts,
  ILoadNextPosts,
} from "../models/Interfaces";
import { handlePostsResponse, handleSinglePostResponse } from "../utils/Utils";

export const loadInitialPosts = async ({
  controller,
  subreddit,
}: ILoadInitialPosts): Promise<Array<IPost> | null> => {
  return FetchInitialPosts({ controller, subreddit })
    .then((response: Response) => {
      return handlePostsResponse({ controller, response });
    })
    .catch((e: Error) => {
      // TODO: handle error
      return null;
    });
};

export const loadNextPosts = async ({
  controller,
  subreddit,
  after,
  count,
}: ILoadNextPosts): Promise<Array<IPost> | null> => {
  return FetchNextPost({ controller, subreddit, after, count })
    .then((response: Response) => {
      return handlePostsResponse({ controller, response });
    })
    .catch((e: Error) => {
      // TODO: handle error
      return null;
    });
};

export const loadSinglePost = async ({
  controller,
  subreddit,
  postId,
}: ILoadSinglePost): Promise<any> => {
  return FetchSinglePost({
    controller,
    subreddit,
    postId,
  })
    .then((response: Response) => {
      return handleSinglePostResponse({
        controller,
        response,
      });
    })
    .catch((e: Error) => {
      // TODO: handle error
      console.log(e);
      return null;
    });
};
