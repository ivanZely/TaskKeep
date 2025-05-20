import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function TaskDashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState("all");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetchTasks(token);
    const sorted = res.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    setTasks(sorted);

    const today = new Date().toISOString().split("T")[0];
    const todayTasks = sorted.filter((t) => t.due_date?.startsWith(today));
    const completedToday = todayTasks.filter((t) => t.completed).length;
    const xpToday = todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 100) : 0;

    setXp(xpToday);

    const totalCompleted = sorted.filter((t) => t.completed).length;
    setLevel(Math.floor(totalCompleted / 10) + 1);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!description || !dueDate || !dueTime) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const fullDate = `${dueDate}T${dueTime}`;
    await createTask({ description, due_date: fullDate, notes }, token);
    setDescription("");
    setDueDate("");
    setDueTime("");
    setNotes("");
    loadTasks();
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task.id, { completed: !task.completed }, token);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    loadTasks();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestor de Tareas RPG</h2>

      {/* Formulario */}
      <form onSubmit={handleAddTask} className="space-y-2 mb-6">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nombre de la tarea"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notas (opcional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar tarea
        </button>
      </form>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Pendientes
        </button>
      </div>

      {/* Lista de tareas */}
      <ul className="space-y-3">
        {filteredTasks.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center p-3 rounded border ${
              t.completed ? "bg-green-100 line-through" : "bg-white"
            }`}
          >
            <div>
              <p className="font-semibold">{t.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(t.due_date).toLocaleString()}
              </p>
              {t.notes && <p className="text-sm italic text-gray-700">{t.notes}</p>}
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggleComplete(t)}
              />
              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Barra de experiencia */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Nivel: {level}</h3>
        <p className="mb-1">Progreso diario:</p>
        <div className="w-full bg-gray-300 h-4 rounded-full">
          <div
            className="bg-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${xp}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{xp}% completado hoy</p>
      </div>
    </div>
  );
}

export default TaskDashboard;
