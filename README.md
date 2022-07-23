# Server-Sent Events (SSE)

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
curl -H Accept:text/event-stream http://localhost:3001/events
```

### Credits

[Digital Ocean](https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app)
