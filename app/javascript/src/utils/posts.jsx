import React from 'react';

const Posts = (props) => {
  const {
    username,
    tweet,
  } = props.user;

  return (
  <div className="row">
  <div className="col-12 mb-3 p-2 border rounded shadow">
    <Link to={`/${username}`}>
      {username}
    </Link>
    <p>{tweet}</p>
  </div>
</div>
)
}

export default Posts;