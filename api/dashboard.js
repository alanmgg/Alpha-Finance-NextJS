import { handleResponse, handleError } from "./apiUtils";

export function getCompanies(
  responseHandler = handleResponse,
  errorHandler = handleError
) {
  let endpoint_url = "https://alphaminingapi.herokuapp.com/finance-companies";

  return fetch(endpoint_url, {
    method: "GET"
  })
    .then(responseHandler)
    .catch(errorHandler);
}
