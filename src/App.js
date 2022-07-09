import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

//components
import Navbar from "./components/Navbar/Navbar";
import SingleTask from "./components/SingleTask/SingleTask";
import AddTask from "./components/AddTask/AddTask";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(false);
  const [addedTask, setAddedTask] = useState(() => {
    const localData = localStorage.getItem("addedTask");
    return localData ? JSON.parse(localData) : [];
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState("");

  const addTask = ({ newTitle, newBody }) => {
    let newId = uuid();
    console.log(newId);
    let newInput = [
      ...addedTask,
      {
        userId: newId,
        title: newTitle,
        body: newBody,
        complete: false,
      },
    ];
    setAddedTask(newInput);
  };

  //Delete Task
  const deleteTask = (id) => {
    const newTask = addedTask.filter((task) => {
      return task.userId != id;
    });
    setAddedTask(newTask);
    console.log("delete task work");
  };

  const toggleToDo = (userId) => {
    let updatedTodos = addedTask.map((item) => {
      if (item.userId === userId) {
        item.complete = !item.complete;
      }
      return item;
    });
    setAddedTask(updatedTodos);
  };

  const editToDo = (userId) => {
    const findEdit = addedTask.find((data) => data.userId === userId);
    setEditData(findEdit);
  };

  useEffect(() => {
    localStorage.setItem("addedTask", JSON.stringify(addedTask));
  }, [addedTask]);
  return (
    <div className="App">
      <Navbar />
      <AddTask
        addTask={addTask}
        addedTask={addedTask}
        setAddedTask={setAddedTask}
        editData={editData}
        setEditData={setEditData}
      />
      <SingleTask
        addedTask={addedTask}
        setAddedTask={setAddedTask}
        toggleToDo={toggleToDo}
        editToDo={editToDo}
        isEdit={isEdit}
        editData={editData}
        setEditData={setEditData}
        deleteTask={deleteTask}
      />
      <Footer />
    </div>
  );
}

export default App;
