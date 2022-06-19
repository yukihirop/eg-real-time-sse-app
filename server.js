const { rmSync } = require('fs')
const http = require('http')

http.createServer((req, res) => {
  console.log("Requested url: " + req.url)

  const eventHistory = []

  req.on('close', () => {
    if(!res.finished) {
      console.log("Stopped sending events.")
      res.end()
    }
  })

  if(req.url.toLowerCase() === '/events') {
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      "Access-Control-Allow-Origin": "*"
    })

    checkConnectionToRestore(req, req, eventHistory)
    sendEvents(res, eventHistory)
  } else {
    res.writeHead(404);
    res.end()
  }
}).listen(5000, ()=>{
  console.log("Server running at http://127.0.0.1:5000/")
})


function sendEvents(res, eventHistory) {
  setTimeout(() => {
    if(!res.finished) {
      const eventString = 'id: 1\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landing"}\n\n';
      res.write(eventString)
      eventHistory.push(eventString)
    }
  }, 3000)

  setTimeout(() => {
    if(!res.finished) {
      const eventString = 'id: 2\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landed"}\n\n';
      res.write(eventString)
      eventHistory.push(eventString)
    }
  }, 6000)

  setTimeout(() => {
    if(!res.finished) {
      const eventString = 'id: 3\nevent: flightRemoval\ndata: {"flight": "I768"}\n\n';
      res.write(eventString)
      eventHistory.push(eventHistory)
    }
  }, 9000)

  setTimeout(() => {
    if(!res.finished) {
      const eventString = "id: 4\nevent: closedConnection\ndata: \n\n";
      res.write(eventString)
      eventHistory.push(eventString)
    }
  }, 12000)
}

function checkConnectionToRestore(req, res, eventHistory) {
  if(res.headers['last-event-id']) {
    const eventId = parseInt(res.headers['last-event-id'])
    const eventsToReSend = eventHistory.filter(e => e.id > eventId)

    eventsToReSend.forEach(e => {
      if (!res.finished){
        res.write(e)
      }
    })
  }
}