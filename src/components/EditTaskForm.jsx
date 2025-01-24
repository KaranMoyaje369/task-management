import React, { useState, useEffect } from "react";

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    category: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (task) {
      setTaskDetails({
        name: task.name,
        category: task.category,
        description: task.description,
        date: task.date,
        time: task.time,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, ...taskDetails });
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">Task Name</label>
            <input
              type="text"
              name="name"
              value={taskDetails.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={taskDetails.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Description</label>
            <textarea
              name="description"
              value={taskDetails.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={taskDetails.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={taskDetails.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex gap-4 justify-end mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
