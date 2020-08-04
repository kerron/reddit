import { IFetchPosts, IFetchNextPost, IFetchSinglePost } from "./Interfaces";

export const FetchInitialPosts = async ({
  controller,
  subreddit,
}: IFetchPosts): Promise<Response> => {
  try {
    // also pass a second paramater which allows me to cancel the request. This abortion
    // happens during the .then callback
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/top.json?t=all`,
      { signal: controller.signal }
    );
    return response;
  } catch (e) {
    // TODO: handle error
    return e;
  }
};

export const FetchNextPost = async ({
  controller,
  subreddit,
  after,
  count,
}: IFetchNextPost): Promise<Response> => {
  try {
    // also pass a second paramater which allows me to cancel the request. This abortion
    // happens during the .then callback
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/top.json?t=all&after=${after}&count=${count}`,
      { signal: controller.signal }
    );
    return response;
  } catch (e) {
    // TODO: handle error
    return e;
  }
};

export const FetchSinglePost = async ({
  controller,
  subreddit,
  postId,
}: IFetchSinglePost): Promise<Response> => {
  try {
    // also pass a second paramater which allows me to cancel the request. This abortion
    // happens during the .then callback
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`,
      { signal: controller.signal }
    );
    return response;
  } catch (e) {
    // TODO: handle error
    return e;
  }
};
