import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Yup from "yup";
import { useAuth, useAuthActions } from "../../Context/AuthProvider";
import loginUser from "../../httpServices/loginService";
import Input from "../utils/Input";
import { useQuery } from "../../hooks/useQuery";
import "./Login.css";
// 1. managing state
const initialValues = {
  email: "",
  password: "",
};

// 3. validation - error messages
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const inputs = [
  { label: "Email", name: "email", type: "email" },
  { label: "Password", type: "password", name: "password" },
];

const Login = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);

  const [message, setMessage] = useState({
    messageText: "",
    messageError: false,
  });

  // 2. handling form submission
  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      setMessage({
        ...message,
        messageText: `Wellcome to our Website ${data.name} !`,
        messageError: false,
      });
      alert(JSON.stringify(`Wellcome to our Website ${data.name} !`));
      history.push(redirect);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage({
        ...message,
        messageText: error.response.data.message,
        messageError: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        {inputs.map((input) => (
          <Input {...input} key={input.name} formik={formik} />
        ))}
        <div>
          <button
            type="submit"
            className="btn primary"
            disabled={!formik.isValid}
          >
            Login
          </button>
        </div>
        {message && (
          <p
            className={message.messageError ? "errorMessage" : "successMessage"}
          >
            {message.messageText}
          </p>
        )}
        <div className="loginLink">
          <Link to={`/signup?redirect=${redirect}`}>
            <p>Not Signup yet ?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
