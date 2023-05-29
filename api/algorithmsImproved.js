import { handleResponse, handleError } from "./apiUtils";

export function getEdaImprovedData(
  idUser,
  fileName,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/eda-improved/" +
    idUser +
    "/" +
    fileName;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}
