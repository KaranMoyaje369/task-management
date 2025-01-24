// src/components/Dashboard.jsx
import React from "react";

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="bg-white p-4 py-8 rounded-md shadow-lg] mb-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700 uppercase">
        Dashboard
      </h2>
      <div className="flex flex-col gap-2">
        <div className="bg-blue-100 p-4 rounded-full text-center">
          <h3 className="text-lg font-bold">Total Tasks</h3>
          <p className="text-xl">{totalTasks}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-full text-center">
          <h3 className="text-lg font-bold">Completed</h3>
          <p className="text-xl">{completedTasks}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-full text-center">
          <h3 className="text-lg font-bold">Pending</h3>
          <p className="text-xl">{pendingTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
