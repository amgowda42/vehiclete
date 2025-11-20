//data fetching and creating server.

//get

async function main() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);
}

//post

const data = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

async function main() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'User-Agent': 'undici-stream-example',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  });

  const resData = await res.json();
  console.log(resData);
}
main().catch(console.error);

//create server

import { createServer } from 'http';

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(4000, () => console.log('Server running at http://localhost:4000/'));
