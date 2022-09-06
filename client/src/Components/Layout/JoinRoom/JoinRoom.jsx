//import dependencies and reactHooks
import React from "react";
import { AwaitRoom } from '../../UI/awaitRoom/AwaitRoom'
//import group icon
import { GrGroup } from "react-icons/gr";
//import stylesheet
import "./JoinRoom.scss";
//Formik is a library that helps us to create controller forms
import { Formik, Form, Field, ErrorMessage } from "formik";
// socket.io client for communicating with the server
import socket from "../../../WebSockets/WebSockets";
//import icon to close modal
import { AiOutlineCloseCircle } from "react-icons/ai";

//return the component
export const JoinRoom = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [ userJoined , setUserJoined ] = React.useState(false);

  const handlerState = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="joinroom-content" onClick={() => handlerState()}>
        <h2>Entra a una partida</h2>
        <GrGroup />
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
            onSubmit={(values) => {
              //socket emit to joined Room
              console.warn(values);
              socket.emit("user:join", values, (response) => {
                if (response.code === 404) {
                  console.warn("room does not exist");
                } else if (response.code === 600) {
                  console.warn("user already in room");
                } else {
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
                  <AiOutlineCloseCircle onClick={() => handlerState()} />
                </div>
                <h1>Unirse a una partida</h1>
                <Field type="text" name="username" />
                <ErrorMessage
                  name="username"
                  component={() => <p>{errors.username}</p>}
                />
                <Field type="text" name="room" />
                <button type="submit">Enviar</button>
              </Form>
            )}
          </Formik>
        </div>
        
      )}
      {userJoined && <AwaitRoom userJoined={userJoined} role='owner' />}
      
    </>
  );
};
