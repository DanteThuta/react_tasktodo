import React, { useState, useEffect } from "react";
import "./SingleTask.css";
import { BiEdit } from "react-icons/bi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

const SingleTask = ({
  addedTask,
  setAddedTask,
  toggleToDo,
  editToDo,
  isEdit,
  deleteTask,
}) => {
  const [status, setStatus] = useState("all");
  const [filteredTask, setFilteredTask] = useState([]);

  const statusHandler = (e) => {
    // console.log(e.target.value);
    setStatus(e.target.value);
  };

  const filterChange = (e) => {
    switch (status) {
      case "complete":
        setFilteredTask(addedTask.filter((task) => task.complete === true));
        break;
      case "incomplete":
        setFilteredTask(addedTask.filter((task) => task.complete === false));
        break;

      default:
        setFilteredTask(addedTask);
        break;
    }
  };

  //useEffect
  useEffect(() => {
    filterChange();
  }, [addedTask, status]);
  return (
    <>
      <div className="post-container">
        <div className="select-box">
          <select
            onChange={statusHandler}
            className="select-type"
            name=""
            id=""
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        {isEdit ? <input type="text" /> : ""}
        {filteredTask.map((item) => (
          <div key={item.userId} className="user-container">
            <div className="user-task">
              <p
                className={
                  item.complete
                    ? "user-taskheading complete"
                    : "user-taskheading"
                }
              >
                {item.title}
              </p>
              <p className="user-taskinfo">
                <span className="user-taskinfo-label">Notes:</span> {item.body}
              </p>
            </div>
            <div className="btn-section">
              <button className="btn" onClick={() => toggleToDo(item.userId)}>
                <HiOutlineSwitchHorizontal className="btn-icon" />
              </button>
              <button className="btn" onClick={() => editToDo(item.userId)}>
                <BiEdit className="btn-icon" />
              </button>
              <button className="btn" onClick={() => deleteTask(item.userId)}>
                <AiOutlineDelete className="btn-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleTask;
