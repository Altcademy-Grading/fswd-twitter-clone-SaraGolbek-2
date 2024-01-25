import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './home.scss';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        // window.location = '/';
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
          <div className="row rounded" id="acc">
            <form id="log-in">
              <h6 className="mb-3">Welcome Back!</h6>
              <input type="text"  className="inputwidth username" id="usernameinput" placeholder="Username" required></input>
              <input type="text" className="password" id="passinput" placeholder="Password" required></input>
              <button id="log-in-btn">Sign In</button>
              <label htmlFor="remember"><input type="checkbox" id="remember" className="me-1"></input>
              Remember me</label>
              <a href="#" className="ms-3">Forgot Password?</a>
            </form>
          </div>
          <div className="row rounded mt-3" id="acc">
            <form className="sign-up" onSubmit={handleFormSubmit}>
              <h6 className="mb-3">New to Twitter?</h6>
              <input type="text" className="inputwidth email" id="newemail" placeholder="Email" required onChange={(event) => setEmail(event.target.value)}></input>
              <input type="text" className="inputwidth username" id="newusername" placeholder="Username" required onChange={(event) => setUsername(event.target.value)}></input>
              <input type="text" className="inputwidth password" id="newpass" placeholder="Password" required onChange={(event) => setPassword(event.target.value)}></input>
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
