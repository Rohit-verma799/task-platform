import { Link } from "react-router-dom";
import { runTask } from "../services/taskService";
import { useState } from "react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  running: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

const TaskCard = ({ task, onRefresh }) => {
  const [runLoading, setRunLoading] = useState(false);

  const handleRun = async () => {
    try {
      setRunLoading(true);
      await runTask(task._id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to run task");
    } finally {
      setRunLoading(false);
    }
  };

  const statusClass = statusColors[task.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800 text-sm">{task.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusClass}`}>
          {task.status}
        </span>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <span className="font-medium text-gray-600">Operation:</span> {task.operation}
        </p>
        {task.result && (
          <p>
            <span className="font-medium text-gray-600">Result:</span> {task.result}
          </p>
        )}
        <p>
          <span className="font-medium text-gray-600">Created:</span>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-2 mt-auto">
        {task.status !== "success" && task.status !== "failed" && (
          <button
            onClick={handleRun}
            disabled={runLoading || task.status === "running"}
            className="flex-1 text-xs bg-green-600 text-white py-1.5 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
          >
            {runLoading ? "Starting..." : "Run"}
          </button>
        )}
        <Link
          to={`/task/${task._id}`}
          className="flex-1 text-xs bg-gray-100 text-gray-700 py-1.5 rounded hover:bg-gray-200 text-center font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
