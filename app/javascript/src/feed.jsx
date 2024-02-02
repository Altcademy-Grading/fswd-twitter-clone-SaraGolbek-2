import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './stylesheets/app.scss';
import {safeCredentials, handleErrors} from './utils/fetchHelper';

const Feed = () => {
  console.log("Feed.jsx")

  const [message, getMessage] = useState('');
  const [tweets, setTweets] = useState([]);

  const refreshFeed = () => {
    fetch('/api/tweets', safeCredentials({
      method: 'GET',
    }))
      .then(handleErrors)
      .then(data => {
        setTweets(data.tweets); 
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
    <div className="row">
      <div className="col-3 mt-5 me-4">
        <div className="border rounded shadow-sm w-100">
          <h4 className="m-3">Feed</h4>
          <ul className="list-unstyled ms-4 p-2">
            <li className="p-2"><a href="/feed">Feed</a></li>
            <li className="p-2"><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </div>
      <div className="col-8 mt-5">
        <div className="border rounded shadow-sm pb-3 mb-3 w-100">
          <h4 className="m-3">Create</h4>
          <form className="ms-3" onSubmit={handleTweet}><input type="text" className="inputwidth" placeholder="What is on your mind?" required onChange={(event) => getMessage(event.target.value)}></input><button className="btn btn-secondary">Post</button></form>
        </div>
        <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            <p>User: {tweet.user_id}</p>
            <p>Message: {tweet.message}</p>
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
