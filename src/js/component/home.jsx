import React, { useEffect } from "react";
import { useState } from "react";
import { deleteTasks, addTasks, fetchTasks, deleteAll } from "../updateAPI";


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

        addTasks(tasks, newTasks.trim(), setTasks);
        console.log("New Todo ADDED to API: " + newTodo.label);

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



	return (
		<div className="container bg-light my-4">
			<h1 className="text-info d-flex justify-content-center p-3">To Do List</h1>
			<ul>
            {/* 
            <form onSubmit={(e) => {
				e.preventDefault();
				setNewTasks(newTasks.concat(tasks));
				setTasks("");
			}}>
               */}
				<li>
					<input type="text"
					placeholder="What do we have to accomplish?"
					onChange={(e) => setNewTasks(e.target.value)}
					value={newTasks}
                    onKeyDown={handleAddTasks}
					/>
				</li>
			{/* </form>  */}
				{tasks.map((item, index) => (
					<li key={item.id}>
						{item.label}
						<i class="fa-solid fa-x" onClick={() => handleDeleteTasks(index)}></i>
					</li>
				))}
			</ul>
			<div className="mx-4">{tasks.length} Tasks</div>
		</div>
	);
};

export default Home;

