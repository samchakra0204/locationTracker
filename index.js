const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    console.log("connected");
    socket.on("send-location", function(data) {
        io.emit("recieve-location", {
            id: socket.id, ...data,
        });
    });
    socket.on("disconnect", function() {
      io.emit("user-disconnected", socket.id);
      console.log("disconnected");
    });
});

app.get('/', (req, res) => {
  res.render('index')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
