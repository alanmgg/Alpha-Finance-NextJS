import { handleResponse, handleError } from "./apiUtils";

export function getFilesApi(
  idUser,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url = "https://alphaminingapi.herokuapp.com/get-files/" + idUser;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function deleteFileApi(
  idUser,
  filename,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/delete-file/" +
    idUser +
    "/" +
    filename;

  return fetch(endpoint_url, {
    method: "DELETE"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function uploadFileApi(
  file,
  idUser,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/upload-file/" + idUser;
  var data = new FormData();
  data.append("file", file);
  return fetch(endpoint_url, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" }
  })
    .then(responseHandler)
    .catch(errorHandler);
}
