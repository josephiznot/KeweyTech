import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds,
  toggleSearch
} from "./../../redux/geolocationsReducer";
import { getUser } from "./../../redux/userReducer";
import RaisedButton from "material-ui/RaisedButton";
import GoogleMaps from "./../GoogleMaps/GoogleMaps";
import "./Geolocations.css";
import swal from "sweetalert";
import Swal from "sweetalert2";
import axios from "axios";
import validator from "email-validator";

class Geolocations extends Component {
  constructor() {
    super();
    this.state = {
      trackFlag: false,
      isEnabled: false,
      goGoogle: false,
      steps: [
        {
          title: "Welcome to Kewey!",
          text: "Follow along to setup your new Kewey account."
        },
        {
          title: "Admin vs. user",
          text:
            "Every Kewey user needs an admin to report to. In order to create a new Kewey user, you must first have access to the admin's password in order to register the new user."
        },
        {
          title: "Select an account",
          input: "select",
          inputOptions: {
            admin: "Admin account",
            user: "Kewey user"
          },
          inputPlaceholder: "Select an account",
          inputValidator: value => {
            return new Promise(resolve => {
              if (value !== "") {
                resolve();
              } else {
                resolve("You need to select an account");
              }
            });
          }
        }
      ],
      userSetup: [
        {
          title: "Almost done!",
          text: "You just need to verify the admin's credentials."
        },
        {
          title: "Enter the admin's email.",
          input: "text",
          inputValidator: value => {
            return new Promise(resolve => {
              validator.validate(value)
                ? resolve()
                : resolve("Enter a valid email.");
            });
          }
        },
        {
          title: "Confirm the admin's password.",
          input: "password"
        }
      ],
      changeState: false
    };
    this.enableTracking = this.enableTracking.bind(this);
  }
  //this is going to start a setInterval in order to continually be tracking the user.
  enableTracking() {
    //ENABLE TRACKING ONLY IF THE USER IS WITHIN A GEOFENCE
    if (!this.props.geolocationsReducer.toggledKey) {
      swal({
        title: "Error",
        text: "SELECT A KEWEY FENCE.",
        icon: "info"
      });
    } else {
      this.props.toggleSearch(this.props.geolocationsReducer.searchToggle);
      //the flag allows the user to enable/disable the setInterval
      var { trackFlag, isEnabled } = this.state;
      isEnabled
        ? swal("Good job!", "Tracking Disabled", "success")
        : swal("Good job!", "Tracking Enabled", "success");
      this.setState({
        trackFlag: !trackFlag,
        isEnabled: !isEnabled
      });
      if (!this.state.trackFlag) {
        this.start = setInterval(() => {
          //updates current location in the reducer
          this.props
            .updateCurrentLocation()
            .then(location =>
              console.log(`Current location: ${location.value.data.location}`)
            );
          /*
      takes the updated state and passes in the coordinates as props.
      You will receive a 400 err when server is restarted because
      the props have not been updated yet. 
      */

          axios
            .get(
              `/api/get_api_key/${
                this.state.is_admin ? this.state.user_id : this.state.tracker
              }`
            )
            .then(apiKey => {
              console.log(apiKey);
              this.props.isInBounds(
                this.props.geolocationsReducer.currLat,
                this.props.geolocationsReducer.currLng,
                this.props.geolocationsReducer.toggledKey,
                apiKey.data[0].api_key
              );
            });
        }, 120000);
      } else {
        clearInterval(this.start);
      }
    }
  }

  componentDidUpdate() {
    //gets updated state
    if (!this.props.geolocationsReducer.isInBounds) {
      this.props.history.push("/alert");
    }
  }
  componentDidMount() {
    if (
      this.props.location.pathname !== "/" &&
      this.props.location.pathname !== "/about"
    ) {
      this.props
        .getUser()
        .then(response => {
          this.setState({
            user_id: response.value.data.user_id,
            tracker: response.value.data.tracker,
            is_admin: response.value.data.is_admin
          });
          response.value.data.tracker && this.setState({ goGoogle: true });
          //ONLY DISPLAYS GOOGLE MAPS IF USER HAS SUCCESSFULLY CREATE ACCOUNT
          response.value.data.is_admin &&
            !this.props.geolocationsReducer.hasKey &&
            response.value.data.api_key === null &&
            this.props.history.push("/settings");
          //after admin has created account and resigned in, it will redirect them to settings in order to enter the api key
          return response.value.data.is_admin === null
            ? (Swal.setDefaults({
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonText: "Next &rarr;",
                animation: false,
                progressSteps: ["1", "2", "3"]
              }),
              Swal.queue(this.state.steps).then(
                result => {
                  Swal.resetDefaults();
                  console.log(result.value);
                  if (result.value[2] === "admin") {
                    console.log("creating and admin...");
                    Swal({
                      title: "Create an admin password",
                      input: "password"
                    }).then(adminPassword => {
                      axios.put(
                        `/api/create_new_admin/${response.value.data.user_id}`,
                        {
                          password: adminPassword.value,
                          isAdmin: true
                        }
                      );

                      Swal({
                        title: `Please sign in with your new account.`
                      }).then(again => {
                        window.location.replace(process.env.REACT_APP_LOGIN);
                      });
                    });
                  } else {
                    Swal.setDefaults({
                      showCancelButton: false,
                      allowOutsideClick: false,
                      confirmButtonText: "Next &rarr;",
                      animation: false,
                      progressSteps: ["1", "2", "3"]
                    });
                    Swal.queue(this.state.userSetup).then(newUser => {
                      Swal.resetDefaults();
                      console.log(newUser);
                      axios
                        .put(
                          `/api/create_new_user/${response.value.data.user_id}`,
                          {
                            password: newUser.value[2],
                            isAdmin: false,
                            adminEmail: newUser.value[1]
                          }
                        )
                        .then(putResponse => {
                          Swal({
                            title: `Please sign in with your new account.`,
                            animation: false
                          }).then(again => {
                            window.location.replace(
                              process.env.REACT_APP_LOGIN
                            );
                          });
                        })
                        .catch(err => {
                          if (err) {
                            //want to say "Admin email does not exist"
                            Swal({
                              title: "Incorrect email or password.",
                              text: "Please try again.",
                              type: "error",
                              confirmButtonText: "Restart"
                            }).then(tryAgain => {
                              window.location.reload();
                            });
                          }
                        });
                    });
                  }
                },
                () => Swal.resetDefaults()
              ))
            : null;
        })
        .catch(err => {
          if (err) {
            this.props.history.push("/");
            return swal({
              title: "User unauthorized",
              text: "Please login",
              icon: "warning",
              button: "Login"
            }).then(login => {
              if (login) {
                window.location.replace(process.env.REACT_APP_LOGIN);
              }
            });
          }
        });
    }
  }
  componentWillUnmount() {
    this.props.history.location.pathname === "/" && clearInterval(this.start);
    //only unmounts if the user is at the landing page
  }
  //^^^^^^^^^^^^^^^^^CLEARS INTERVAL WHEN USER LEAVES COMPONENT^^^^^^^^^^^^^^^
  render() {
    console.log(this.props.history.location.pathname);
    return (
      <div>
        {!this.state.tracker ? <div className="back-drop" /> : true}
        <div className="geolocations-body-container">
          <RaisedButton
            className="tracking-button"
            primary={true}
            label={
              this.state.isEnabled ? "Disable Tracking" : "Enable Tracking"
            }
            onClick={() => this.enableTracking()}
          />
          {this.state.goGoogle ? <GoogleMaps /> : true}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds,
  getUser,
  toggleSearch
})(Geolocations);
