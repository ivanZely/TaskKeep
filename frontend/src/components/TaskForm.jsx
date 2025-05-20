import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";

const TaskForm = ({ token }) => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !dueDate || !dueTime) {
      alert("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    const fullDate = `${dueDate}T${dueTime}`;
    try {
      await createTask({ description, due_date: fullDate, notes }, token);
      navigate("/dashboard");
    } catch (err) {
      alert("Error al crear la tarea");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Notas (opcional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Agregar tarea
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
