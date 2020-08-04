import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardActions, CardContent, Link } from "@material-ui/core";
import { IEntryCard, IPost } from "../../models/Interfaces";
import EntryHeader from "./EntryHeader";
import EntryFooter from "./EntryFooter";
import PostBody from "./PostBody";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export const EntryCard = ({ posts, isClickable }: IEntryCard) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {posts.map((post: IPost) => {
        return post.over18 ? null : (
          <LazyLoad height={500} offset={100} once={true}>
            <Box className={classes.root} mb={2} key={post.id}>
              <Card variant="outlined">
                <CardContent>
                  <EntryHeader
                    id={post.id}
                    allAwardings={post.allAwardings}
                    author={post.author}
                    createdUtc={post.createdUtc}
                  />
                  {isClickable ? (
                    <Link
                      color="inherit"
                      href={`/r/${post.subreddit}/${post.id}`}
                      underline="none"
                    >
                      <PostBody title={post.title} url={post.url} />
                    </Link>
                  ) : (
                    <PostBody title={post.title} url={post.url} />
                  )}
                </CardContent>
                <CardActions>
                  <EntryFooter ups={post.ups} numComments={post.numComments} />
                </CardActions>
              </Card>
            </Box>
          </LazyLoad>
        );
      })}
    </React.Fragment>
  );
};

export default EntryCard;
