import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styleSidebar";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "./SidebarItem";

const Sidebar = (props) => {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const { classes } = props;

  const clickHandler = (e) => {
    setAddingNote(!addingNote);
    setTitle(null);
  };

  const updateTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const newNote = () => {
    props.newNote(title);
    setTitle(null);
    setAddingNote(false);
  };

  const selectNote = (n, i) => {
    props.selectNote(n, i);
  };

  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  return (
    <div className={classes.sidebarContainer}>
      <Button onClick={clickHandler} className={classes.newNoteBtn}>
        {!addingNote ? "NEW NOTE" : "CANCEL"}{" "}
      </Button>
      {addingNote ? (
        <div>
          <input
            type='text'
            className={classes.newNoteInput}
            placeholder='enter note Title'
            onKeyUp={updateTitle}
          />
          {title && (
            <Button className={classes.newNoteSubmitBtn} onClick={newNote}>
              SUBMIT NOTE
            </Button>
          )}
        </div>
      ) : null}
      <List>
        {props.notes.map((note, index) => (
          <div key={index}>
            <SidebarItem
              note={note}
              index={index}
              noteIndex={props.noteIndex}
              selectNote={selectNote}
              deleteNote={deleteNote}
            />
            <Divider style={{ marginTop: "2rem" }}></Divider>
          </div>
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
