import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './app.scss';

const Feed = () => (
  <Layout>
    <div class="row">
      <div class="col-3 mt-5 me-4">
        <div class="border rounded shadow-sm w-100">
          <h4 class="m-3">Feed</h4>
          <ul class="list-unstyled ms-4 p-2">
            <li class="p-2"><a href="/feed">Feed</a></li>
            <li class="p-2"><a href="/profile">Profile</a></li>
            <li class="p-2"># Posts</li>
          </ul>
        </div>
      </div>
      <div class="col-8 mt-5">
        <div class="border rounded shadow-sm pb-3 mb-3 w-100">
          <h4 class="m-3">Create</h4>
          <form class="ms-3"><input type="text" class="inputwidth" placeholder="What is on your mind?"></input><button class="btn btn-secondary">Post</button></form>
        </div>
        <div class="feed"></div>
      </div>
    </div>
  </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div')),
  )
})