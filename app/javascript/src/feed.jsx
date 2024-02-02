import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './stylesheets/app.scss';
import {safeCredentials, handleErrors} from './utils/fetchHelper';

const Feed = () => {
  const [message, getMessage] = useState('');
  const [tweets, setTweets] = useState([]);

  const refreshFeed = () => {
    fetch('/api/tweets', safeCredentials({
      method: 'GET',
    }))
      .then(handleErrors)
      .then(data => {
        setTweets(data); 
      })
  };

  useEffect(() => {
    refreshFeed();
  }, []); 

  const handleTweet = (event) => {
    event.preventDefault();

    fetch('/api/tweets', safeCredentials ({
      method: 'POST',
      body: JSON.stringify({
        tweet: {
          message: message, 
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        refreshFeed()
      })
  };

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
          <form class="ms-3" onSubmit={handleTweet}><input type="text" class="inputwidth" placeholder="What is on your mind?" required onChange={(event) => getMessage(event.target.value)}></input><button class="btn btn-secondary">Post</button></form>
        </div>
        <ul>
        {tweets.map(tweets => (
          <li key={tweets.id}>
            <p>User: {tweets.user_id}</p>
            <p>Message: {tweets.message}</p>
          </li>
        ))}
      </ul>
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
