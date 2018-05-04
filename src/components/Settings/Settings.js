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
      changingEmail: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }
  updateEmail() {
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
      : swal("Invalid email address");
  }
  handleChange(val) {
    this.setState({ changingEmail: val });
  }
  componentDidMount() {
    if (
      this.props.location.pathname !== "/" &&
      this.props.location.pathname !== "/about"
    ) {
      this.props
        .getUser()
        .then(response =>
          this.setState({
            isAdmin: response.value.data.is_admin,
            contact_email: response.value.data.contact_email,
            user_id: response.value.data.user_id
          })
        )
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
        axios
          .get("https://api.fencer.io/v1.0/geofence", {
            //^^^^^^^GRABS CURRENT FENCES FROM FENCER.IO^^^^^^^^^
            headers: {
              Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
            }
          })
          .then(response => {
            response.data.data.map((fence, i) => {
              return this.setState({
                newKeys: this.state.newKeys.concat(fence.id)
              });
            });
            //---------ARRAY OF CURRENT KEYS
            // this.state.newKeys.map((e, i) => { ////moved downwards
            var { oldKeys, newKeys } = this.state;
            if (_.difference(oldKeys, newKeys)[0]) {
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
              return (
                axios
                  .get(`https://api.fencer.io/v1.0/geofence/${e}`, {
                    //e is each current geofence key
                    headers: {
                      Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
                    }
                  })
                  //^^^^^^^^^^^^^^^^^^^^^^^RETREIVE GEOFENCES AND THEIR INFO FROM FENCER^^^^^^^^^^^^^^^^^^^^^
                  .then(response => {
                    var { newCenter } = this.state;
                    this.setState({
                      newCenter: newCenter.concat(response.data.data.center)
                    });
                    if (
                      _.isEqual(
                        _.sortBy(this.state.newCenter, "lat"),
                        _.sortBy(this.state.oldCenter, "lat")
                      )
                    ) {
                      axios.get(`/api/geofence/${e}`).then(res => {
                        if (res.data[0]) {
                          axios.put(`/api/updatepoints/${e}`, {
                            center: response.data.data.center,
                            points: response.data.data.points,
                            alias: response.data.data.alias
                          });
                        } else {
                          axios.post(`/api/addgeofence/${e}`, {
                            center: response.data.data.center,
                            points: response.data.data.points,
                            alias: response.data.data.alias
                          });
                        }
                      });
                    }
                    //^^^^^^^^^^^^^^^^^^^^^UPDATES CURRENT FENCE OR CREATES NEW ONE^^^^^^^^^^^^^^^^^^^^^^^^
                  })
                  .catch(console.log)
              );
            });
          });
      })
      .catch(console.log);
    swal("GOOD JOB", "SOFTWARE UP TO DATE", "success");
    this.setState({ newKeys: [], newCenter: [] });
  }
  render() {
    console.log(this.state.isAdmin ? "Admin!" : "Not Admin");
    return (
      <div>
        <div className="appbar-imitator" />
        <header className="settings-header">
          <Setting />SETTINGS
        </header>
        <div className="settings-container">
          <RaisedButton
            label="UPDATE LOCATIONS"
            primary={true}
            onClick={() => this.handleUpdate()}
            disabled={!this.state.isAdmin}
          />
          <div className="options-container">
            <TrackChanges style={{ marginRight: 20 }} />
            <Toggle
              disabled={!this.state.isAdmin}
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
                      swal("Out-fence tracking enabled!", {
                        icon: "success"
                      });
                    } else {
                      swal("unchanged");
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
            <Email style={{ marginRight: 20 }} />
            <TextField
              floatingLabelText="Contact Email"
              hintText={this.state.contact_email || "Enter contact email"}
              onChange={e => this.handleChange(e.target.value)}
              value={this.state.changingEmail}
            />
            {this.state.changingEmail ? (
              <RaisedButton
                label="UPDATE EMAIL"
                primary={true}
                onClick={this.updateEmail}
              />
            ) : null}
          </div>
          <div>
            <Timer />
            <h1>CHANGE TRACK TIME</h1>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleOutsideTracking, getUser })(
  Settings
);
