# eg-real-time-sse-app

https://auth0.com/blog/jp-developing-real-time-web-applications-with-server-sent-events/
https://github.com/andychiare/server-sent-events

```bash
# server
node server.js

# client
yarn dev
```

## client

<img width="464" alt="image" src="https://user-images.githubusercontent.com/11146767/174466774-e2dcd2e3-ccdc-457f-9bea-dea3809e3900.png">

## server

life cycle

```bash
$ curl http://localhost:5000/events
id: 1
event: flightStateUpdate
data: {"flight": "I768", "state": "landing"}

id: 2
event: flightStateUpdate
data: {"flight": "I768", "state": "landed"}

id: 3
event: flightRemoval
data: {"flight": "I768"}

id: 4
event: closedConnection
data:
```

## Docs

- https://html.spec.whatwg.org/multipage/server-sent-events.html