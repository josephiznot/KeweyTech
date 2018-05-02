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
      newKeys: [],
      outFenceToggled: false,
      oldKeys: [],
      oldCenter: "",
      newCenter: []
    };
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
        //-------ARRAY OF DB KEYS and CENTERS-----------
        axios
          .get("https://api.fencer.io/v1.0/geofence", {
            //^^^^^^^GRABS CURRENT FENCES FROM FENCER.IO^^^^^^^^^
            headers: {
              Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
            }
          })
          .then(response => {
            response.data.data.map((e, i) => {
              return this.setState({
                newKeys: this.state.newKeys.concat(e.id)
              });
            });
            //---------ARRAY OF CURRENT KEYS
            this.state.newKeys.map((e, i) => {
              var { oldKeys, newKeys } = this.state;
              if (_.difference(oldKeys, newKeys)[0]) {
                //^^^^CHECKS TO SEE IF A FENCE WAS DELETED FROM FENCER.IO BY COMPARING THE KEY^^^^^
                _.difference(oldKeys, newKeys).map(element => {
                  //the element is the deleted fence_key---------
                  //------NODEMAILER HERE----------
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
          });
      })
      .catch(console.log);
    swal("GOOD JOB", "SOFTWARE UP TO DATE", "success");
    // alert("updated!!!");
  }
  render() {
    console.log(
      _.isEqual(
        _.sortBy(this.state.newCenter, "lat"),
        _.sortBy(this.state.oldCenter, "lat")
      )
    );
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
