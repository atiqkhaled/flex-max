import WebSocket, { WebSocketServer } from 'ws';
import http from "http"

const server = http.createServer((req, response) => {

})

const wss = new WebSocketServer({ server })


wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message) => {
        console.log(message)
    })

    ws.send("accepted")
})

server.listen(7071, () => {
    console.log("server startd")
})