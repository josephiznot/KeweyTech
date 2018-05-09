import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import { connect } from "react-redux";
import "./GoogleMaps.css";
import {
  getPoints,
  getPosition,
  getGeofences
} from "./../../redux/fencerReducer";
import {
  updateCurrentLocation,
  updateToggledKey
} from "./../../redux/geolocationsReducer";
import Toggle from "material-ui/Toggle";
import CircularProgress from "material-ui/CircularProgress";
import axios from "axios";
import { getUser } from "./../../redux/userReducer";
import {
  Card,
  CardActions,
  // CardHeader,
  CardMedia,
  CardTitle
  // CardText
} from "material-ui/Card";
class GoogleMaps extends Component {
  constructor() {
    super();
    this.state = {
      geofences: [],
      toggled: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentDidMount() {
    console.log("rendered in maps");
    this.props.getUser().then(user => {
      console.log(user.value.data);
      // if (user.value.data.is_admin !== null) {
      //The page will not bother getting any data from a user that does not exist yet.
      this.props.updateCurrentLocation().then(res => {
        //if its a user...this request returns null
        axios
          .get(`/api/get_api_key/${user.value.data.user_id}`)
          .then(apiKey => {
            console.log(apiKey.data[0].api_key);
            console.log(`current location: ${res.data}`);
            //if its an admin, the req.params.id cannot be null
            axios
              .get(
                `/api/get_api_key/${user.value.data.tracker ||
                  user.value.data.user_id}`
              )
              .then(adminKey => {
                console.log(apiKey.data[0].api_key, adminKey.data[0].api_key);
                // /^^^^^^^^^^RETURNS CURRENT LOCATION^^^^^^^^^^^^^^^^
                this.props
                  .getPosition(
                    this.props.geolocationsReducer.currLat,
                    this.props.geolocationsReducer.currLng,
                    user.value.data.user_id,
                    apiKey.data[0].api_key || adminKey.data[0].api_key
                    //if admin, use their key...else, use tracker's key(for users)
                  )
                  //^^^^^^^^^^RETURNS THE FENCE KEY THAT THE USER IS IN^^^^^^^^^^^^^^
                  .then(response => {
                    if (response.value.data.data) {
                      //^^^^^^^^^^^^^^^^WILL EXECUTE IF USER IS IN A FENCE^^^^^^^^^^^^^^^
                      axios
                        .put(
                          `/api/toggleactive/${response.value.data.data[0].id}`,
                          {
                            num: true
                          }
                        )

                        //^^^^^^^^^^^^^^^^ALLOWS USER TO TOGGLE ONLY THE FENCE THEY ARE IN^^^^^^^^^^^^^
                        .then(response => {
                          this.setState({ geofences: response.data });
                          // this.setState({ geofences: response.value.data });
                        });
                    } else {
                      axios
                        .put("api/resettoggles", { isActive: false })
                        .then(resetToggle => {
                          this.setState({ geofences: resetToggle.data });
                        });
                    }
                    //^^^^^^^^^^^^^^IF USER IS NOT IN ANY FENCE, IT'LL JUST RETREIVE THE FENCES^^^^^^^^^^^^^^
                    //!!!!!!!!!!!!!!!!!!!!!IT WILL RESET IS_ACTIVE_2 IN DB!!!!!!!!!!!!!!!!!!!
                  });
              });
          });
      });
      // }
    });
  }
  handleToggle(key) {
    var { toggled } = this.state;
    this.props.updateToggledKey(key);
    this.setState({ toggled: !toggled });
  }

  render() {
    const mapped = this.state.geofences
      .map((e, i, a) => {
        return withGoogleMap(() => (
          <div>
            <Card>
              <CardMedia overlay={<CardTitle title={e.fence_alias} />}>
                <GoogleMap defaultCenter={e.fence_center} defaultZoom={15} />
                <Polygon path={e.fence_points} />
              </CardMedia>
              <CardActions>
                <Toggle
                  label="TRACKING ENABLED"
                  disabled={
                    !e.is_active_2 && !this.props.obReducer.outsideTracking
                  }
                  toggled={
                    this.props.obReducer.outsideTracking
                      ? this.props.geolocationsReducer.toggledKey ===
                        e.fence_key
                      : e.is_active_2 && this.state.toggled
                  }
                  labelPosition="right"
                  onToggle={() => this.handleToggle(e.fence_key)}
                />
              </CardActions>
            </Card>
          </div>
        ));
      })
      .map((E, i) => {
        return (
          <div className="map-and-button" key={i}>
            <E
              containerElement={<div className="map-container" />}
              mapElement={<div className="map-element" />}
            />
          </div>
        );
      });
    return (
      <div>
        {this.state.geofences[0] ? (
          mapped
        ) : (
          <div className="geolocations-loading">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  getPoints,
  getPosition,
  updateCurrentLocation,
  getGeofences,
  updateToggledKey,
  getUser
})(GoogleMaps);
