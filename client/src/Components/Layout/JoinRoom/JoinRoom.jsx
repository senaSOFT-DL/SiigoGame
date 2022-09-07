//import dependencies and reactHooks
import React from "react";
import { AwaitRoom } from "../../UI/awaitRoom/AwaitRoom";
//import group icon
import { HiUserGroup } from "react-icons/hi";
//import stylesheet
import "./JoinRoom.scss";
//Formik is a library that helps us to create controller forms
import { Formik, Form, Field, ErrorMessage } from "formik";
// socket.io client for communicating with the server
import socket from "../../../WebSockets/WebSockets";
//import icon to close modal
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomContext from "../../../roomContext/RoomContext";

//return the component
export const JoinRoom = () => {
  const [showModal, setShowModal] = React.useState(false);

  const { changeData } = React.useContext(RoomContext);

  const [userJoined, setUserJoined] = React.useState(false);

  const handlerState = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="joinroom-content" onClick={() => handlerState()}>
        <HiUserGroup className="action-icon" />

        <h2>Join</h2>
      </div>
      {showModal && (
        <div className="joinroom-container">
          <Formik
            initialValues={{
              username: "",
              room: "",
            }}
            validate={(values) => {
              let errors = {};
              // username validate
              if (!values.username) {
                errors.username = "Por favor ingresa un nombre";
                //username regex validate
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.username)) {
                errors.username =
                  "El nombre solo puede contener letras y espacios";
              }
              //error return to component
              return errors;
            }}
            //send Form data to server
            onSubmit={async (values) => {
              //socket emit to joined Room
              changeData(values.room);
              await socket.emit("user:join", values, (response) => {
                console.log(response);
                //validate response codes from server
                if (response.code === 404) {
                  console.log("room does not exist");
                } else if (response.code === 600) {
                  console.log("user already in room");
                } else if (response.code === 601) {
                  console.log("room fulled");
                } else {
                  //user joined to room
                  console.warn("user joined room");
                  setUserJoined(true);
                }
              });
            }}
          >
            {({ errors }) => (
              <Form className="action-form">
                {" "}
                <div className="header-modal">
                  <AiOutlineCloseCircle
                    className="icon-header"
                    onClick={() => handlerState()}
                  />
                </div>
                <div className="form-content">
                  <h1>Unirse a una partida</h1>
                  <Field type="text" name="username" placeholder="username" />
                  <ErrorMessage
                    name="username"
                    component={() => <p>{errors.username}</p>}
                  />
                  <Field type="text" name="room" placeholder="roomId" />
                  <button className="join-button" type="submit">join</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {userJoined && <AwaitRoom role="player" />}
    </>
  );
};
