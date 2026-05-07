import { useState } from "react";
import { createTask } from "../services/taskService";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [operation, setOperation] = useState("uppercase");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !inputText.trim()) {
      setError("Title and Input Text are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createTask({ title, inputText, operation });
      setTitle("");
      setInputText("");
      setOperation("uppercase");
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Task</h2>
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded mb-3">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Convert Text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Input Text</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="e.g. hello world"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="reverse">Reverse</option>
            <option value="wordcount">Word Count</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
