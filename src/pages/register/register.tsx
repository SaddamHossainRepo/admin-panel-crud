import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import "./Register.css";
import Swal from "sweetalert2";
import { Route, useNavigate, BrowserRouter as Router } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result", result);
    if (!result.token) {
      Swal.fire(result.message);
    }
    if (result.permissions[0] !== "ADMIN") {
      Swal.fire("Please Login as Admin");
    } else {
      localStorage.setItem("user-info", JSON.stringify(result));
      setIsLoggedin(true);
      history("/");
      Swal.fire("Successfully logged in");
      console.log("Successfully logged in", email, password);
    }

    // router.push('/dashboard');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line prefer-const
    let item = { name, email, password };
    // console.log(item);
    const response = await fetch("http://localhost:9000/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("from register user", result.user.role);
    if (!result.tokens) {
      Swal.fire(result.message);
    } if (result.user.role !== "ADMIN") {
      Swal.fire("Please Login as Admin");
    } else {
      localStorage.setItem("user-info", JSON.stringify(result));
      Swal.fire(`Welcome ${result.user.name}`);
      history("/products");
      console.log(result);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Your authentication logic goes here
    // For simplicity, let's just log the credentials
    console.log("Email:", email);
    console.log("Password:", password);

    // Clear form fields and error message after successful login
    setEmail("");
    setPassword("");
    setError("");
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              className="register-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* <div className="login-container">
        <form className="login-form main-bg" onSubmit={handleClick}>
          <h2>Register</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              className="text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div> */}
    </div>
  );
};

export default Register;
