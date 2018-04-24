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
  componentDidMount() {
    // var { keys } = this.state;
    axios
      .get("https://api.fencer.io/v1.0/geofence", {
        headers: {
          Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
        }
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      .then(response => {
        console.log(response.data.data);
        response.data.data.map((e, i) => {
          this.setState({ keys: this.state.keys.concat(e.id) });
        });
        this.state.keys.map((e, i) => {
          // e.slice(1, -1);
          axios
            .get(`https://api.fencer.io/v1.0/geofence/${e}`, {
              headers: {
                Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`
              }
            })
            //^^^^^^^^^^^^^^^^^^^^^^^RETREIVE GEOFENCES AND THEIR INFO^^^^^^^^^^^^^^^^^^^^^
            .then(response => {
              console.log(e);
              console.log(response.data.data);
              axios
                .put(`/api/updatepoints/${e}`, {
                  center: response.data.data.center,
                  points: response.data.data.points
                })
                .then(response2 => {
                  console.log(response2);
                })
                //^^^^^^^^^^^^^^^^^^^^^UPDATE POINTS AND CENTER IN DB^^^^^^^^^^^^^^^^^^^^^^^^
                .catch(console.log);
            })
            .catch(console.log);
        });
      })
      .catch(console.log);
  }
  handleUpdate() {
    swal("GOOD JOB", "SOFTWARE UP-TO-DATE", "success");
  }
  render() {
    // console.log(this.state.keys);
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
