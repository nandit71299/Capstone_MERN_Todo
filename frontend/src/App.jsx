import { useEffect, useState } from "react";
import ViewNote from "./components/viewNotes";
import CreateNote from "./components/CreateNote";
import axios from "axios";
import Modal from "react-modal";
function App() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState({
    id: "",
    task: "",
    status: "",
  });

  const createNote = (data) => {
    const payload = {
      task: data.todoTitle,
      status: data.todoStatus,
    };
    console.log(data);
    axios.post("http://localhost:3000/api/note", payload).then((response) => {
      response.data.success
        ? setNotes([...notes, response.data.note])
        : setError(response.data.message);
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/notes/${id}`) // Ensure the correct endpoint
      .then((response) => {
        if (response.data.success) {
          // Update this line to compare against _id instead of id
          setNotes(notes.filter((note) => note._id !== id)); // Use _id
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openEditModal = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/note/${id}`);
      if (response.data.success) {
        const note = {
          id: response.data.note._id,
          status: response.data.note.status,
          task: response.data.note.task,
        };
        setEditNote(note);
        setIsModalOpen(true);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateNote = async () => {
    try {
      console.log(editNote);
      const response = await axios.put(
        `http://localhost:3000/api/note/${editNote.id}`,
        editNote
      );
      if (response.data.success) {
        setNotes(
          notes.map((note) =>
            note._id === response.data.note._id ? response.data.note : note
          )
        );
        setIsModalOpen(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const response = async () => {
      axios
        .get("http://localhost:3000/api/notes")
        .then((response) => {
          response.data.success
            ? setNotes(response.data.notes)
            : setError(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    response();
  }, []);
  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div>
          <h2>Edit Note</h2>
          <input
            type="text"
            value={editNote.task}
            onChange={(e) => setEditNote({ ...editNote, task: e.target.value })}
          />
          <input
            type="text"
            value={editNote.status}
            onChange={(e) =>
              setEditNote({ ...editNote, status: e.target.value })
            }
          />
          <div style={{ display: "flex" }}>
            <button onClick={() => updateNote()}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      </Modal>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <ViewNote
            notes={notes}
            handleDelete={handleDelete}
            openEditModal={openEditModal}
          />
        </div>
        <div>
          <CreateNote createNote={createNote} />
        </div>
      </div>
      {error.length > 0 && <p>{error}</p>}
    </>
  );
}

export default App;
