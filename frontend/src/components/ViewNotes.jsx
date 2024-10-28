import React from "react";

function ViewNote({ notes, handleDelete, openEditModal }) {
  return (
    <div style={{ width: "200px" }}>
      <table>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Task</th>
            <th style={{ border: "1px solid black" }}>Status</th>
            <th style={{ border: "1px solid black" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ border: "1px solid black" }}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <tr key={note._id}>
                <td style={{ border: "1px solid black" }}>{note.task}</td>
                <td style={{ border: "1px solid black" }}>{note.status}</td>
                <td style={{ border: "1px solid black" }}>
                  <button onClick={() => openEditModal(note._id)}>Edit</button>
                  <button onClick={() => handleDelete(note._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                style={{ border: "1px solid black", textAlign: "center" }}
                colSpan="3"
              >
                No Saved Tasks. Please Create One
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewNote;
