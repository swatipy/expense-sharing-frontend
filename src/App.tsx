import React, { useEffect, useState } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App: React.FC = () => {
  const [view, setView] = useState<'buttons' | 'signup' | 'login'>('buttons');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('http://localhost:8080/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setIsLoggedIn(true);
            setView('buttons'); // Hide login/signup
          } else {
            localStorage.removeItem('authToken');
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem('authToken');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setView('buttons');
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <>
          <h2>You are logged in!</h2>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : (
        <>
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
          {view === 'login' && <Login setView={setView} setIsLoggedIn={setIsLoggedIn} />}
        </>
      )}
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
  logoutButton: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default App;