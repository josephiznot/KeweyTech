import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { updateCurrentLocation } from "./../../redux/geolocationsReducer";
import { getUser } from "./../../redux/userReducer";
import Swal from "sweetalert2";
import "./Alert.css";

class Alert extends Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      o_b_id: "",
      password: ""
    };
    this.updateHit = this.updateHit.bind(this);
  }
  handleIgnore() {
    this.props.toggleBounds();
    this.props.history.push("/geolocations");
  }
  async componentDidMount() {
    this.setState({ mounted: true });
    this.props.getUser().then(response => {
      this.setState({
        user: response.value.data.display_name,
        email: response.value.data.contact_email,
        tracker: response.value.data.tracker,
        user_id: response.value.data.user_id,
        is_admin: response.value.data.is_admin
      });
      //^^^^^^^^^^GETS USERS ID^^^^^^^^^^^^^^
      //----------This is going to make the TWILIO get request-----------------
      // axios
      //   .post(`/api/textalert`, { user_id: response.value.data.display_name })
      //   .then(res => {
      //     console.log(res.data);
      //   });
      //-----------------------------------------------------------------------------
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
    const { value: password } = await Swal({
      title: "OUT OF BOUNDS! RETURN TO SAFETY!",
      input: "password",
      type: "info",
      allowOutsideClick: false,
      inputPlaceholder: "Enter admin password",
      confirmButtonText: "Ignore",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off"
      },
      inputValidator: value => {
        this.setState({ password: value });
        console.log(value); //entered password
        // this.props.getUser().then(afterUser => {
        return new Promise(resolve => {
          if (value === "") {
            resolve("Incorrect password.");
          }
          axios
            .post(`/api/confirm_password/${value}`, {
              tracker: this.state.tracker || this.state.user_id //for admins to track themselves
            })
            .then(isConfirmed => {
              console.log(isConfirmed);
              if (isConfirmed.data) {
                window.location.replace("/");
              } else {
                resolve("Incorrect password.");
              }
            });
        });
        // });
      }
    });
  }
  updateHit(id) {
    this.props.updateCurrentLocation().then(res => {
      axios
        .put(`/api/out_of_bounds_hit/${id}`, {
          latitude: res.value.data.location.lat,
          longitude: res.value.data.location.lng,
          date: res.value.headers.date
        })
        .then(afterUpdate => {
          console.log("email sent");
          this.emailDirections(
            res.value.data.location.lat,
            res.value.data.location.lng,
            this.state.user,
            this.state.email
          );
        });
    });
  }
  emailDirections(lat, lng, name, email) {
    axios.post(`/api/email_directions`, {
      lat: lat,
      lng: lng,
      user: name,
      contact_email: email
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className="entire-alert">OMG ALERT!!!!!!!!!!</div>;
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { updateCurrentLocation, getUser })(
  Alert
);
