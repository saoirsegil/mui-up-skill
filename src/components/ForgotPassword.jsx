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
  sendAuthPasswordResetEmail,
  signInWithFacebookPopup,
} from "../utils/Firebase.utils";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
};

const ForgotPassword = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const logFacebookUser = async () => {
    const { user } = signInWithFacebookPopup();
    await createUserDocumentFromAuth(user);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await sendAuthPasswordResetEmail(email);

      setCurrentUser(user);
      resetFormFields();
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ [name]: value });
  };

  return (
    <Box style={image.boxContainer} padding="50px">
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Box display="flex">
            <ArrowBackIosIcon
              sx={{ cursor: "pointer", color: "gray" }}
              onClick={() => navigate("/sign-in")}
            />
          </Box>
          <Box>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <EggOutlinedIcon />
              </Avatar>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Forgot Password
              </Typography>
            </Grid>
          </Box>
          <Box mt={5}>
            <TextField
              onChange={handleChange}
              name="email"
              value={email}
              variant="standard"
              label="Enter Your Email"
              fullWidth
              required
            />
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
                Send
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
                onClick={logFacebookUser}
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

export default ForgotPassword;
