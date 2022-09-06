//import dependencies and reactHooks
import React from "react";
//import stylesheet
import "./CreateRoom.scss";
//import person icon
import { BsFillPersonPlusFill } from "react-icons/bs";
//Formik is a library that helps us to create controller forms
import { Formik, Form, Field, ErrorMessage } from "formik";
// socket.io client for communicating with the server
import socket from "../../../WebSockets/WebSockets";
//import icon to close modal
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Loading } from "../../UI/awaitRoom/Loading";
import { AwaitRoom } from "../../UI/awaitRoom/AwaitRoom";

//return the component
export const CreateRoom = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [roomId, setRoomId] = React.useState("");

  const handlerState = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="createroom-content" onClick={() => handlerState()}>
        <h2>Crea una partida</h2>
        <BsFillPersonPlusFill />
      </div>
      {showModal && (
        <div className="createroom-container">
          <Formik
            initialValues={{
              username: "",
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
              console.log(values);
              //socket emit to create Room
              socket.emit("room:create", values.username, (response) => {
                //validate if the room was created
                if (response.code === 200) {
                  //close primaru modal
                  setShowModal(false);
                  //if the room was created, show the loading component
                  setShowLoading(true);
                  //set the room id
                  setRoomId(response.roomId);
                }
              });
            }}
          >
            {({ errors }) => (
              <Form className="action-form">
                <div className="header-modal">
                  <AiOutlineCloseCircle onClick={() => handlerState()} />
                </div>
                <div className="header-modal"></div>
                <h1>Crea una partida</h1>
                <Field type="text" name="username" />
                <ErrorMessage
                  name="username"
                  component={() => <p>{errors.username}</p>}
                />
                <button type="submit">Enviar</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {showLoading && <AwaitRoom RoomId={roomId} />}
    </>
  );
};
