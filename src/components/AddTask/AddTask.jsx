import React, { useState, useEffect } from "react";
import "./AddTask.css";

const AddTask = ({
  addTask,
  addedTask,
  setAddedTask,
  editData,
  setEditData,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  // console.log(editData.userId);

  const updateTask = (title, body, userId, complete) => {
    const newToDo = addedTask.map((item) =>
      item.userId === userId ? { title, complete, body, userId } : item
    );
    console.log(newToDo);
    setAddedTask(newToDo);
    setEditData("");
  };

  const handleSubmit = (e) => {
    if (!editData) {
      e.preventDefault();
      addTask({ newTitle, newBody });

      setNewTitle("");
      setNewBody("");
    } else {
      e.preventDefault();
      updateTask(newTitle, newBody, editData.userId, editData.complete);
      setNewTitle("");
      setNewBody("");
    }
  };

  return (
    <div className="add-container">
      <form className="form-type" onSubmit={handleSubmit}>
        <div className="form-headingsection">
          <h3>
            Add Your Posts here:<span className="cursor">|</span>
          </h3>
        </div>
        <input
          className="input-type"
          type="text"
          value={newTitle}
          placeholder="Enter Your Task"
          // ref={inputRef}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          className="input-type"
          type="text"
          value={newBody}
          placeholder="Enter Detail"
          onChange={(e) => setNewBody(e.target.value)}
        />

        <button className="btn-type">{editData ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default AddTask;
