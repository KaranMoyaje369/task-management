// src/components/TaskList.jsx
import React from "react";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const getRandomColor = () => {
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-red-100",
    "bg-indigo-100",
    "bg-teal-100",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const TaskList = ({ tasks, onComplete, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-5">
      <div>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          All Tasks
        </h2>
      </div>
      <div className="overflow-y-auto h-96 p-4">
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-4 md:items-center justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${getRandomColor()}`}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-lg md:text-xl font-bold text-blue-600 capitalize">
                    {task.name}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    {task.category}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    {task.date} | {task.time}
                  </p>
                  {task.description && (
                    <p className="text-sm text-gray-600 font-semibold mt-2">
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex space-x-3">
                  {/* Complete button */}
                  <button
                    className="font-bold text-green-500 hover:text-green-700 text-lg  bg-white rounded-full p-1 shadow-md shadow-green-700"
                    onClick={() => onComplete(task)}
                  >
                    <AiOutlineCheck size={20} />
                  </button>

                  {/* Edit button */}
                  <button
                    className="text-blue-500 hover:text-blue-700 text-lg  bg-white rounded-full p-1 shadow-md shadow-blue-700"
                    onClick={() => onEdit(task)}
                  >
                    <AiOutlineEdit size={20} />
                  </button>

                  {/* Delete button */}
                  <button
                    className="text-red-500 hover:text-red-700 text-lg  bg-white rounded-full p-1 shadow-md shadow-red-700"
                    onClick={() => onDelete(task)}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
