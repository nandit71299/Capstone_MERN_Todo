import React, { useState } from "react";

function CreateNote({ createNote }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoStatus, setTodoStatus] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <label>Task:</label>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Task Name"
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={todoStatus}
          onChange={(e) => setTodoStatus(e.target.value)}
          placeholder="Task Status"
        />
      </div>
      <button
        type="button"
        style={{ width: "100%" }}
        onClick={() => {
          todoStatus.length > 0 && todoTitle.length > 0
            ? createNote({ todoStatus, todoTitle })
            : "";
        }}
      >
        Add Task
      </button>
    </div>
  );
}

export default CreateNote;
