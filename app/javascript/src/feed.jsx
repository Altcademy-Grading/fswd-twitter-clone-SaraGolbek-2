import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './feed.scss';

const Feed = () => (
  <Layout>
    <div class="row">
      <div class="col-5 mt-5 offset-2">
        <h3>Feed</h3>
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