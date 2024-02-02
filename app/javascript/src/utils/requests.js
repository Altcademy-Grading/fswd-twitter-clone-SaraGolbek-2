class Request {
  constructor() {
    this.type = '';
    this.url = '';
    this.data = {};
    this.dataType = 'json';
    this.success = function (response) {};
    this.error = function (response) {};
  }
}


//------------------- Logging Out ---------------------

function logoutUser(callback) {
  const newRequest = new Request();
  newRequest.type = 'DELETE';
  newRequest.url = 'sessions';
  newRequest.xhrFields = { withCredentials: true };
  newRequest.success = function (response) {
    console.log(response);
    return callback();
  };

  fetch(newRequest.url, {
    method: newRequest.type,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data));
}

//------------------ Authenticate ---------------------

function authenticate(successCB, errorCB) {
  const newRequest = new Request();
  newRequest.type = 'GET';
  newRequest.url = 'authenticated';
  newRequest.xhrFields = { withCredentials: true };
  newRequest.success = function (response) {
    console.log(response);
    return successCB(response);
  };
  newRequest.error = function (request, errorMessage) {
    return errorCB(errorMessage);
  };

  fetch(newRequest.url, {
    method: newRequest.type,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data))
    .catch((error) => newRequest.error(error));
}

//---------------------- Tweets -----------------------

//------------------- Post a Tweet --------------------
function postTweet(msg, image, callback) {
  const formData = new FormData();
  if (msg) {
    formData.append('tweet[message]', msg);
  }
  if (image) {
    formData.append('tweet[image]', image, image.name);
  }
  const newRequest = new Request();
  newRequest.type = 'POST';
  newRequest.url = 'tweets';
  newRequest.cache = false;
  newRequest.contentType = false;
  newRequest.processData = false;
  newRequest.xhrFields = { withCredentials: true };
  newRequest.data = formData;
  newRequest.success = function (response) {
    console.log(response);
    return callback({ success: true });
  };
  newRequest.error = function (request, error) {
    console.log(request);
    console.log(error);
  };

  fetch(newRequest.url, {
    method: newRequest.type,
    body: newRequest.data,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data))
    .catch((error) => newRequest.error(error));
}

//------------------- Get all Tweets ------------------

function getAllTweets(callback) {
  const newRequest = new Request();
  newRequest.type = 'GET';
  newRequest.url = 'tweets';
  newRequest.success = function (response) {
    return callback(response.tweets);
  };

  fetch(newRequest.url, {
    method: newRequest.type,
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data));
}

//----------------- Get tweet by ID --------------------

function getOneTweet(id) {
  const newRequest = new Request();
  newRequest.type = 'GET';
  newRequest.url = 'tweets/' + id;
  newRequest.success = function (response) {
    console.log(response);
  };

  fetch(newRequest.url, {
    method: newRequest.type,
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data));
}

//------------- Get All Tweets by Username -------------

function getUserTweets(username, callback) {
  const newRequest = new Request();
  newRequest.type = 'GET';
  newRequest.url = 'users/' + username + '/tweets';
  newRequest.success = function (response) {
    console.log(response);
    return callback(response.tweets);
  };

  fetch(newRequest.url, {
    method: newRequest.type,
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data));
}

//---------------- Delete a tweet by ID ----------------

function deleteOneTweet(id, callback) {
  const newRequest = new Request();
  newRequest.type = 'DELETE';
  newRequest.url = 'tweets/' + id;
  newRequest.xhrFields = { withCredentials: true };
  newRequest.success = function (response) {
    console.log(response);
    return callback();
  };

  fetch(newRequest.url, {
    method: newRequest.type,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data));
}

//--------------- Search Tweet by Keyword --------------

function searchTweets(keyword, callback) {
  const newRequest = new Request();
  newRequest.type = 'GET';
  newRequest.url = 'tweets/search/' + keyword;
  newRequest.success = function (response) {
    console.log(response);
    return callback(response.tweets);
  };

  fetch(newRequest.url, {
    method: newRequest.type,
  })
    .then((response) => response.json())
    .then((data) => newRequest.success(data));
}