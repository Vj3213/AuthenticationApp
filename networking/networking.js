let SERVER_URL = "https://www.classpro.in/api/v5/auth_user";

async function verifyLoginCredentials(username, password) {
  try {
    let response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password,
        authenticate: "user"
      })
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

async function getScheduleDatas(authenticationToken, url) {
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authenticationToken
        // "Content-Type": "application/json"
      }
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

export { verifyLoginCredentials, getScheduleDatas };
