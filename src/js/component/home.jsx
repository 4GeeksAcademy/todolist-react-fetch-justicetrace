import React, { useEffect } from "react";
import { useState } from "react";
import { deleteTasks, addTasks, fetchTasks, deleteAll, handleCreateUser } from "../updateAPI";


//create your first component
const Home = () => {

	const [tasks, setTasks] = useState([]);
	const [newTasks, setNewTasks] = useState("");

    useEffect(() => {
        fetchTasks(setTasks);
    }, []);

  const handleAddTasks = (e) => {
    if (e.key === "Enter" && newTasks.trim() !== "") {
        const newTodo = {
            id: Date.now(),
            label: newTasks.trim(),
            done: false
        };
        setTasks([...tasks, newTodo]);

        addTasks(tasks, newTasks.trim(), setTasks)
          .then(() => {
            console.log("new todo added to API:" + newTodo.label);
          })
          .catch ((error) => {
            console.error("Error adding to API:", error);
          });
        setNewTasks("");


    }
  };
  const handleDeleteTasks = (index) => {
    const taskId = tasks[index].id;
    const taskLabel = tasks[index].label;
    const updatedTasks = tasks.filter((task, i) => index !== i);
    setTasks(updatedTasks);
    console.log("Tasks DELETED from API: " + taskLabel);

    deleteTasks(taskId, setTasks)
  }

  const handleDeleteAll = () => {
    setTasks([]);
    deleteAll(setTasks);
  }
  const handleAddUser = () => {
    handleCreateUser(setTasks);
    alert("New User Added");
  }

	return (
		<div className="container bg-light my-4">
			<h1 className="text-info d-flex justify-content-center p-3">To Do List</h1>
			<ul>
				<li>
					<input type="text"
					placeholder="What do we have to accomplish?"
					onChange={(e) => setNewTasks(e.target.value)}
					value={newTasks}
                    onKeyDown={handleAddTasks}
					/>
				</li>
				{tasks.map((item, index) => (
					<li key={item.id} className="d-flex justify-content-between align-item-center px-3">
						{item.label}
						<i className="fa-solid fa-x" onClick={() => handleDeleteTasks(index)}></i>
					</li>
				))}
			</ul>
			<div className="mx-4">{tasks.length} Tasks</div>
      <div className="d-flex justify-content-center">
        <button className="text-info fw-bold me-1" onClick={handleAddUser}>ADD USER</button>
        <button className="text-danger fw-bold" onClick={handleDeleteAll}>CLEAR ALL</button>
      </div>
		</div>
	);
};

export default Home;

