import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { IEntryHeader, IAllAwardings } from "../../models/Interfaces";
import { formatUtcTime } from "../../utils/Utils";

const useStyles = makeStyles({
  author: {
    fontSize: 14,
    flex: "2 1 auto",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export const EntryHeader = (post: IEntryHeader) => {
  const classes = useStyles();

  return (
    <Box className={classes.infoContainer} key={`${post.id}-entry-header`}>
      <Typography className={classes.author} color="textSecondary" gutterBottom>
        Posted by u/{post.author} {formatUtcTime(post.createdUtc)}
      </Typography>
      <Box display="flex" justifyContent="center" ml={1}>
        {!post.allAwardings
          ? null
          : post.allAwardings.map((award: IAllAwardings) => (
              <Box mr={1} key={award.id} display="flex">
                <img
                  alt={award.iconUrl}
                  src={award.iconUrl}
                  width={16}
                  height={16}
                />
                <Typography
                  className={classes.author}
                  color="textSecondary"
                  gutterBottom
                >
                  {award.count > 1 ? award.count : null}
                </Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default EntryHeader;
