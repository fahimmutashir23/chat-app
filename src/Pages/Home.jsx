import { useEffect, useState } from "react";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5000');

const Home = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    function sendMessage() {
      socket.emit("send_message", { message: message });
    }
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }, [socket]);

  return (
    <div>
      <input
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>
        Message: {messageReceived}</h1>
    </div>
  );
};

export default Home;
