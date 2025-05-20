import { useState } from 'react';

function RegisterForm({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Error al registrarse');
        return;
      }

      setMessage('Usuario registrado correctamente');
    } catch (err) {
      console.error(err);
      setMessage('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Registro</h2>

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
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>

      <button
        type="button"
        onClick={onBack}
        disabled={loading}
        style={{ marginLeft: 10, padding: '10px 20px' }}
      >
        Volver
      </button>

      {message && <p style={{ color: message.includes('correctamente') ? 'green' : 'red', marginTop: 10 }}>
        {message}
      </p>}
    </form>
  );
}

export default RegisterForm;
