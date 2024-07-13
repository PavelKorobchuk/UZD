import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useRegisterMutation } from "../../redux/api";

import { registerFormValidationSchema } from "../../utils";

import { WithThemeProviderLayout } from "../../layouts";

export function Register() {
  const navigate = useNavigate();
  const [register, { isLoading, data, error }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: registerFormValidationSchema,
    onSubmit: async (formValue) => {
      try {
        const { username, email, password } = formValue;
        await register({ username, email, password }).unwrap();
        navigate("/");
      } catch (err) {
        console.log("error==>", err);
      }
    },
  });

  return (
    <WithThemeProviderLayout>
      <>
        {error ? <>Error occured!</> : null}
        <h1>Register</h1>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="User Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              disabled={isLoading}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </>
    </WithThemeProviderLayout>
  );
}
