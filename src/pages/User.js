import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import StaticProfile from "../components/profile/StaticProfile";
import Scream from "../components/scream/Scream";
import { getUserData } from "../redux/actions/dataAction";

function User({ getUserData, data, match }) {
  const handle = match.params.handle;
  const [profile, setProfile] = useState([]);

  const fetchUserData = () => {
    getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, [handle]);

  const screamMarkup = () => {
    const { screams, loading } = data;
    if (loading) {
      return <p>Loading data...</p>;
    } else if (screams === null) {
      return <p>No scream from this user</p>;
    } else {
      return screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream} />
      ));
    }
  };
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamMarkup()}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({ data }) => {
  return {
    data,
  };
};

export default connect(mapStateToProps, { getUserData })(User);
