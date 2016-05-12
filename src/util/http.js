export function checkStatus(response) {
  if (response.status < 200 || response.status > 300) {
    var error = new Error(response.statÆ_usText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

export function camelizeProps(json, delimiter = "_") {
  let newObj = {};
  for (var key in json) {
    if (!json.hasOwnProperty(key)) {
      continue;
    }
    let split = key.split(delimiter);
    let newKey = split[0];
    if (split.length > 1) {
      for (var word of split.slice(1, split.length + 1)) {
        newKey += word.charAt(0).toUpperCase();
      }
    }
    newObj[newKey] = json[key];
  }
  return newObj;
}
