import React from "react";
import { loadInitialPosts, loadNextPosts } from "../../controller/LoadPosts";
import { IPost } from "../../models/Interfaces";
import EntryCard from "../entryCard/EntryCard";
import Loading from "../loading/Loading";
import { DEFAULT_ENDPOINT } from "../../constants/Constants";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

export const Entries = () => {
  const [posts, setPosts] = React.useState<Array<IPost> | null>(null);
  const [postCount, setPostCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loadMorePosts = async () => {
    setIsLoading(true);
    // AbortController makes it possible to cancel a previous api resquest if
    // a new request is made before the other one returns (of does not return).
    const abortController = new AbortController();
    if (postCount) {
      const after = posts ? posts[posts.length - 1].after : null;
      const nextPosts = await loadNextPosts({
        controller: abortController,
        subreddit: DEFAULT_ENDPOINT,
        after,
        count: postCount,
      });
      setPosts((prevPosts) =>
        prevPosts ? prevPosts.concat(nextPosts || []) : nextPosts
      );
    } else {
      const intialPosts = await loadInitialPosts({
        controller: abortController,
        subreddit: DEFAULT_ENDPOINT,
      });

      setPosts(intialPosts);
    }

    setPostCount((prevPostCount) => prevPostCount + 25);
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePosts}
        hasMore={!isLoading}
        threshold={1000}
        loader={<Loading />}
      >
        {posts ? <EntryCard posts={posts} isClickable={true} /> : <Loading />}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default withRouter(Entries);
