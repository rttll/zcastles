import service from './_service';

export default function foo(request, response) {
  service();
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
