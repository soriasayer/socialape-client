import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Scream from "../components/Scream";
import Profile from "../components/Profile";

const Home = () => {
  const [screams, setScreams] = useState([]);

  const fetchStream = () => {
    axios
      .get("/screams")
      .then((res) => {
        setScreams(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStream();
  }, []);

  const recentScreamsMarkup = () => {
    if (screams) {
      return screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream} />
      ));
    } else return <p>Loading...</p>;
  };

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} sx={12}>
        {recentScreamsMarkup()}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
