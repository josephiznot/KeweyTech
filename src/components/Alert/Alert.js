import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { updateCurrentLocation } from "./../../redux/geolocationsReducer";
import { getUser } from "./../../redux/userReducer";

class Alert extends Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      o_b_id: ""
    };
    this.updateHit = this.updateHit.bind(this);
  }
  //----------This is going to make the TWILIO get request-----------------
  // componentDidMount() {
  //   axios.get(`/api/textalert`).then(res => {
  //     console.log(res.data);
  //   });
  // }
  //-----------------------------------------------------------------------------
  handleIgnore() {
    this.props.toggleBounds();
    this.props.history.push("/geolocations");
  }
  componentDidMount() {
    console.log("mounted");
    this.setState({ mounted: true });
    this.props.getUser().then(response => {
      console.log(response);
      //^^^^^^^^^^GETS USERS ID^^^^^^^^^^^^^^
      axios
        .get(`/api/geofence/${this.props.geolocationsReducer.toggledKey}`)
        //^^^^^^^^^^^^^^GETS THE TOGGLED FENCE_ID^^^^^^^^^^^^^
        .then(axres => {
          console.log(axres);
          this.props.updateCurrentLocation().then(res => {
            console.log(res);
            // ^^^^^^^^^^GETS CURRENT LOCATION^^^^^^^^^^^^^
            axios
              .post(`/api/out_of_bounds_hit`, {
                latitude: res.value.data.location.lat,
                longitude: res.value.data.location.lng,
                accuracy: res.value.data.accuracy,
                user_id: response.value.data.user_id,
                fence_id: axres.data[0].fence_id,
                date: res.value.headers.date
              })
              .then(response => {
                this.setState({
                  o_b_id: response.data[response.data.length - 1].o_b_id
                  //^^^^^^^^^^^^^ONLY WORKS IF LAST OBJECT IN ARRAY IS THE MOST RECENT ONE^^^^^^
                });
                //^^^^^^^^^^^^TAKES THE NEW OB ID AND SETS IT IN STATE^^^^^^^^^^^
              });
          });
        });
    });
    this.interval = setInterval(() => {
      if (this.state.mounted) {
        this.updateHit(this.state.o_b_id);
      }
    }, 5000);
  }
  updateHit(id) {
    this.props.updateCurrentLocation().then(res => {
      axios.put(`/api/out_of_bounds_hit/${id}`, {
        latitude: res.value.data.location.lat,
        longitude: res.value.data.location.lng,
        date: res.value.headers.date
      });
      // .then(response => {
      //   console.log(`updated response: ${response}`);
      // });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>OMG ALERT!!!!!!!!!!</div>;
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { updateCurrentLocation, getUser })(
  Alert
);
