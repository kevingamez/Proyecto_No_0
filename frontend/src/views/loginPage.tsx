import React, { useState } from 'react';
import './loginPage.css';

function LoginPage() {
  // Estado para alternar entre el formulario de inicio de sesión y el de registro
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Estados para los valores de los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const profileImage = '';

  // Función para manejar el clic en el enlace "Sign in"
  const toggleForm = () => {
    setIsSigningIn(!isSigningIn);
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = () => {

    // Validar la confirmación de la contraseña si es el formulario de registro
    if (isSigningIn && password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const userData = isSigningIn ? { name, email, password, profileImage } : { email, password };

    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
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
