import React, { useState, useCallback } from "react";
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  //useCallback to memoize the functions; empty dependency array
  const handleUsernameChange = useCallback(e => {
    setUsername(e.target.value);
  }, []);

  const handleRoomNameChange = useCallback(e => {
    setRoomName(e.target.value);
  }, []);

  //When the user submits the form
  //we want to send the username and room name to the server to exchange for an access token we can use to enter the room
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.parse({
          identity: username,
          room: roomName
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => res.json());
      setToken(data.token);
    },
    [username, roomName]
  );

  //Logout functionality to eject the user from a room, back to the lobby - set the token to null.
  const handleLogout = useCallback(e => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
