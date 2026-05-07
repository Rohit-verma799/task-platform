import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTaskById, runTask } from "../services/taskService";
import Loader from "../components/Loader";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  running: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [runLoading, setRunLoading] = useState(false);

  const fetchTask = async () => {
    try {
      const res = await getTaskById(id);
      setTask(res.data.task);
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch task");
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    try {
      setRunLoading(true);
      await runTask(id);
      fetchTask();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to run task");
    } finally {
      setRunLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();

    
    const interval = setInterval(() => {
      fetchTask();
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-[calc(100vh-53px)] bg-gray-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded">
            {error}
          </div>
          <Link to="/dashboard" className="text-blue-600 text-sm mt-3 inline-block hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const statusClass = statusColors[task?.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="min-h-[calc(100vh-53px)] bg-gray-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="text-blue-600 text-sm hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">{task.title}</h1>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClass}`}>
              {task.status}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="font-medium text-gray-600 w-24 shrink-0">Input Text:</span>
              <span className="text-gray-800 bg-gray-50 px-3 py-1 rounded flex-1 break-all">
                {task.inputText}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium text-gray-600 w-24 shrink-0">Operation:</span>
              <span className="text-gray-800">{task.operation}</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium text-gray-600 w-24 shrink-0">Status:</span>
              <span className="text-gray-800">{task.status}</span>
            </div>

            {task.result && (
              <div className="flex gap-2">
                <span className="font-medium text-gray-600 w-24 shrink-0">Result:</span>
                <span className="text-gray-800 bg-green-50 px-3 py-1 rounded flex-1 break-all font-mono">
                  {task.result}
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <span className="font-medium text-gray-600 w-24 shrink-0">Created:</span>
              <span className="text-gray-800">{new Date(task.createdAt).toLocaleString()}</span>
            </div>

            {task.updatedAt && (
              <div className="flex gap-2">
                <span className="font-medium text-gray-600 w-24 shrink-0">Updated:</span>
                <span className="text-gray-800">{new Date(task.updatedAt).toLocaleString()}</span>
              </div>
            )}
          </div>

         
          {task.logs && task.logs.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Logs</h2>
              <div className="bg-gray-900 text-green-400 rounded p-3 text-xs font-mono space-y-1 max-h-48 overflow-y-auto">
                {task.logs.map((log, index) => (
                  <div key={index}>
                    <span className="text-gray-500 mr-2">[{index + 1}]</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {task.status !== "success" && task.status !== "failed" && (
            <div className="mt-6">
              <button
                onClick={handleRun}
                disabled={runLoading || task.status === "running"}
                className="bg-green-600 text-white text-sm font-medium px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
              >
                {runLoading ? "Starting..." : "Run Task"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
