import React from 'react';
import './loginPage.css'; 

function LoginPage() {
  return (
    <div className="login-container">
      <h1>Log in</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email address..." />
        <button type="submit" className="email-btn">Continue with email</button>
      </form>
      <div className="terms">
       Register <a href="#">Sign in.</a>
      </div>
    </div>
  );
}

export default LoginPage;
