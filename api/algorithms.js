import { handleResponse, handleError } from "./apiUtils";

export function getEdaData(
  symbol,
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url =
    "https://alphafinanceapi.herokuapp.com/eda?symbol=" + symbol;

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}
