export default function loader(url: string): Promise<void | Response> {
  return fetch(url)
    .then((response) => {
      if (response.ok && response.headers.get('Content-Type')?.match('application/json')) {
        return response.json();
      } else {
        console.log(response.headers.get('Content-Type'));
        throw new Error(`Unexpected response status ${response.status} or content type`);
      }
    })
    .catch((error: Error) => console.log(error.message));
}
