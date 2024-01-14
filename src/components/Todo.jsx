import React, { useState, useEffect } from "react";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedData = localStorage.getItem("todoData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(data));
  }, [data]);

  const addData = () => {
    if (!inputData) {
      alert("You must write something");
    } else {
      if (editIndex !== null) {
        const newData = [...data];
        newData[editIndex] = { text: inputData, completed: false };
        setData(newData);
        setEditIndex(null);
      } else {
        setData([...data, { text: inputData, completed: false }]);
      }

      setInputData("");
    }
  };

  const deleteData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setInputData(data[index].text);
  };

  const clearAll = () => {
    setData([]);
    setInputData("");
    setEditIndex(null);
  };

  const toggleCompletion = (index) => {
    const newData = [...data];
    newData[index].completed = !newData[index].completed;
    setData(newData);
  };

  const clearCompleted = () => {
    const newData = data.filter((task) => !task.completed);
    setData(newData);
  };

  const filteredData = data.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <>
      <div className="app-wrapper">
        <h1 className="app-heading">TO DO LIST</h1>
        <div className="app">
          <div className="input-group">
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              type="text"
              placeholder="Enter Your Text..."
            />
            <button onClick={addData} className="add-btn">
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
          <div className="filters">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div>
          <table className="table">
            {filteredData.map((task, i) => {
              return (
                <tr key={i} className={task.completed ? "completed completed-task" : ""}>
                  <th>{i + 1}</th>
                  <td>{task.text}</td>
                  <td>
                    <div className="icon-wrapper">
                      <i
                        className="ri-edit-line icon"
                        onClick={() => startEdit(i)}
                      ></i>
                    </div>
                  </td>
                  <td>
                    <div className="icon-wrapper">
                      <i
                        className={
                          task.completed
                            ? "ri-checkbox-fill icon"
                            : "ri-checkbox-blank-line icon"
                        }
                        onClick={() => toggleCompletion(i)}
                      ></i>
                    </div>
                  </td>
                  <td>
                    <div className="icon-wrapper">
                      <i
                        className="ri-delete-bin-line icon"
                        onClick={() => deleteData(i)}
                      ></i>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="app-button">
            <button onClick={clearCompleted} className="clear-btn">
              Clear Completed
            </button>
            <button onClick={clearAll} className="clear-btn">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
