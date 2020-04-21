import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "../components/profile/Profile";
import Scream from "../components/scream/Scream";
import { getScreams } from "../redux/actions/dataAction";
import ScreamSkeleton from "../util//ScreamSkeleton";

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
    } else return <ScreamSkeleton />;
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
