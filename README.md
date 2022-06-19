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