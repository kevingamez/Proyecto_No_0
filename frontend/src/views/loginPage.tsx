import React, { useState } from 'react';
import './loginPage.css';
import TaskList from './Tasks/TaskList';
import { useNavigate } from 'react-router-dom';  // Importa useHistory


function LoginPage() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const profileImage = '';

  const toggleForm = () => {
    setIsSigningIn(!isSigningIn);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  const url = isSigningIn ? 'http://localhost:8080/register' : 'http://localhost:8080/login';
  const method = isSigningIn ? 'POST' : 'POST';


    if (isSigningIn && password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const userData = isSigningIn ? { name, email, password, profileImage } : { email, password };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      navigate('/tasklist');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="login-container">
      <h1>{isSigningIn ? 'Sign In' : 'Log In'}</h1>
      <form onSubmit={handleFormSubmit}>
        {isSigningIn && (
          <>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name..." required />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address..." required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password..." required />
        {isSigningIn && (
          <>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password..." required />
          </>
        )}
        <button type="submit" className={isSigningIn ? "submit-btn" : "email-btn"}>
          {isSigningIn ? 'Submit' : 'Continue with email'}
        </button>
      </form>
      <div className="terms">
        {isSigningIn ? (
          <span>Already have an account? <span onClick={toggleForm} className="toggle-form"><a href="#">Log in.</a></span></span>
        ) : (
          <span>Need an account? <span onClick={toggleForm} className="toggle-form"><a href="#">Sign in.</a></span></span>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
