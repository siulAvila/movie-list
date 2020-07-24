import { from, Observable, throwError } from 'rxjs';

export const apiRequest = (endpoint?: string): Observable<any> => {
  return from(
    fetch(`http://localhost:3000/${endpoint}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return handleError(response);
      })
      .catch((error) => {
        return throwError(error);
      })
  );
};

const handleError = (response: any) => {
  if (response.error) {
    throw response.error;
  }
  return response;
};
