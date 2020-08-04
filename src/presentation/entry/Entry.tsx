import React from "react";
import { useParams } from "react-router-dom";
import { loadSinglePost } from "../../controller/LoadPosts";
import Loading from "../loading/Loading";
import EntryCard from "../entryCard/EntryCard";
import Comments from "../comments/Comments";

export const Entry = () => {
  const [post, setPost] = React.useState<any>([]);
  const [comments, setComments] = React.useState<any>([]);
  const { subreddit, postId } = useParams();

  React.useEffect(() => {
    // AbortController makes it possible to cancel a previous api resquest if
    // a new request is made before the other one returns (of does not return).
    const abortController = new AbortController();
    (async function awaitSinglePosts() {
      const content = await loadSinglePost({
        controller: abortController,
        subreddit,
        postId,
      });
      setPost(content[0]);
      setComments(content[1]);
    })();
  }, [subreddit, postId]);

  return (
    <React.Fragment>
      {post === null || post.length === 0 ? (
        <Loading />
      ) : (
        <React.Fragment>
          <EntryCard posts={post} isClickable={false} />
          <Comments comments={comments} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Entry;
