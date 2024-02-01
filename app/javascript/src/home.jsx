import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './home.scss';
import { safeCredentials, handleErrors, loginUser } from './utils/fetchHelper';

// Import the loginUser function
// import { loginUser } from './path-to-loginUser'; // Replace with the correct path

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogIn = (event) => {
    setUsername(event.target.value);
  };

  const passwordLogIn = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      // Call the loginUser function to handle the authentication
      await loginUser(username, password);
      window.location.replace("/feed");
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        window.location.replace("/feed");
      })
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-5 mt-5 offset-2" id="hero">
          <h3 id="welcome">Welcome to Twitter.</h3>
          <p>Connect with your friends - and other fascinating people. Get in-the-moment update on the things that interest you. And watch events unfold, in real time, from every angle.</p>
        </div>
        <div className="col-4 mt-5">
          <div className="row border shadow rounded" id="acc">
            <form id="log-in" onSubmit={handleLogIn}>
              <h6 className="mb-3">Welcome Back!</h6>
              <input type="text"  className="inputwidth username" id="usernameinput" placeholder="Username" required onChange={(event) => userLogIn(event.target.value)}></input>
              <input type="password" className="password" id="passinput" placeholder="Password" required onChange={(event) => passwordLogIn(event.target.value)}></input>
              <button id="log-in-btn">Sign In</button>
              <label htmlFor="remember"><input type="checkbox" id="remember" className="me-1"></input>
              Remember me</label>
              <a href="#" className="ms-3">Forgot Password?</a>
            </form>
          </div>
          <div className="row border shadow rounded mt-3" id="acc">
            <form className="sign-up" onSubmit={handleFormSubmit}>
              <h6 className="mb-3">New to Twitter?</h6>
              <input type="text" className="inputwidth email" id="newemail" placeholder="Email" required onChange={(event) => setEmail(event.target.value)}></input>
              <input type="text" className="inputwidth username" id="newusername" placeholder="Username" required onChange={(event) => setUsername(event.target.value)}></input>
              <input type="password" className="inputwidth password" id="newpass" placeholder="Password" required onChange={(event) => setPassword(event.target.value)}></input>
              <button className="inputwidth" id="sign-up-btn">Sign Up for Twitter</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
