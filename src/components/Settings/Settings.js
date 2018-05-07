/*
ONLY ALLOW ADMINS TO UPDATE AS OF RIGHT NOW....
MUST DELETE FENCE AND RECREATE IF YOU WANT TO CHANGE TO POINTS ON FENCER.IO
*/

//use _.includes FOR UPDATED POINTS
import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import { toggleOutsideTracking } from "./../../redux/obReducer";
import swal from "sweetalert";
import _ from "lodash";
import Authorized from "./../Authorized/Authorized";
import { getUser } from "./../../redux/userReducer";
import "./Settings.css";
import Setting from "material-ui/svg-icons/action/settings";
import TrackChanges from "material-ui/svg-icons/action/track-changes";
import Email from "material-ui/svg-icons/communication/email";
import TextField from "material-ui/TextField";
import validator from "email-validator";
import Timer from "material-ui/svg-icons/av/av-timer";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/Menu";
import Menu from "material-ui/Menu/Menu";
import Security from "material-ui/svg-icons/hardware/security";
import Key from "material-ui/svg-icons/communication/vpn-key";
import Locked from "material-ui/svg-icons/action/lock";
import Unlocked from "material-ui/svg-icons/action/lock-open";
import IconButton from "material-ui/IconButton";
import Swal from "sweetalert2";
import SnackBar from "material-ui/Snackbar";
import { acquireKey } from "./../../redux/geolocationsReducer";
class Settings extends Component {
  constructor() {
    super();
    this.state = {
      newKeys: [],
      outFenceToggled: false,
      oldKeys: [],
      oldCenter: "",
      newCenter: [],
      contact_email: "",
      changingEmail: "",
      locked: true,
      newPassword: "",
      newApiKey: "",
      openSnack: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.handleUnlock = this.handleUnlock.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.updateAdminPassword = this.updateAdminPassword.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.updateApiKey = this.updateApiKey.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
    this.openTheSnack = this.openTheSnack.bind(this);
  }
  updateEmail() {
    if (this.state.changingEmail) {
      validator.validate(this.state.changingEmail)
        ? axios
            .put(`/api/update_contact_email/${this.state.user_id}`, {
              email: this.state.changingEmail
            })
            .then(response => {
              this.setState({
                contact_email: this.state.changingEmail,
                changingEmail: ""
              });
            })
        : swal("Invalid email address").then(res =>
            this.setState({ changingEmail: "" })
          );
    }
  }
  handleChange(val) {
    this.setState({ changingEmail: val });
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
            isAdmin: response.value.data.is_admin,
            contact_email: response.value.data.contact_email,
            user_id: response.value.data.user_id,
            examplePassword: response.value.data.first_name
          });
          axios
            .get(`/api/get_api_key/${response.value.data.user_id}`)
            .then(apiKey => {
              console.log(response.value.data);
              this.setState({ apiKey: apiKey.data[0].api_key });
            });
          response.value.data.api_key === null && response.value.data.is_admin
            ? Swal({
                imageUrl: "https://image.ibb.co/mYnkM7/instructions.png",
                title: "Get your API key",
                text:
                  "In order to create your Kewey fences, you must first head to Fencer's website and create an account. Then you will click the 'Settings' tab and copy and paste your API key below in order to link your Kewey fences. Have fun tracking:)",
                confirmButtonText: "Take me to Fencer's website"
              }).then(clicked => window.open("https://fencer.io/", "_blank"))
            : true;
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
                window.location.replace("http://localhost:3001/auth");
              }
            });
          }
        });
    }
  }
  handleUpdate() {
    axios
      .get("/api/get_fence_keys")
      //^^^^^^GRABS FENCE KEYS FROM DB^^^^^^^^^^^
      .then(db_hit => {
        this.setState({
          oldKeys: _.map(db_hit.data, "fence_key"),
          oldCenter: _.map(db_hit.data, "fence_center")
        });
        // });
        //-------ARRAY OF DB KEYS and CENTERS-----------
        axios.get(`/api/get_api_key/${this.state.user_id}`).then(apiKey => {
          //-------get api key from users table in db-----------
          axios
            .get("https://api.fencer.io/v1.0/geofence", {
              //^^^^^^^GRABS CURRENT FENCES FROM FENCER.IO^^^^^^^^^
              headers: {
                Authorization: `${
                  apiKey.data[0].api_key
                  // process.env.REACT_APP_FENCER_API_KEY
                  // process.env.REACT_APP_TESTER
                }`
              }
            })
            .then(response => {
              console.log(response);
              console.log(response);
              response.data.data.map((fence, i) => {
                return this.setState({
                  newKeys: this.state.newKeys.concat(fence.id)
                });
              });
              //---------ARRAY OF CURRENT KEYS
              // this.state.newKeys.map((e, i) => {////moved downwards
              var { oldKeys, newKeys } = this.state;
              if (_.difference(oldKeys, newKeys)[0]) {
                console.log("trying to delete an old key...");
                //^^^^CHECKS TO SEE IF A FENCE WAS DELETED FROM FENCER.IO BY COMPARING THE KEY^^^^^
                _.difference(oldKeys, newKeys).map(element => {
                  //the element is the deleted fence_key---------
                  //------NODEMAILER HERE----------
                  // axios.get(`/api/get_hits_before_deleted/${element}`);
                  return (
                    axios
                      .delete(`/api/delete_history_hits/${element}`)
                      //^^^^^MUST DELETE HISTORY HITS BEFORE DELETING FENCE^^^^^^
                      .then(afterwards => {
                        axios.delete(`/api/delete_old_fence/${element}`);
                      })
                  );
                  //^^^^^^^^DELETES FROM GEOFENCE TABLE^^^^^^^^^^^^
                });
              }

              this.state.newKeys.map((e, i) => {
                console.log(this.state.apiKey, this.state.api_key);
                return (
                  axios
                    .get(`https://api.fencer.io/v1.0/geofence/${e}`, {
                      //e is each current geofence key
                      headers: {
                        Authorization: `${
                          // this.state.apiKey
                          // process.env.REACT_APP_FENCER_API_KEY
                          process.env.REACT_APP_TESTER
                        }`
                      }
                    })

                    //^^^^^^^^^^^^^^^^^^^^^^^RETREIVE GEOFENCES AND THEIR INFO FROM FENCER^^^^^^^^^^^^^^^^^^^^^
                    //^^^^^^^^^^^^^^^^^^^^^^^^^(ALIAS, POINTS, CENTER)^^^^^^^^^^^^^^^^^^^^^^^^^
                    .then(response2 => {
                      console.log(response2);
                      var { newCenter } = this.state;
                      this.setState({
                        newCenter: newCenter.concat(response2.data.data.center)
                      });

                      axios.get(`/api/geofence/${e}`).then(res => {
                        if (res.data[0]) {
                          if (
                            _.isEqual(
                              _.sortBy(res.data[0].fence_points, "lat"),
                              _.sortBy(response2.data.data.points, "lat")
                            )
                          ) {
                            //REALLY ONLY NEED TO UPDATE ALIAS AND CENTER...NOT NECESSARILY POINTS...
                            axios.put(`/api/updatepoints/${e}`, {
                              center: response2.data.data.center,
                              points: response2.data.data.points,
                              alias: response2.data.data.alias
                            });
                          } else {
                            //^^^^^IF POINTS DONT EQUAL EACH OTHER...MUST UPDATE THEM^^^^^^
                            axios
                              .get(`/api/get_hits_before_deleted/${e}`)
                              .then(oldhits => {
                                if (oldhits.data[0]) {
                                  //IF IT HAS ANY VALUES IN THE ARRAY
                                  axios.post("/api/send_expired_hits", {
                                    history: oldhits.data,
                                    email: this.state.contact_email
                                  });
                                  axios
                                    .delete(`/api/delete_history_hits/${e}`)
                                    .then(afterwardsss => {
                                      axios.put(`/api/updatepoints/${e}`, {
                                        center: response2.data.data.center,
                                        points: response2.data.data.points,
                                        alias: response2.data.data.alias
                                      });
                                    });
                                } else {
                                  axios.put(`/api/updatepoints/${e}`, {
                                    center: response2.data.data.center,
                                    points: response2.data.data.points,
                                    alias: response2.data.data.alias
                                  });
                                }
                              });
                          }
                        } else {
                          axios.post(`/api/addgeofence/${e}`, {
                            center: response2.data.data.center,
                            points: response2.data.data.points,
                            alias: response2.data.data.alias
                          });
                        }
                      });

                      //^^^^^^^^^^^^^^^^^^^^^UPDATES CURRENT FENCE OR CREATES NEW ONE^^^^^^^^^^^^^^^^^^^^^^^^
                    })
                    .catch(console.log)
                );
              });
            });
        });
      })
      .catch(console.log);
    this.openTheSnack();
    this.setState({ newKeys: [], newCenter: [] });
  }
  updateAdminPassword() {
    if (this.state.newPassword) {
      axios.put(`/api/update_admin_password/${this.state.user_id}`, {
        newPassword: this.state.newPassword
      });
      this.setState({ newPassword: "" });
    }
  }
  handleAdminChange(val) {
    this.setState({ newPassword: val });
  }
  handleUnlock() {
    this.state.isAdmin
      ? this.setState({ locked: false })
      : Swal({
          title: "User not an admin",
          text: "Please login as the admin to edit the settings.",
          type: "error"
        });
  }
  handleLock() {
    this.setState({ locked: true });
    this.state.changingEmail || this.state.newApiKey || this.state.newPassword
      ? this.setState({ openSnack: true })
      : true;
    this.state.changingEmail ? this.updateEmail() : true;
    this.updateAdminPassword();
    this.state.newApiKey ? this.updateApiKey() : true;
    this.state.newApiKey ? this.props.acquireKey(true) : true;
  }
  handleApiKey(val) {
    this.setState({ newApiKey: val });
  }
  updateApiKey() {
    axios
      .put(`/api/update_api_key/${this.state.user_id}`, {
        newApiKey: this.state.newApiKey
      })
      .then(response => this.handleUpdate());
    this.setState({ newApiKey: "" });
  }
  handleSnackClose() {
    this.setState({
      openSnack: false
    });
  }
  openTheSnack() {
    this.setState({ openSnack: true });
  }
  render() {
    // console.log(this.state.isAdmin ? "Admin!" : "Not Admin", this.state.locked);
    console.log(this.state.newPassword);
    return (
      <div>
        <div className="appbar-imitator" />
        <header className="settings-header">
          <Setting />ADMIN SETTINGS
        </header>
        <div className="settings-container">
          <div className="locked-container">
            <RaisedButton
              disabled={this.state.locked}
              label="UPDATE LOCATIONS"
              primary={true}
              onClick={() => this.handleUpdate()}
            />
            <RaisedButton
              disabled={this.state.locked}
              label="FENCER.IO"
              secondary={true}
              onClick={() => window.open("https://fencer.io/", "_blank")}
              style={{ width: "162px" }}
            />
          </div>
          <div className="options-container">
            <TrackChanges
              style={
                this.state.locked
                  ? {
                      marginRight: 20,
                      color: "e5e5e5"
                    }
                  : { marginRight: 20 }
              }
            />
            <Toggle
              disabled={this.state.locked}
              label="ALLOW OUT-FENCE TRACKING"
              labelPosition="left"
              onToggle={() => {
                if (!this.state.outFenceToggled) {
                  swal({
                    title: "Are you sure?",
                    text:
                      "Outfence tracking can produce unintentional side-effects with the Kewey fence!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                  }).then(willDelete => {
                    if (willDelete) {
                      this.props.toggleOutsideTracking(
                        this.props.obReducer.outsideTracking
                      );
                      this.setState({
                        outFenceToggled: !this.state.outFenceToggled
                      });
                    }
                  });
                } else {
                  this.props.toggleOutsideTracking(
                    this.props.obReducer.outsideTracking
                  );
                  this.setState({
                    outFenceToggled: !this.state.outFenceToggled
                  });
                }
              }}
              toggled={this.props.obReducer.outsideTracking}
            />
          </div>
          <div>
            <Email
              style={
                this.state.locked
                  ? {
                      marginRight: 20,
                      color: "e5e5e5"
                    }
                  : { marginRight: 20 }
              }
            />
            <TextField
              disabled={this.state.locked}
              floatingLabelText="Update Contact Email"
              hintText={this.state.contact_email || "Enter contact email"}
              onChange={e => this.handleChange(e.target.value)}
              value={this.state.changingEmail}
            />
          </div>
          <div>
            <Security
              style={
                this.state.locked
                  ? {
                      marginRight: 20,
                      color: "e5e5e5"
                    }
                  : { marginRight: 20 }
              }
            />

            <TextField
              disabled={this.state.locked}
              type="password"
              floatingLabelText="Change admin Password"
              hintText={`e.i. ${this.state.examplePassword +
                Math.floor(Math.random() * 100000)}`}
              onChange={e => this.handleAdminChange(e.target.value)}
              value={this.state.newPassword}
            />
          </div>
          <div>
            <Key
              style={
                this.state.locked
                  ? {
                      marginRight: 20,
                      color: "e5e5e5"
                    }
                  : { marginRight: 20 }
              }
            />
            <TextField
              disabled={this.state.locked}
              floatingLabelText="Link API key"
              hintText={"paste the API key here"}
              onChange={e => this.handleApiKey(e.target.value)}
              value={this.state.newApiKey}
            />
          </div>
          <div className="locked-container">
            <IconButton>
              {this.state.locked ? (
                <Locked
                  onClick={() => this.handleUnlock()}
                  style={{ marginRight: 20 }}
                />
              ) : (
                <Unlocked
                  onClick={() => this.handleLock()}
                  style={{ marginRight: 20 }}
                />
              )}
            </IconButton>
            {this.state.locked
              ? "Click the lock to make changes."
              : "Click the lock to prevent further changes."}
          </div>
        </div>
        <SnackBar
          open={this.state.openSnack}
          message={"Settings up to date."}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackClose}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  toggleOutsideTracking,
  getUser,
  acquireKey
})(Settings);
