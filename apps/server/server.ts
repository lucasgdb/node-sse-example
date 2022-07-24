import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/status", (_request, response) =>
  response.json({ clients: clients.length })
);

type Client = {
  id: number;
  response: Response;
};

type Fact = { id: string } & Request["body"];

let clients: Client[] = [];

type Fact = Request["body"];

const facts: Fact[] = [];

function eventsHandler(request: Request, response: Response) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient: Client = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} connection closed.`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

app.get("/events", eventsHandler);

function sendEventsToAll(newFact: Fact) {
  clients.forEach((client) =>
    client.response.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}

async function addFact(request: Request, response: Response) {
  const newFact: Fact = { id: randomUUID(), ...request.body };

  facts.push(newFact);

  response.json(newFact);

  return sendEventsToAll(newFact);
}

app.post("/fact", addFact);

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
