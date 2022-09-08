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
import { AwaitRoom } from "../../UI/awaitRoom/AwaitRoom";
import UserContext from "../../../UserContext/UserContext";

//return the component
export const CreateRoom = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  const { changeData } = React.useContext(UserContext);

  const validateKey = (event) => {
    let charCode = event.keyCode;
    if (charCode === 13) {
      SubmitEvent();
    }
  };

  const handlerState = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="createroom-content" onClick={() => handlerState()}>
        <BsFillPersonPlusFill className="action-icon" />

        <h2>Create</h2>
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
                errors.username = "Please enter a name";
                //username regex validate
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.username)) {
                errors.username =
                  "the name can only contain letters and spaces";
              }
              //error return to component
              return errors;
            }}
            //send Form data to server
            onSubmit={(values) => {
              //socket emit to create Room
              socket.emit("room:create", values.username, (response) => {
                //validate if the room was created

                if (response.code === 200) {
                  //set the new user data
                  changeData(values.username, response.roomId, "ownerP");
                  //close primary modal
                  setShowModal(false);
                  //if the room was created, show the loading component
                  setShowLoading(true);
                }
              });
            }}
          >
            {({ errors }) => (
              <Form className="action-form">
                <div className="header-modal">
                  <AiOutlineCloseCircle
                    onClick={() => handlerState()}
                    className="icon-header"
                  />
                </div>
                <div className="form-content">
                  <h1 className="title">Create a room</h1>
                  <Field
                    type="text"
                    name="username"
                    placeholder="usename"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="username"
                    component={() => <p className="field-error">{errors.username}</p>}
                  />
                  <button onKeyUp={(event => validateKey(event))} className="form-button" type="submit">
                    create
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {showLoading && <AwaitRoom role="owner" />}
    </>
  );
};
