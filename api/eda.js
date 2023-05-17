import { handleResponse, handleError } from "./apiUtils";

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

export function getCorrData(
  symbol,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.vercel.app/eda-corr-data?symbol=" + symbol;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}
