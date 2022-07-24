# Server-Sent Events (SSE)

Server-Sent Events (SSE) is a [server push](https://en.wikipedia.org/wiki/Push_technology) technology enabling a client to receive automatic updates from a server via an HTTP connection, and describes how servers can initiate data transmission towards clients once an initial client connection has been established. They are commonly used to send message updates or continuous data streams to a browser client and designed to enhance native, cross-browser streaming through a JavaScript API called EventSource, through which a client requests a particular URL in order to receive an event stream. The EventSource API is standardized as part of HTML5 by the WHATWG. The mime type for SSE is text/event-stream.

## Requirements

- Docker
- cURL

### Development

- `yarn`: Installs all needed dependencies
- `yarn dev`: Starts the project in development mode
- Open at `http://localhost:8080`
- `yarn stop`: Stops the project

### Making a POST request to create a fact:

```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"info": "Shark teeth are embedded in the gums rather than directly affixed to the jaw, and are constantly replaced throughout life.", "source": "https://en.wikipedia.org/wiki/Shark"}'\
 -s http://localhost:3000/fact
```

### Testing with cURL:

```bash
curl -H Accept:text/event-stream http://localhost:3000/events
```

### Credits

[Digital Ocean](https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app)
