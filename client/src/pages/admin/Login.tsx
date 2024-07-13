import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { registerFormValidationSchema } from "../../utils";

import { WithThemeProviderLayout } from "../../layouts";
import { useLoginMutation } from "../../redux/api";
import { log } from "console";
import { useLocalStorage } from "../../hooks";

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("userAuthData", null);
  const [login, { isLoading, data, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: registerFormValidationSchema,
    onSubmit: async (formValue) => {
      try {
        const { email, password } = formValue;
        await login({ email, password }).unwrap();

        navigate(`/user`);
      } catch (err) {
        console.log("error==>", err);
      }
    },
  });

  return (
    <WithThemeProviderLayout>
      <>
        <h1>Login</h1>
        <div>
          <form onSubmit={formik.handleSubmit}>
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
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </>
    </WithThemeProviderLayout>
  );
}
