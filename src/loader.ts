import { LoaderCallBack } from './types';

export default function loader(url: string, callback?: LoaderCallBack): Promise<void | Response> {
  return fetch(url)
    .then((response) => {
      if (response.ok && response.headers.get('Content-Type')?.match('application/json')) {
        return response.json();
      } else {
        console.log(response.headers.get('Content-Type'));
        throw new Error(`Unexpected response status ${response.status} or content type`);
      }
    })
    .then((data: object) => callback && callback(data))
    .catch((error: Error) => console.log(error.message));
}
