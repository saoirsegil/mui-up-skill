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
} from "@mui/material";

import EggOutlinedIcon from "@mui/icons-material/EggOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import BG from "../asset/BG.jpg";
import {
  createAuthUserhWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/Firebase.utils";
import { UserContext } from "../context/UserContext";

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
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }
    try {
      const { user } = await createAuthUserhWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already exist");
      } else {
        console.log("user creation encountered an error", error);
      }
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
                Create an account
              </Typography>
            </Grid>
          </Box>
          <Box margin="20px auto">
            <TextField
              onChange={handleChange}
              name="displayName"
              value={displayName}
              variant="standard"
              label="Display Name"
              type="text"
              fullWidth
              required
            />
          </Box>
          <Box margin="20px auto">
            <TextField
              onChange={handleChange}
              name="email"
              value={email}
              variant="standard"
              label="Email"
              type="email"
              fullWidth
              required
            />
          </Box>
          <Box margin="20px auto">
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
          <Box margin="20px auto">
            <TextField
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
              variant="standard"
              label="Confirm Password"
              type="password"
              fullWidth
              required
            />
          </Box>
          <Box sx={{ margin: "3rem 0" }}>
            <Button
              type="submit"
              style={buttonStyle}
              variant="contained"
              size="large"
              fullWidth
            >
              <Typography variant="h6" component="h1">
                Sign up
              </Typography>
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
