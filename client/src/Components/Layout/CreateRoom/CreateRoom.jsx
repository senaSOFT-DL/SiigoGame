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

//return the component
export const CreateRoom = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handlerState = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="joinroom-content" onClick={() => handlerState()}>
        <h2>Crea una partida</h2>
        <BsFillPersonPlusFill />
      </div>
      {showModal && (
        <div className="createroom-content">
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
              //socket emit to create Room
              socket.emit("create:room", values.username, (response) => {
                if (response.status === 200) {
                  console.log(response);
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
    </>
  );
};
