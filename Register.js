import React from "react";
import { useFormik } from "formik";
import "./Styles.css";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
const onSubmit = (event) => {
  event.preventDefault();
  console.log("we are (on)Submit");
  fetch("http://localhost:8080/api/user/create", {
    method: "POST",
    body: JSON.stringify(initialValues),
    headers: {
      //"Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Succes");
      } else {
        console.log(res);
        const error = new Error(res);
        throw error;
      }
    })
    .catch((err) => {
      console.error(err.value);
      alert("Error logging in please try again");
    });
};

const validate = (values) => {
  let error = {};
  if (!values.username) {
    error.username = "This is required";
  }

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
function Register() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div className="theRegister">
      <form onSubmit={onSubmit}>
        <div className="theFormRegister">
          <label text="username">Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
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
export default Register;
