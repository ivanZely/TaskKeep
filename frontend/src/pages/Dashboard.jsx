import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/api";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks(token);
    setTasks(data);
  };

  const handleCreate = async () => {
    await createTask(token, description);
    setDescription("");
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Mis Tareas</h1>
        <button onClick={handleLogout} className="bg-gray-200 px-3 py-1 rounded">
          Salir
        </button>
      </div>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Nueva tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
          Agregar
        </button>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
}