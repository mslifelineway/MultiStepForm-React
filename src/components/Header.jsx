import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const Header = () => {
  return (
    <AppBar position="fixed" style={{ height: 64 }}>
      <Toolbar variant="dense">
        <Typography variant="h6">Multi-Step Form</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
