import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";

const Home = ({ getScreams, data }) => {
  useEffect(() => {
    getScreams();
  }, [getScreams]);

  const recentScreamsMarkup = () => {
    const { screams, loading } = data;
    if (!loading) {
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

const mapStateToProps = ({ data }) => {
  return { data };
};

export default connect(mapStateToProps, { getScreams })(Home);
