//USE NODE MAILER TO EMAIL USER OF THE DELETED HITS FROM out_of_bounds HISTORY.
import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import { toggleOutsideTracking } from "./../../redux/obReducer";
import swal from "sweetalert";
import _ from "lodash";
class Settings extends Component {
  constructor() {
    super();
    this.state = {
      keys: [],
      outFenceToggled: false,
      oldKeys: []
    };
  }
  handleUpdate() {
    axios
      .get("/api/get_fence_keys")
      //^^^^^^GRABS FENCES FROM DB^^^^^^^^^^^
      .then(elResponse => {
        this.setState({ oldKeys: _.map(elResponse.data, "fence_key") });
        axios
          .get("https://api.fencer.io/v1.0/geofence", {
            //^^^^^^^GRABS CURRENT FENCES FROM FENCER.IO^^^^^^^^^
            headers: {
              Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
            }
          })
          .then(response => {
            response.data.data.map((e, i) => {
              return this.setState({ keys: this.state.keys.concat(e.id) });
            });
            this.state.keys.map((e, i) => {
              var { oldKeys, keys } = this.state;
              if (_.difference(oldKeys, keys)[0]) {
                //^^^^CHECKS TO SEE IF A FENCE WAS DELETED FROM FENCER.IO^^^^^
                _.difference(oldKeys, keys).map(element => {
                  //the element is the fence_key btw---------
                  console.log(element);
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
                      console.log(res);
                      console.log(response);
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
          });
      })
      .catch(console.log);
    swal("GOOD JOB", "SOFTWARE UP TO DATE", "success");
    // alert("updated!!!");
  }
  render() {
    console.log(this.state.oldKeys);
    console.log(this.state.keys);
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
