import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './profile.scss';

const Profile = () => (
  <Layout>
    <div class="row">
      <div class="col-5 mt-5 offset-2">
        <h3>Profile</h3>
      </div>
    </div>
  </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Profile />,
    document.body.appendChild(document.createElement('div')),
  )
})