import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import { IComments } from "../../models/Interfaces";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  inline: {
    display: "inline",
    wordBreak: "break-word",
  },
}));

export const Comments = ({ comments }: IComments) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {comments.map((comment) => {
        return comment.author ? (
          <List className={classes.root} key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={comment.author} className={classes.orange}>
                  {comment.author.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.author}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      {" "}
                      {comment.score} point
                      {comment.score > 1 || comment.score < -1 ? "s" : ""} • 10
                      hrs time ago
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.body}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ) : null;
      })}
    </React.Fragment>
  );
};

export default Comments;
