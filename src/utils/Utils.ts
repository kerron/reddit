import { COUNT_ABBRIVIATION } from "../constants/Constants";
import {
  IPost,
  IHandlePostsResponse,
  IHandleSinglePostResponse,
  IComment,
  IAllAwardings,
} from "../models/Interfaces";
import moment from "moment";

export const round = (count: number, precision: number) => {
  const prec = Math.pow(10, precision);
  return Math.round(count * prec) / prec;
};

export const formatNumber = (count: number) => {
  const base = Math.floor(Math.log(Math.abs(count)) / Math.log(1000));
  const suffix = COUNT_ABBRIVIATION[Math.min(2, base - 1)];
  const base_suffix = COUNT_ABBRIVIATION.indexOf(suffix) + 1;
  const precision = count > 100000 ? 0 : 1;
  return suffix
    ? round(count / Math.pow(1000, base_suffix), precision) + suffix
    : count;
};

export const processPostOverviewResponse = (
  response: any
): Array<IPost> | null => {
  if (!response.data.children) {
    return null;
  }
  const after = response.data.after;

  return response.data.children.map((child: any) => {
    const allAwardings = processAwardResponse(child.data.all_awardings);
    return {
      id: child.data.id,
      allAwardings: allAwardings,
      author: child.data.author,
      title: child.data.title,
      createdUtc: child.data.created,
      over18: child.data.over_18,
      url: child.data.url,
      ups: child.data.ups,
      numComments: child.data.num_comments,
      subreddit: child.data.subreddit,
      after,
    };
  });
};

export const processCommentResponse = (
  response: any
): Array<IComment> | null => {
  if (!response.data.children) {
    return null;
  }
  return response.data.children.map((child: any) => {
    const allAwardings = processAwardResponse(child.data.all_awardings);

    return {
      id: child.data.id,
      allAwardings: allAwardings,
      author: child.data.author,
      body: child.data.body,
      createdUtc: child.data.created,
      ups: child.data.ups,
      score: child.data.score,
    };
  });
};

export const processAwardResponse = (response: any): Array<IAllAwardings> => {
  return response
    ? response.map((award: any) => ({
        id: award.id,
        count: award.count,
        iconUrl: award.icon_url,
        description: award.description,
      }))
    : [];
};

export const handlePostsResponse = ({
  controller,
  response,
}: IHandlePostsResponse) => {
  // to handle api abortion, I simply return null
  if (controller.signal.aborted) {
    return null;
  }
  // check if status code was OK
  // if it is, process and return data
  if (response.ok) {
    return response.json().then((rawResponse) => {
      return processPostOverviewResponse(rawResponse);
    });
  } else {
    // TODO: handle error
    return null;
  }
};

export const handleSinglePostResponse = ({
  controller,
  response,
}: IHandleSinglePostResponse) => {
  // to handle api abortion, I simply return null
  if (controller.signal.aborted) {
    return null;
  }
  // check if status code was OK
  // if it is, process and return data
  if (response.ok) {
    return response.json().then((rawResponse) => {
      const post = processPostOverviewResponse(rawResponse[0]);
      const comments = processCommentResponse(rawResponse[1]);

      return [post, comments];
    });
  } else {
    // TODO: handle error
    return null;
  }
};

export const formatUtcTime = (time: number) => {
  return moment.unix(time).utc().fromNow();
};
