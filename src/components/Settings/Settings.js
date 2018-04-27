import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import swal from "sweetalert";
import axios from "axios";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import { toggleOutsideTracking } from "./../../redux/obReducer";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      keys: []
    };
  }
  handleUpdate() {
    axios
      .get("https://api.fencer.io/v1.0/geofence", {
        headers: {
          Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
        }
      })
      .then(response => {
        response.data.data.map((e, i) => {
          return this.setState({ keys: this.state.keys.concat(e.id) });
        });
        this.state.keys.map((e, i) => {
          return (
            axios
              .get(`https://api.fencer.io/v1.0/geofence/${e}`, {
                headers: {
                  Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
                }
              })
              //^^^^^^^^^^^^^^^^^^^^^^^RETREIVE GEOFENCES AND THEIR INFO FROM FENCER^^^^^^^^^^^^^^^^^^^^^
              .then(response => {
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
                //^^^^^^^^^^^^^^^^^^^^^UPDATES CURRENT FENCE OR CREATES NEW ONE^^^^^^^^^^^^^^^^^^^^^^^^
              })
              .catch(console.log)
          );
        });
      })
      .catch(console.log);
    swal("GOOD JOB", "SOFTWARE UP-TO-DATE", "success");
  }
  render() {
    console.log(this.props.obReducer.outsideTracking);
    return (
      <div>
        <div className="appbar-imitator" />
        <header>SETTINGS</header>
        <RaisedButton
          label="UPDATE LOCATIONS"
          primary={true}
          onClick={() => this.handleUpdate()}
        />
        <Toggle
          label="ALLOW OUT-FENCE TRACKING"
          labelPosition="left"
          onToggle={() =>
            this.props.toggleOutsideTracking(
              this.props.obReducer.outsideTracking
            )
          }
          toggled={this.props.obReducer.outsideTracking}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleOutsideTracking })(Settings);
