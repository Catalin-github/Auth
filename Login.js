import React from "react";
import { useFormik } from "formik";
import "./Styles.css";
const initialValues = {
  email: "",
  password: "",
};
const onSubmit = (values) => {};
const validate = (values) => {
  let error = {};

  if (!values.email) {
    error.email = "Your email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(values.email)) {
    error.email = "Invalid email format";
  }

  if (!values.password) {
    error.password = "This is required";
  }
  return error;
};
function Login() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div className="theLogin">
      <form onSubmit={formik.handleSubmit}>
        <div className="theFormLogin">
          <label text="email">E-mail</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <label text="password">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Login;
