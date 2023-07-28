import { WebSocketServer } from 'ws';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';

// Spinning the http server and the WebSocket server
const server: http.Server = http.createServer();
const wsServer: WebSocketServer = new WebSocketServer({ server });
const PORT = 3000;

const clients: Record<string, WebSocket> = {};
const users: Record<string, any> = {};

// The current editor content
let editorContent: any = null; // FIX: type any
// User activity history
const userActivity: string[] = [];

// Event types
const typesDef = {
  USER_EVENT: 'userevent',
  CONTENT_CHANGE: 'contentchange',
};

const broadcastMessage = (json: any) => {
  // Send the current data to all connected clients
  const data = JSON.stringify(json);
  for (const userId in clients) {
    const client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
  console.log('hit broadcastMessage');
};

const handleMessage = (message: string, userId: string) => {
  const dataFromClient = JSON.parse(message.toString());
  const json: any = { type: dataFromClient.type }; // FIX TYPE
  if (dataFromClient.type === typesDef.USER_EVENT) {
    users[userId] = dataFromClient;
    userActivity.push(
      `${dataFromClient.username} joined to edit the document`
    );
    json.data = { users, userActivity };
  } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    editorContent = dataFromClient.content;
    json.data = { editorContent, userActivity };
  }
  broadcastMessage(json);
};

const handleDisconnect = (userId: string) => {
  console.log(`${userId} disconnected.`);
  const json: any = { type: typesDef.USER_EVENT }; // FIX TYPE
  const username = users[userId]?.username || userId;
  userActivity.push(`${username} left the document`);
  json.data = { users, userActivity };
  delete clients[userId];
  delete users[userId];
  broadcastMessage(json);
};

// FIX type
wsServer.on('connection', (connection: any) => {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Received a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
  connection.on('message', (message: any) =>
    handleMessage(message, userId)
  );
  // User disconnected
  connection.on('close', () => handleDisconnect(userId));
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`);
});
