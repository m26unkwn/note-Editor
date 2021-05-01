import React, { useEffect, useState } from "react";

//Importing Material UI and style stuff
import BorderColorIcon from "@material-ui/icons/BorderColor";
import styles from "./styleEditor";
import { withStyles } from "@material-ui/styles";

//Import react Quill
import ReactQuill from "react-quill";
import debounce from "../debounceHelp";

const Editor = (props) => {
  //states
  const [text, setText] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [id, setId] = useState(" ");

  const updateBody = (value) => {
    setText(value);

    update();
  };

  const update = debounce(() => {
    props.noteUpdate(id, {
      title: title,
      body: text,
    });
  }, 1500);

  useEffect(() => {
    setText(props.selectedNote.body);
    setTitle(props.selectedNote.title);
    setId(props.selectedNote.id);
  }, [props.selectedNote]);

  const updateTitle = (txt) => {
    setTitle(txt);
    update();
  };

  const { classes } = props;

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        value={title ? title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <ReactQuill value={text} onChange={updateBody} />
    </div>
  );
};

export default withStyles(styles)(Editor);
