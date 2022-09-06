import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
socket.on("connect", () => {
  console.log(socket.id);
});

   

export default socket;