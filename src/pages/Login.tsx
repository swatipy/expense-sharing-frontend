import React, { useState } from 'react';

interface LoginProps {
  setView?: (view: 'buttons' | 'signup' | 'login') => void;
}

const Login: React.FC<LoginProps> = ({ setView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Username:', username);
      console.log('Password:', password);  
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful! Token:', data.token);
        localStorage.setItem('authToken', data.token);
        // You can redirect or change views here
      } else {
        const message = await response.text();
        setError(message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {setView && (
        <p>
          Don’t have an account?{' '}
          <button onClick={() => setView('signup')}>Sign Up</button>
        </p>
      )}
    </div>
  );
};

export default Login;
