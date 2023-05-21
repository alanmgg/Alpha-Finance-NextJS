import { handleResponse, handleError } from "./apiUtils";

export function createUser(
  form,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url = "https://alphafinanceapi.herokuapp.com/users";

  const text_config = {
    name: form.name,
    last_name: form.lastName,
    email: form.email,
    phone: form.phone,
    password: form.password
  };

  return fetch(endpoint_url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(text_config)
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function authUser(
  form,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.herokuapp.com/users/" +
    form.email +
    "/" +
    form.password;

  return fetch(endpoint_url, {
    method: "POST"
  })
    .then(responseHandler)
    .catch(errorHandler);
}
