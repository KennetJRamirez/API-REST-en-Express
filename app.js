import Server from "./models/server.js";

const server = new Server();

server.listen();

if (!process.env.VERCEL) {
  server.listen();
}

export default server.app;
