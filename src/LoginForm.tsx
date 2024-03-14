import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './LoginForm.css'; // Import CSS file for styling

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const dbValues: LoginFormValues ={
    username: "admin",
    password: "password123"
  }

  const initialValues: LoginFormValues = {
    username: '',
    password: ''
  };

  const onSubmit = (_values: LoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      setSubmitting(false);
      setLoggedIn(true);
  };

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username !== dbValues.username) {
      errors.username = "Username is not correct";
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password !== dbValues.password) {
      errors.password = "Password is not correct";
    }

    return errors;
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <div className="login-form-container">
        {!loggedIn && <>
        <h1>Login</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ isSubmitting }) => ( !isSubmitting &&
            <Form className="login-form">
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" className="form-control"/>
                <ErrorMessage name="username" component="div"  className="error-message" />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div"  className="error-message" />
                </div>
                <button type="submit"  className="submit-button">
                Submit
                </button>
            </Form>
            )}
        </Formik>
      </>}
      {loggedIn &&
       <>
       <h2>You logged in</h2>
       <button type="submit" onClick={logOut}  className="submit-button">
                Log out
                </button>
       </>
       }
    </div>
  );
};

export default LoginForm;