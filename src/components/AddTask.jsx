// src/components/AddTask.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const AddTask = ({ onTaskAdded }) => {
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    category: "",
    date: "",
    time: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (
      !taskDetails.name ||
      !taskDetails.category ||
      !taskDetails.date ||
      !taskDetails.time
    ) {
      toast.error("Please fill out all fields.", {
        autoClose: 3000,
      });
      return;
    }
    // Call the parent method to add the task
    onTaskAdded(taskDetails);
    // Clear form after adding task
    setTaskDetails({
      name: "",
      category: "",
      date: "",
      time: "",
      description: "",
    });
    setIsModalOpen(false); // Close the modal after task is added
  };

  return (
    <>
      {/* Button to open the modal */}
      <div>
        <button
          className="py-1 px-2 md:py-2 md:px-4 text-center bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800"
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
              Add New Task
            </h2>

            {/* Close button using React Icon */}
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              <AiOutlineClose />
            </button>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={taskDetails.name}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task name"
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={taskDetails.category}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task category"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={taskDetails.date}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={taskDetails.time}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={taskDetails.description}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task description (optional)"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
