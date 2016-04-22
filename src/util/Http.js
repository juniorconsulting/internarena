export function checkStatus(response) {
  if (response.status < 200 || response.status > 300) {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}
