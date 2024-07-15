import React, { useEffect } from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tasks, setTasks] = useState("");
	const [newTasks, setNewTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/justicetrace`);
            if (!response.ok) {
                throw new Error(`Failed to FETCH the tasks ${response.status} ${response.statusText}`);
            }
            const data = response.json();
            setTasks(data.todos);
        } catch (error) {
            console.log("Error CATCHING tasks", error.message);
        }
    };
// below need to place this function in my return input tag onChange?
    const handleInputChange = (e) => {
        setNewTasks(e.target.value);
      };

      const addTasks = async () => {
        if (newTasks.trim() !== "") {
            try {
                const response = await fetch(`https://playground.4geeks.com/todo/todos/justicetrace`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        label: newTasks.trim(),
                        is_done: false
                    }),
                });
                if (!response.ok) {
                    throw new Error(`failed to ADD the task`);
                }
                fetchTasks();
                setNewTasks("");
            } catch (error) {
                console.log("Error ADDING the tasks", error);
            }
        }
      };

      const deleteTasks = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("failed to DELETE tasks");
            }
            fetchTasks();
        } catch (error) {
            console.log("Error DELETING the tasks", error);
        }
      };

      const updateTasks = async (id, updatedTaskName, isDone) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    label: updatedTaskName,
                    is_done: isDone
                }),
            });
            if (!response.ok) {
                throw new Error("failed to UPDATE the tasks");
            };
            fetchTasks();
        } catch (error) {
            console.log("Error UPDATING the tasks", error);
        }
      };

     /* const handleTasksUpdate = (id, updatedTasksName) => {
        updateTasks(id, updatedTasksName);
      };

      const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            addTasks();
        }
      }; */




	return (
		<div className="container bg-light my-4">
			<h1 className="text-info d-flex justify-content-center p-3">To Do List</h1>
			<ul>
            <form onSubmit={(e) => {
				e.preventDefault();
				setNewTasks(newTasks.concat(tasks));
				setTasks("");
			}}>
				<li>
					<input type="text"
					placeholder="What do we have to accomplish?"
					onChange={(e) => setTasks(e.target.value)}
					value={tasks}
					/>
				</li>
			</form>
				{newTasks.map((item, index) => (
					<li>
						{item}
						<i class="fa-solid fa-x" onClick={() => setNewTasks(newTasks.filter((t, currentIndex) => index != currentIndex))}></i>
					</li>
				))}
			</ul>
			<div className="mx-4">{newTasks.length} Tasks</div>
		</div>
	);
};

export default Home;

