import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './app.scss';
import Posts from './utils/posts';

export const indexTweets = async (successCB, errorCB) => {
  try {
    const response = await fetch(`/api/tweets`);
    const data = await response.json();
    successCB(data);
  } catch (error) {
    errorCB(error);
  }
};

export const postTweet = async (content, successCB, errorCB) => {
  try {
    const response = await fetch(`/api/tweets`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tweet: { content } }),
    });
    const data = await response.json();
    successCB(data);
  } catch (error) {
    errorCB(error);
  }
};

export const destroyTweet = async (id, successCB, errorCB) => {
  try {
    const response = await fetch(`/api/tweets`, {
      method: 'DELETE',
      headers,
    });
    successCB(response);
  } catch (error) {
    errorCB(error);
  }
};

const Feed = () => {
  return (
   <Layout>
    <div class="row">
      <div class="col-3 mt-5 me-4">
        <div class="border rounded shadow-sm w-100">
          <h4 class="m-3">Feed</h4>
          <ul class="list-unstyled ms-4 p-2">
            <li class="p-2"><a href="/feed">Feed</a></li>
            <li class="p-2"><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </div>
      <div class="col-8 mt-5">
        <div class="border rounded shadow-sm pb-3 mb-3 w-100">
          <h4 class="m-3">Create</h4>
          <form class="ms-3"><input type="text" class="inputwidth" placeholder="What is on your mind?"></input><button class="btn btn-secondary">Post</button></form>
        </div>
        {(() => {
              if (error) {
                return error;
              }
              return tweets.map((tweet) => {
                return <Posts />;
              })
            })()}
      </div>
    </div>
  </Layout>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div')),
  )
})
