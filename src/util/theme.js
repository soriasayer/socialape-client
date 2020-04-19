export const appTheme = {
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
};

export const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  images: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  form: {
    textAlign: "center",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  progress: {
    position: "absolute",
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#3f50b5",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  editButton: {
    float: "right",
  },
  deleteBtn: {
    position: "absolute",
    left: "92%",
    top: "8%",
  },
  submitBtn: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  btnClose: {
    position: "absolute",
    left: "90%",
    top: "6%",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  dialogContent: {
    padding: 20,
  },
  expandBtn: {
    position: "absolute",
    left: "92%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px, solid, rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  commentImg: {
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    height: 100,
  },
  commentData: {
    marginLeft: 20,
  },
};
