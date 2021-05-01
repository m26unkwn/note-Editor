import { useEffect, useState } from "react";
import "./App.css";
import { fireStore } from "./firebase/config";
import Editor from "./screens/Editor";
import Sidebar from "./screens/Sidebar";
function App() {
  const [noteIndex, setNoteIndex] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fireStore.collection("notes").onSnapshot((snap) => {
      const notes = snap.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      setNotes(notes);
    });
  }, [setNotes]);

  const selectNote = (n, i) => {
    setNoteIndex(i);
    setSelectedNote(n);
  };

  const noteUpdate = (id, noteObj) => {
    fireStore.collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
    });
  };

  const newNote = async (title) => {
    const note = {
      title: title,
      body: " ",
    };
    const newFromDB = await fireStore.collection("notes").add({
      title: note.title,
      body: note.body,
    });
    const newId = newFromDB.id;
    setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(
      notes.filter((note) => note.id === newId)[0]
    );
    setSelectedNote(notes[newNoteIndex]);
    setNoteIndex(newNoteIndex);
  };

  const deleteNote = (note) => {
    const noteIndex1 = notes.indexOf(note);
    setNotes(notes.filter((_note) => _note !== note));
    if (noteIndex === noteIndex1) {
      setSelectedNote(null);
      setNoteIndex(null);
    } else {
      notes.length > 1
        ? selectNote(notes[noteIndex - 1], noteIndex - 1)
        : setNoteIndex(null);
      setSelectedNote(null);
    }

    fireStore.collection("notes").doc(note.id).delete();
  };

  if (notes) {
    return (
      <div className='app-container'>
        <Sidebar
          notes={notes}
          noteIndex={noteIndex}
          selectNote={selectNote}
          newNote={newNote}
          deleteNote={deleteNote}
        />
        {selectedNote ? (
          <Editor
            noteUpdate={noteUpdate}
            notes={notes}
            selectedNote={selectedNote}
            noteIndex={noteIndex}
          />
        ) : null}
      </div>
    );
  } else {
    return <></>;
  }
}

export default App;
