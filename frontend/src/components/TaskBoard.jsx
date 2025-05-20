import TaskDashboard from './TaskDashboard';

function TaskBoard({ token, onLogout }) {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Panel de tareas</h2>
        <button onClick={onLogout} style={{ padding: '8px 16px' }}>
          Cerrar sesión
        </button>
      </div>
      <TaskDashboard token={token} />
    </div>
  );
}

export default TaskBoard;
