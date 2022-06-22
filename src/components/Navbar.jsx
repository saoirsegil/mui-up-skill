import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { UserContext } from "../context/UserContext";
import { userSignOut } from "../utils/Firebase.utils";

import EggOutlinedIcon from "@mui/icons-material/EggOutlined";

const Navbar = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await userSignOut();
    setCurrentUser(null);
  };

  const style = {
    backgroundColor: "#333333",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={style}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <EggOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EGGRAMMER
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/")} color="inherit">
              Home
            </Button>
            <Button onClick={() => navigate("/feature")} color="inherit">
              Feature
            </Button>
            <Button onClick={() => navigate("/pricing")} color="inherit">
              Pricing
            </Button>
            <Button onClick={() => navigate("/about")} color="inherit">
              About
            </Button>
            {currentUser ? (
              <Button color="inherit" onClick={signOutHandler}>
                SIGN OUT
              </Button>
            ) : (
              <Button onClick={() => navigate("/sign-in")} color="inherit">
                Sign in
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
