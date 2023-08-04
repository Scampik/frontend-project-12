import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import loginImage from '../assets/login.jpeg';

const Login = () => (
  <div>
    <h1>Signup</h1>
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={loginImage}
          className="rounded-circle" alt="Войти"/>
    </div>
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field 
          name="name"
          placeholder="Ваш ник" />
          {errors.name && touched.name ? (
            <div>{errors.name}</div>
          ) : null}
          <Field 
           type="password"
           name="password"
           placeholder="Пароль"
           className={`form-control ${
             touched.password && errors.password ? "is-invalid" : ""
           }`}/>
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;