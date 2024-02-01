import React, { useState, useEffect } from 'react';

const TweetList = ({ username }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(`/api/user/${username}`);
        const data = await response.json();
        setTweets(data); 
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, [username]);

  return (
    <div>
      <h2>{`${username}'s Tweets`}</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <p>{tweet.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetList;
