import { useState } from 'react';

function LoginForm({ onBack, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_PREFIX = '/api'; // Usar siempre el prefijo /api por configuración de Nginx

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_PREFIX}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLogin(data.access_token);
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
        disabled={loading}
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        disabled={loading}
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
      />

      <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </button>

      <button
        type="button"
        onClick={onBack}
        disabled={loading}
        style={{ marginLeft: 10, padding: '10px 20px' }}
      >
        Volver
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
