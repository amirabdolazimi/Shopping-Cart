import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../utils/Input";
import "./Signup.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import signupService from "../../httpServices/signupService";
import { useEffect, useState } from "react";
import { useAuth, useAuthActions } from "../../Context/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
// 1. managing state
const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConfirm: "",
};

// 3. validation - error messages
const PhoneRegex = /^[0-9]{11}$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .required("PhoneNumber is Required")
    .matches(PhoneRegex, "Phone number is not valid"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be match")
    .required("PasswordConfrimation is Required"),
});

const inputs = [
  { label: "Name", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "PhoneNumber", name: "phoneNumber", type: "tel" },
  { label: "Password", type: "password", name: "password" },
  {
    label: "Password Confirmation",
    type: "password",
    name: "passwordConfirm",
  },
];

const Signup = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);
  useEffect(() => {}, []);
  const [message, setMessage] = useState({
    messageText: "",
    messageError: false,
  });

  // 2. handling form submission
  const onSubmit = async (values) => {
    try {
      const { name, email, password, phoneNumber } = values;
      const { data } = await signupService({
        name,
        email,
        password,
        phoneNumber,
      });
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
            Signup
          </button>
        </div>
        {message && (
          <p
            className={message.messageError ? "errorMessage" : "successMessage"}
          >
            {message.messageText}
          </p>
        )}
        <div className="signupLink">
          <Link to={`/login?redirect=${redirect}`}>
            <p>Already Signup ?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Signup);
