import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import { toggleOutsideTracking } from "./../../redux/obReducer";
import swal from "sweetalert";
class Settings extends Component {
  constructor() {
    super();
    this.state = {
      keys: [],
      outFenceToggled: false
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
    swal("GOOD JOB", "SOFTWARE UP-TO-DATE", "error");
    // alert("updated!!!");
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
              this.setState({ outFenceToggled: !this.state.outFenceToggled });
            }
          }}
          toggled={this.props.obReducer.outsideTracking}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleOutsideTracking })(Settings);
