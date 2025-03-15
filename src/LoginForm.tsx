import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './LoginForm.css'; // Import modern CSS file

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const dbValues: LoginFormValues = {
    username: 'admin',
    password: 'password123',
  };

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const onSubmit = (
    _values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    setLoggedIn(true);
  };

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username !== dbValues.username) {
      errors.username = 'Username is incorrect';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password !== dbValues.password) {
      errors.password = 'Password is incorrect';
    }

    return errors;
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <div className="modern-login-container">
      {!loggedIn && (
        <div className="modern-login-card">
          <h2 className="modern-login-title">Login</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
          >
            {({ isSubmitting }) =>
              !isSubmitting && (
                <Form className="modern-login-form">
                  <div className="modern-form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      type="text"
                      name="username"
                      className="modern-form-control"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="modern-error-message"
                    />
                  </div>
                  <div className="modern-form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="modern-form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="modern-error-message"
                    />
                  </div>
                  <button type="submit" className="modern-submit-button">
                    Submit
                  </button>
                </Form>
              )
            }
          </Formik>
        </div>
      )}
      {loggedIn && (
        <div className="modern-login-card">
          <h2 className="modern-login-title">You are logged in</h2>
          <button type="submit" onClick={logOut} className="modern-submit-button">
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;