import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import swal from "sweetalert";
import axios from "axios";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      keys: []
    };
  }
  // componentDidMount() {
  handleUpdate() {
    axios
      .get("https://api.fencer.io/v1.0/geofence", {
        headers: {
          Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
        }
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      .then(response => {
        response.data.data.map((e, i) => {
          this.setState({ keys: this.state.keys.concat(e.id) });
        });
        this.state.keys.map((e, i) => {
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
            .catch(console.log);
        });
      })
      .catch(console.log);
    // }
    swal("GOOD JOB", "SOFTWARE UP-TO-DATE", "success");
  }
  render() {
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
      </div>
    );
  }
}

export default Settings;
