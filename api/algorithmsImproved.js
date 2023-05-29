import { handleResponse, handleError } from "./apiUtils";

export function getMainImprovedData(
  idUser,
  fileName,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/main-data/" + idUser + "/" + fileName;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

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

export function getAcpImprovedData(
  idUser,
  fileName,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/acp-improved/" +
    idUser +
    "/" +
    fileName;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getForecastAdImprovedData(
  idUser,
  fileName,
  columnName,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/forecast-ad-improved/" +
    idUser +
    "/" +
    fileName +
    "/" +
    columnName;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getForecastBaImprovedData(
  idUser,
  fileName,
  columnName,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/forecast-ba-improved/" +
    idUser +
    "/" +
    fileName +
    "/" +
    columnName;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getForecastAdPronosticImprovedData(
  idUser,
  fileName,
  columnName,
  objectColumn,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/forecast-ad-pronostic-improved/" +
    idUser +
    "/" +
    fileName;

  const text_config = {
    column_dependient: columnName,
    column: objectColumn
  };

  return fetch(endpoint_url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(text_config)
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getForecastBaPronosticImprovedData(
  idUser,
  fileName,
  columnName,
  objectColumn,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphaminingapi.herokuapp.com/forecast-ba-pronostic-improved/" +
    idUser +
    "/" +
    fileName;

  const text_config = {
    column_dependient: columnName,
    column: objectColumn
  };

  return fetch(endpoint_url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(text_config)
  })
    .then(responseHandler)
    .catch(errorHandler);
}
