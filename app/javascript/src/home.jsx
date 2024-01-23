import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';

const Home = () => (
  <Layout>
    <div class="row">
      <div class="col-5 mt-5 offset-2" id="hero">
        <h3 id="welcome">Welcome to Twitter.</h3>
        <p>Connect with your friends - and other fascinating people. Get in-the-moment update on the things that interest you. And watch events unfold, in real time, from every angle.</p>
      </div>
      <div class="col-4 mt-5">
        <div class="row rounded" id="acc">
          <form id="log-in">
            <h6 class="mb-3">Welcome Back!</h6>
            <input type="text"  class="inputwidth username" id="usernameinput" placeholder="Username" required></input>
            <input type="text" class="password" id="passinput" placeholder="Password" required></input>
            <button id="log-in-btn">Sign In</button>
            <label for="remember"><input type="checkbox" id="remember" class="me-1"></input>
            Remember me</label>
            <a href="#" class="ms-3">Forgot Password?</a>
          </form>
        </div>
        <div class="row rounded mt-3" id="acc">
          <form class="sign-up">
            <h6 class="mb-3">New to Twitter?</h6>
            <input type="text" class="inputwidth email" id="newemail" placeholder="Email" required></input>
            <input type="text" class="inputwidth username" id="newusername" placeholder="Username" required></input>
            <input type="text" class="inputwidth password" id="newpass" placeholder="Password" required></input>
            <button class="inputwidth" id="sign-up-btn">Sign Up for Twitter</button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
