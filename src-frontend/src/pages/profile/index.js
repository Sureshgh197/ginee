import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  FormControl,
  Typography,
  FormLabel,
  TextField,
  Card,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Menu,
  MenuItem,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  CardMedia,
  OutlinedInput,
  Grid,
} from "@mui/material";

import { Link } from "react-router-dom";
import { AccountCircle, Home, Email, ContactPhone } from "@mui/icons-material";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Api from "../../API/RegistraionDetails";
import logo from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import Loginicon from "../../assets/images/logo.png";

import Axios from "axios";
// import { useNavigate } from "react-router-dom";
import Footer from "../../Pages/Footer/index.js";

import "./index.css";
const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [state, setState] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryname, setCountryname] = useState();
  const [statename, setStatename] = useState();
  const [citiesname, setCitiesname] = useState();
  const [cId, setcId] = useState("");
  const [cCId, setCCId] = useState("");
  const [data, setData] = useState({
    gender: "",
    countries_id: "",
    state_id: "",
    city_id: "",
  });

  const pages = ["Home", "About us", "Contact us", "Blog"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    getData();
    countryList();
  }, []);

  useEffect(() => {
    statesList();
  }, [cId]);

  useEffect(() => {
    citiesList();
  }, [cCId]);

  const getData = async () => {
    await Axios.post(Api.profileupdate).then((response) => {
      setData(response.data.data);
      setcId(response.data.data.countries_id);
      setCCId(response.data.data.state_id);

      setData({
        ...data,
        countries_id: response.data.data.countries_id,
        state_id: response.data.data.state_id,
        city_id: response.data.data.city_id,
        gender: response.data.data.gender,
      });
    });
  };

  async function countryList() {
    try {
      await Axios.get(Api.countrylist).then((response) => {
        if (response.status === 200) {
          setCountries(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function statesList() {
    try {
      await Axios.get(Api.stateList + `${cId}`).then((response) => {
        if (response.status === 200) {
          setStates(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function citiesList() {
    try {
      await Axios.get(Api.citiesList + `${cCId}`).then((response) => {
        if (response.status === 200) {
          setCities(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    var val = event.target.value;
    var name = event.target.name;

    if (name == "country_id") {
      countries.forEach((element) => {
        if (element.id == val) {
          setData({ ...data, countries_id: element.id });

          setcId(element.id);
        }
      });
    } else if (name == "state_id") {
      states.forEach((element) => {
        if (element.id == val) {
          setData({ ...data, state_id: element.id });
          setCCId(element.id);
        }
      });
    } else if (name == "city_id") {
      cities.forEach((element) => {
        if (element.id == val) {
          setData({ ...data, city_id: element.id });
        }
      });
    } else if (name == "first_name") {
      setData({ ...data, first_name: val });
    } else if (name == "last_name") {
      setData({ ...data, last_name: val });
    } else if (name == "addressline1") {
      setData({ ...data, addressline1: val });
    } else if (name == "addressline2") {
      setData({ ...data, addressline2: val });
    } else if (name == "zip_postal_pincode") {
      setData({ ...data, zip_postal_pincode: val });
    } else {
      setState({
        ...state,
        [name]: val,
      });
    }
  };
  async function onProfileSubmit() {
    try {
      await Axios({
        method: "post",
        url: "http://192.168.0.57/surviencenew/api/users/consumerprofile",
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          addressline1: data.addressline1,
          addressline2: data.addressline2,
          countries_id: data.countries_id,
          state_id: data.state_id,
          city_id: data.city_id,
          zip_postal_pincode: data.zip_postal_pincode,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <AppBar className="navbar">
          <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
            <Toolbar disableGutters>
              <CardMedia
                component="img"
                image={logo}
                alt="Survience"
                sx={{
                  mr: 2,
                  width: "12%",
                  display: { xs: "none", md: "flex" },
                }}
              />

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon className="menuicon" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none", width: "50%" } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <CardMedia
                component="img"
                image={logo}
                alt="Survience"
                sx={{
                  flexGrow: 0,
                  width: "15%",
                  display: { xs: "flex", md: "none" },
                }}
              />

              <Box
                sx={{
                  flexGrow: 2,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-end",
                }}
              >
                <MenuItem>
                  <Link to="/register">
                    <div className="db-menu-button">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ContactMailIcon />
                      </div>
                      <h5 style={{ fontSize: "1rem" }}>Contact us</h5>
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/changePassword">
                    <div className="db-menu-button">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ChangeCircleIcon />
                      </div>
                      <h5 style={{ fontSize: "1rem" }}>Change Password</h5>
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/home">
                    <div className="db-menu-button">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <LogoutIcon />
                      </div>
                      <h5 style={{ fontSize: "1rem" }}>Logout</h5>
                    </div>
                  </Link>
                </MenuItem>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
          marginBottom: "60px",
        }}
      >
        <Grid
          container
          item
          xs={10}
          md={6}
          xl={5}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="input">
            <Card className="input_card">
              <div className="icon_style">
                <img
                  src={Loginicon}
                  style={{ width: "14ch" }}
                  alt={"ICON"}
                ></img>
              </div>
              <Typography variant="h3" align="center">
                Profile Details
              </Typography>
              <Box
                component="form"
                onSubmit={onProfileSubmit}
                validate
                autoComplete="off"
              >
                <Grid container item xs={12}>
                  {/* <div className="data_align"> */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>First Name</FormLabel>
                      <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        name="first_name"
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        onChange={handleChange}
                        //   error={error.first_name}
                        value={data.first_name}
                        // label="First Name"
                        hiddenLabel
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Last Name</FormLabel>
                      <OutlinedInput
                        type="text"
                        size="small"
                        name="last_name"
                        onChange={handleChange}
                        //   error={error.last_name}
                        value={data.last_name}
                        required
                        variant="outlined"
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/* </div> */}

                  {/* <div className="data_align"> */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup row name="">
                        <FormControlLabel
                          value="Male"
                          inputProps={{ readOnly: true }}
                          control={
                            <Radio
                              // onChange={(e) =>
                              //   setData({ ...data, gender: e.target.value })
                              // }
                              checked={data.gender == "Male"}
                            />
                          }
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          inputProps={{ readOnly: true }}
                          control={
                            <Radio
                              // onChange={(e) =>
                              //   setData({ ...data, gender: e.target.value })
                              // }
                              checked={data.gender == "Female"}
                            />
                          }
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Address Line 1</FormLabel>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        type="text"
                        variant="outlined"
                        size="small"
                        name="addressline1"
                        onChange={handleChange}
                        //   error={error.addressLine1}
                        value={data.addressline1}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Home />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  {/* </div> */}
                  {/* <div className="data_align"> */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Address Line 2</FormLabel>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        type="text"
                        variant="outlined"
                        size="small"
                        name="addressline2"
                        onChange={handleChange}
                        //   error={error.addressLine2}
                        value={data.addressline2}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Home />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Country</FormLabel>
                      <TextField
                        id="country"
                        size="small"
                        select
                        label="Select"
                        name="country_id"
                        value={data.countries_id}
                        //   error={error.country_id}

                        onChange={handleChange}
                      >
                        {countries.map((val) => (
                          <MenuItem key={val.id} value={val.id}>
                            {val.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  {/* </div> */}
                  {/* <div className="data_align"> */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>State</FormLabel>
                      <TextField
                        // type="text"
                        variant="outlined"
                        size="small"
                        name="state_id"
                        label="Select"
                        select
                        onChange={handleChange}
                        value={data.state_id}
                        //   error={error.state_id}
                      >
                        {states.map((val) => (
                          <MenuItem key={val.id} value={val.id}>
                            {val.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>City</FormLabel>
                      <TextField
                        select
                        variant="outlined"
                        size="small"
                        name="city_id"
                        onChange={handleChange}
                        value={data.city_id}
                        //   error={error.city_id}
                        label="Select"
                      >
                        {cities.map((val) => (
                          <MenuItem key={val.id} value={val.id}>
                            {val.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  {/* </div> */}
                  {/* <div className="data_align"> */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Postal Code</FormLabel>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        type="text"
                        variant="outlined"
                        size="small"
                        name="zip_postal_pincode"
                        inputProps={{ maxLength: 10, minLength: 6 }}
                        onChange={handleChange}
                        //   error={error.zip_postal_pincode}
                        value={data.zip_postal_pincode}
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Email</FormLabel>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        id="input-with-icon-textfield"
                        type="email"
                        variant="outlined"
                        size="small"
                        name="email"
                        value={data.email}
                        required
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  {/* </div> */}
                  {/* <div className="data_align"> */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Phone</FormLabel>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            display: "none",
                          },
                          "& legend": {
                            display: "none",
                          },
                        }}
                        type="text"
                        variant="outlined"
                        name="mobile_no"
                        size="small"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        value={data.mobile_no}
                        required
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <ContactPhone />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 2, width: "29ch" }}>
                      <FormLabel>Date of Birth</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={data.date_of_birth}
                          label="Date of Birth"
                          disabled
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              id="date-picker-dialog"
                              size="small"
                              className="form-control"
                              inputformat="DD-MMM-YYYY"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  {/* </div> */}
                </Grid>
                <div className="profile-submit">
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      sx={{ mt: 2, width: "13ch" }}
                      variant="contained"
                      type="submit"
                    >
                      <ExitToAppRoundedIcon sx={{ mr: 1 }} />
                      Submit
                    </Button>
                  </Grid>
                </div>
              </Box>
            </Card>
          </div>
        </Grid>
      </div>
      <Footer position="relative" />
    </div>
  );
};

export default Profile;
