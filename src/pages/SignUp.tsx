import React, {useState} from 'react';
interface SignUpProps {
  setView?: (view: 'buttons' | 'signup' | 'login') => void;
}

interface SignupInput {
  username: string;
  password: string;
  email: string;
  // Add other fields as per your UserSignupInputDTO
}

const Signup: React.FC<SignUpProps> = ({ setView }) => {
  const [formData, setFormData] = useState<SignupInput>({
    username: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || 'Signup successful!');
        setFormData({ username: '', password: '', email: '' });
        // Optional: setView('login') to navigate to login after success
      } else if (response.status === 400) {
        const data = await response.json();
        setError(
          data.message || 'Validation failed. Please check your input.'
        );
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed. Try again later.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network or server error. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      /><br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      /><br />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {setView && (
        <p>
          Already have an account?{' '}
          <button onClick={() => setView('login')}>Login</button>
        </p>
      )}
    </div>
  );
};

export default Signup;