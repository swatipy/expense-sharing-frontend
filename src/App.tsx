import React, { useState } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App: React.FC = () => {
  const [view, setView] = useState<'buttons' | 'signup' | 'login'>('buttons');

  return (
    <div style={styles.container}>
      {view === 'buttons' && (
        <>
          <h2>Welcome</h2>
          <button style={styles.signUpButton} onClick={() => setView('signup')}>
            Sign Up
          </button>
          <button style={styles.loginButton} onClick={() => setView('login')}>
            Login
          </button>
        </>
      )}

      {view === 'signup' && <SignUp setView={setView} />}
      {view === 'login' && <Login setView={setView} />}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  signUpButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  loginButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default App;
