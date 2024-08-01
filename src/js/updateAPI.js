//import React, { useEffect, useState} from "react";


export const fetchTasks = async (setTasks) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/users/justicetrace`);
        if (!response.ok) {
            throw new Error(`Failed to FETCH the tasks ${response.status} ${response.statusText}`);
        }
        const data = response.json();
        setTasks(Array.isArray(data.todos) ? data.todos : []);
    } catch (error) {
        console.log("Error CATCHING tasks", error.message);
        handleCreateUser(setTasks);
    }
};

export const addTasks = async (tasks, setTasks, newTasks) => {
    if (typeof newTasks === "string" && newTasks.trim() !== "") {
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
            const data = await response.json();
            const updatedTasks = [
                ...tasks,
                { label: newTasks.trim(), done: false, id: data.id }
            ];
            setTasks(updatedTasks);
            //fetchTasks(setTasks);
        } catch (error) {
            console.log("Error ADDING the tasks", error);
        }
    }
  };

  export const deleteTasks = async (taskId, setTasks) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error("failed to DELETE tasks");
        }
        fetchTasks(setTasks);
    } catch (error) {
        console.log("Error DELETING the tasks", error);
    }
  };

  export const deleteAll = async (setTasks) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/users/justicetrace`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error("failed to DELETE user");
        }
        console.log("user and todos deleted successfully from API")
        setTasks([]);
    } catch (error) {
        console.log("Error DELETING the users and tasks", error);
    }
  };

  export const handleCreateUser = async (setTasks) => {
    try {
        const response = await fetch("https://playground.4geeks.com/todo/users/justicetrace", {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("error creating user API");
        } 

        console.log("User has been created successfully in API");
        fetchTasks(setTasks);
    } catch (error) {
        console.error("Error creating user in API:", error);
    }
        
};

  /*const updateTasks = async (id, updatedTaskName, isDone) => {
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
  }; */