import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styleSidebarItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../debounceHelp";

const SidebarItem = (props) => {
  const selectNote = (n, i) => props.selectNote(n, i);
  const deleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete the ${note.title}`)) {
      props.deleteNote(note);
    }
  };

  return (
    <div key={props.index}>
      <ListItem
        className={props.classes.listItem}
        selected={props.noteIndex === props.index}
        alignItems='flex-start'>
        <div
          className={props.classes.textSection}
          onClick={() => selectNote(props.note, props.index)}>
          <ListItemText
            primary={props.note.title}
            secondary={removeHTMLTags(
              props.note.body.substring(0, 30) + "...."
            )}></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => deleteNote(props.note)}
          className={props.classes.deleteIcon}></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItem);
