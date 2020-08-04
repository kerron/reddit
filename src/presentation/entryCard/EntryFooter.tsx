import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { IEntryFooter } from "../../models/Interfaces";
import { formatNumber } from "../../utils/Utils";
const useStyles = makeStyles({
  cardAction: {
    fontSize: 14,
    fontWeight: 700,
  },
});

export const EntryFooter = (post: IEntryFooter) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography
        className={classes.cardAction}
        variant="body1"
        color="textSecondary"
      >
        {formatNumber(post.ups)}
      </Typography>
      <Typography
        className={classes.cardAction}
        variant="body1"
        color="textSecondary"
      >
        {formatNumber(post.numComments)} Comment
        {post.numComments > 1 ? "s" : ""}
      </Typography>
    </React.Fragment>
  );
};

export default EntryFooter;
