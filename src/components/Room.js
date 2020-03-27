import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Participant from "./Participant";

const Room = ({ roomName, token, handleLogout }) => {
  //connect to Twilio video service using token && roomName and store the values with useState
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  //add/remove participants from state
  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(user => user !== participant)
      );
    };
    //token and roomname to connect to Twilio Video service; set up a listener and update # of participants
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    //cleanup function for when disconnect
    return () => {
      //use callback version of setRoom above - passing a fn calls setRoom with previous value/existing room and set state to whatever we return
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function(
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]); //cleanup to avoid reconnected the exitted room upon each re-render

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
