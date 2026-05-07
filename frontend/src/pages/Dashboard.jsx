import { useEffect, useState } from "react";
import { getAllTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res.data.Tasks || []);
      setError("");
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Poll every 4 seconds
    const interval = setInterval(() => {
      fetchTasks();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-53px)] bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Task Form */}
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={fetchTasks} />
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Tasks</h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <Loader />
            ) : tasks.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500 text-sm">No tasks yet. Create your first task!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} onRefresh={fetchTasks} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
