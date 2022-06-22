import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import EggOutlinedIcon from "@mui/icons-material/EggOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import BG from "../asset/BG.jpg";
import { UserContext } from "../context/UserContext";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserhWithEmailAndPassword,
} from "../utils/Firebase.utils";

const image = {
  boxContainer: {
    backgroundImage: `url(${BG})`,
    height: "92vh",
    width: "100%",
  },
};

const paperStyle = {
  padding: "40px",
  height: "80vh",
  width: "400px",
  margin: "auto",
  fontWeight: "400px",
};

const avatarStyle = {
  backgroundColor: "#13b1c2",
  margin: "5px auto",
};

const buttonStyle = {
  borderRadius: "30px",
  backgroundColor: "#13b1c2",
  marginBottom: "1.5rem",
};

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserhWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/invalid-email":
          alert("incorrect email");
          break;
        default:
          console.log(error);
      }
      if (error.code === "auth/wrong-password")
        alert("incorrect password for email");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Box style={image.boxContainer} padding="50px">
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <EggOutlinedIcon />
              </Avatar>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Welcome back!
              </Typography>
            </Grid>
          </Box>
          <Box margin="20px auto">
            <TextField
              onChange={handleChange}
              name="email"
              value={email}
              variant="standard"
              label="Username"
              fullWidth
              required
            />
          </Box>
          <Box>
            <TextField
              onChange={handleChange}
              name="password"
              value={password}
              variant="standard"
              label="Password"
              type="password"
              fullWidth
              required
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" margin="8px 0">
            <Typography
              fontSize={14}
              variant="p"
              component="span"
              sx={{ cursor: "pointer", color: "gray" }}
            >
              Forgot password?
            </Typography>
          </Box>
          <Box sx={{ margin: "1rem 0" }}>
            <Button
              type="submit"
              style={buttonStyle}
              variant="contained"
              size="large"
              fullWidth
            >
              <Typography variant="h6" component="h1">
                Sign in
              </Typography>
            </Button>
          </Box>
          <Box sx={{ margin: "1rem 0" }}>
            <Divider>
              <Typography
                color="gray"
                fontSize={14}
                variant="p"
                component="span"
              >
                or
              </Typography>
            </Divider>
          </Box>
          <Box display="flex" justifyContent="center">
            <Grid>
              <FacebookOutlinedIcon
                sx={{ fontSize: "3rem", color: "#2727e8", cursor: "pointer" }}
              />
              <GoogleIcon
                sx={{
                  fontSize: "2.6rem",
                  color: "white",
                  backgroundColor: "#ff5700",
                  borderRadius: "30px",
                  margin: "3px 32px",
                  cursor: "pointer",
                }}
                onClick={logGoogleUser}
              />
              <GitHubIcon
                sx={{
                  fontSize: "2.6rem",
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  margin: "3px 5px",
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Box>
          <Box
            marginTop="2rem"
            display="flex"
            justifyContent="center"
            flexDirection="row"
          >
            <Typography fontSize={14} variant="p" component="span" mt={1.2}>
              Don't have an account?
            </Typography>
            <Box>
              <Button
                onClick={() => navigate("/sign-up")}
                color="inherit"
                sx={{ color: "#13b1c2", cursor: "pointer" }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;
