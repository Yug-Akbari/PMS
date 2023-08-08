import React from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#222",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Customize the box shadow as needed
    height: "70px",
  },
  tab: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    textDecoration: "none",
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
    },
  },
  tabLabel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const handleTabChange = (event, newValue) => {

  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Tabs
        value={location.pathname}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="primary"
        style={{paddingTop:"20px", justifyContent: "center" }}
      >
        <Tab
          value="/dashboard"
          label="Home"
          component={Link}
          to="/dashboard"
          className={classes.tab}
          sx={{ justifyContent: "center" }} // Center the label horizontally
        />
        <Tab
          value="/income"
          label="Income"
          component={Link}
          to="/income"
          className={classes.tab}
          sx={{ justifyContent: "center" }}
        />
        <Tab
          value="/expense"
          label="Expense"
          component={Link}
          to="/expense"
          className={classes.tab}
          sx={{ justifyContent: "center" }}
        />
        <Tab
          value="/category"
          label="Category"
          component={Link}
          to="/category"
          className={classes.tab}
          sx={{ justifyContent: "center" }}
        />
      </Tabs>
    </AppBar>
  );
};

export default Navbar;
