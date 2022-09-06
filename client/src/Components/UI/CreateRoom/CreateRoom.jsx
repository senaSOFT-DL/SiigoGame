//import dependencies and reactHooks
import React from "react";
//Formik is a library that helps us to create controller forms
import { Formik, Form, Field, ErrorMessage } from "formik";
// socket.io client for communicating with the server
import socket from "../../../WebSockets/WebSockets";

//return the component
export const CreateRoom = () => {
  return (
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
          errors.username = "El nombre solo puede contener letras y espacios";
        }
        //error return to component
        return errors;
      }}
      //send Form data to server
      onSubmit={(values, { resetForm }) => {
        resetForm();
        console.warn(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <Field type="text" name="username" />
          <ErrorMessage
            name="username"
            component={() => <p>{errors.username}</p>}
          />
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};
