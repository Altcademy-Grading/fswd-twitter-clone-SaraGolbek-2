export function jsonHeader(options = {}) {
  return Object.assign(options, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
}

export function getMetaContent(name) {
  const header = document.querySelector(`meta[name="${name}"]`);
  return header && header.content;
}

export function getAuthenticityToken() {
  return getMetaContent('csrf-token');
}

export function authenticityHeader(options = {}) {
  return Object.assign(options, {
    'X-CSRF-Token': getAuthenticityToken(),
    'X-Requested-With': 'XMLHttpRequest',
  });
}


export function safeCredentials(options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign((options.headers || {}), authenticityHeader(), jsonHeader()),
  });
}

export function handleErrors(response) {
  if (!response.ok) {
    console.log(response);
    throw Error(response.statusText);
  }
  return response.json();
}


export async function loginUser(username, password) {

  try {
    const requestBody = JSON.stringify({
      username: username,
      password: password,
    });

    const headers = authenticityHeader(jsonHeader());

    const requestOptions = safeCredentials({
      method: 'POST',
      headers: headers,
      body: requestBody,
    });

    const response = await fetch(loginEndpoint, requestOptions);
    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
    } else {
      console.error('Login failed:', data.error || 'Unknown error');
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}
