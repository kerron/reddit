import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Typography } from "@material-ui/core";

import { IPostBody } from "../../models/Interfaces";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  title: {
    fontWeight: 700,
  },
});

export const PostBody = (post: IPostBody) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.title} variant="h6" component="h2">
        {post.title}
      </Typography>
      <CardMedia
        className={classes.media}
        image={post.url}
        title={post.title}
      />
    </React.Fragment>
  );
};

export default PostBody;
