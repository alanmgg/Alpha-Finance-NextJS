import { handleResponse, handleError } from "./apiUtils";

export function getInformation(
  symbol,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.vercel.app/finance-information/" + symbol;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getMainData(
  symbol,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.vercel.app/eda-main-data?symbol=" + symbol;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getDescriptionData(
  symbol,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.vercel.app/eda-description-data?symbol=" + symbol;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}

export function getDescribeData(
  symbol,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.vercel.app/eda-describe-data?symbol=" + symbol;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}
