import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, ErrorMessageProps } from "formik";
import * as Yup from "yup";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  onSubmit: (values: Values) => void;
  isSignUp?: boolean;
}

interface Values {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    letter: /[a-zA-Z]/.test(password),
    number: /\d/.test(password),
    specialCharacter: /[\W_]/.test(password),
  };
};

const StyledErrorMessage: React.FC<ErrorMessageProps> = (props) => (
  <div style={{ minHeight: "1.5rem" }}>
    <ErrorMessage {...props} component="div" className="text-red-500 text-sm" />
  </div>
);

const AuthForm: React.FC<Props> = ({ onSubmit, isSignUp = true }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const initialValues: Values = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = isSignUp
    ? Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Must be at least 8 characters")
          .matches(/[a-zA-Z]/, "Must contain at least one letter")
          .matches(/\d/, "Must contain at least one number")
          .matches(/[\W_]/, "Must contain at least one special character"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Required"),
      })
    : Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
      });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, errors, touched }) => {
        const passwordValidations = validatePassword(values.password);

        return (
          <Form style={{ width: "100%", maxWidth: 400 }}>
            {isSignUp && (
              <Box sx={{ mb: 2, minHeight: 70 }}>
                <Field
                  name="name"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name && touched.name}
                  inputProps={{ maxLength: 15 }}
                />
                <StyledErrorMessage name="name" />
              </Box>
            )}
            <Box sx={{ mb: 2, minHeight: 70 }}>
              <Field
                name="email"
                as={TextField}
                label="Business Email"
                variant="outlined"
                fullWidth
                error={!!errors.email && touched.email}
              />
              <StyledErrorMessage name="email" />
            </Box>
            <Box sx={{ mb: 1, position: "relative", minHeight: 70 }}>
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password && touched.password}
              />
              <StyledErrorMessage name="password" />
              {isSignUp && (
                <>
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => setShowTooltip(!showTooltip)}
                  >
                    <AiOutlineQuestionCircle />
                    {showTooltip && (
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 10,
                          p: 2,
                          mt: 1,
                          bgcolor: "white",
                          border: "1px solid gray",
                          borderRadius: 1,
                          boxShadow: 3,
                          right: 0,
                          top: "calc(100% + 10px)",
                          maxWidth: 300,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          Password Requirements:
                        </Typography>
                        <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                          <li
                            style={{
                              color: passwordValidations.length
                                ? "green"
                                : "red",
                            }}
                          >
                            Minimum length of 8 characters
                          </li>
                          <li
                            style={{
                              color: passwordValidations.letter
                                ? "green"
                                : "red",
                            }}
                          >
                            Contains at least 1 letter
                          </li>
                          <li
                            style={{
                              color: passwordValidations.number
                                ? "green"
                                : "red",
                            }}
                          >
                            Contains at least 1 number
                          </li>
                          <li
                            style={{
                              color: passwordValidations.specialCharacter
                                ? "green"
                                : "red",
                            }}
                          >
                            Contains at least 1 special character
                          </li>
                        </ul>
                      </Box>
                    )}
                  </span>
                </>
              )}
            </Box>
            {isSignUp && (
              <Box sx={{ mb: 2, minHeight: 70 }}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.confirmPassword && touched.confirmPassword}
                />
                <StyledErrorMessage name="confirmPassword" />
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    style={{
                      color: "#4D89FD",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{
                      color: "#2cbda9",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </Typography>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthForm;
