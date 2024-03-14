import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
      errors.password = "Username is not correct";
    }

    return errors;
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <div>
        {!loggedIn && <>
        <h1>Login</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ isSubmitting }) => ( !isSubmitting &&
            <Form>
                <div>
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">
                Submit
                </button>
            </Form>
            )}
        </Formik>
      </>}
      {loggedIn &&
       <>
       <h2>You logged in</h2>
       <button type="submit" onClick={logOut}>
                Log out
                </button>
       </>
       }
    </div>
  );
};

export default LoginForm;