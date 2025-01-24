import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS
import SearchBar from "./components/Searchbar";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import EditTaskForm from "./components/EditTaskForm";

const API_URL =
  "https://karanmoyaje369.github.io/task-management-api/db.json/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data); // Initially show all tasks
      })
      .catch((error) => {
        toast.error("Failed to load tasks", {
          autoClose: 3000,
        });
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredTasks(tasks); // Reset the task list when search term is cleared
    } else {
      const filtered = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered); // Update task list with filtered tasks
    }
  };

  const handleAddTask = (newTask) => {
    toast.dismiss(); // Dismiss any existing toast before showing a new one
    axios
      .post(API_URL, newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setFilteredTasks((prevTasks) => [...prevTasks, response.data]);
        toast.success("Task added successfully!", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error("Failed to add task", {
          autoClose: 3000,
        });
      });
  };

  const completeTask = (taskToComplete) => {
    toast.dismiss(); // Dismiss any existing toast before showing a new one
    axios
      .put(`${API_URL}/${taskToComplete.id}`, {
        ...taskToComplete,
        status: "Completed",
      })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskToComplete.id
              ? { ...task, status: "Completed" }
              : task
          )
        );
        setFilteredTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskToComplete.id
              ? { ...task, status: "Completed" }
              : task
          )
        );
        toast.success("Task marked as completed", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error("Failed to complete task", {
          autoClose: 3000,
        });
      });
  };

  const handleEditTask = (taskToEdit) => {
    setIsEditing(true);
    setTaskToEdit(taskToEdit);
  };

  const handleSaveEdit = (updatedTask) => {
    toast.dismiss(); // Dismiss any existing toast before showing a new one
    axios
      .put(`${API_URL}/${updatedTask.id}`, updatedTask)
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          )
        );
        setFilteredTasks(
          filteredTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          )
        );
        setIsEditing(false);
        setTaskToEdit(null);
        toast.success("Task edited successfully", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error("Failed to edit task", {
          autoClose: 3000,
        });
      });
  };

  const deleteTask = (taskToDelete) => {
    toast.dismiss(); // Dismiss any existing toast before showing a new one
    axios
      .delete(`${API_URL}/${taskToDelete.id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
        setFilteredTasks(
          filteredTasks.filter((task) => task.id !== taskToDelete.id)
        );
        toast.error("Task deleted", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error("Failed to delete task", {
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <div>
        <div className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md p-4 mb-6 flex md:justify-around justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-2xl  lg:text-3xl text-blue-700 font-bold">
              Task Management App
            </h2>
          </div>
          <div>
            <AddTask onTaskAdded={handleAddTask} />
          </div>
        </div>

        <div className="mx-4 mt-20">
          <SearchBar tasks={tasks} onSearch={handleSearch} />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center w-full p-5 lg:h-[70vh] my-5 lg:my-0">
          <div className="lg:w-[25%]">
            <Dashboard tasks={filteredTasks} />
          </div>
          <div className="lg:w-[75%]">
            {isEditing ? (
              <EditTaskForm
                task={taskToEdit}
                onSave={handleSaveEdit}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <TaskList
                tasks={filteredTasks}
                onComplete={completeTask}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default App;
