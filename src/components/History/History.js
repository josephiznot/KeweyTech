import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import CardHolder from "./../CardHolder/CardHolder";
import "./History.css";
import { getUser } from "./../../redux/userReducer";

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      hits: [],

      newResolution: ""
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidUpdate() {
    //gets updated state
    if (!this.props.geolocationsReducer.isInBounds) {
      this.props.history.push("/alert");
    }
  }
  componentDidMount() {
    this.props
      .getUser()
      .then(response => {
        axios.get("/api/history").then(res => {
          this.setState({ hits: res.data });
        });
      })
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
              window.location.replace(process.env.REACT_APP_LOGIN);
            }
          });
        }
      });
  }
  handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Deleting this history cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        axios.delete(`/api/ridhistory/${id}`).then(response => {
          this.setState({ hits: response.data });
        });
        swal("History instance deleted", { icon: "success" });
      } else {
        swal("History unchanged", { icon: "info" });
      }
    });
  }
  handleSave(id, resolution) {
    console.log(id, resolution);
    axios
      .put(`/api/resolution/${id}`, {
        resolution: resolution
      })
      .then(response => {
        this.setState({
          hits: response.data,
          canEdit: false
        });
      });
  }

  render() {
    const mapped = this.state.hits.map((e, i) => {
      return (
        <div className="cards-container" key={i}>
          <CardHolder
            hit_date={e.hit_date}
            avatar={e.profile_pic}
            resolution={e.resolution}
            o_b_id={e.o_b_id}
            handleDelete={this.handleDelete}
            handleSave={this.handleSave}
            fence_alias={e.fence_alias}
          />
        </div>
      );
    });
    return (
      <div>
        <div className="appbar-imitator" />
        {mapped}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getUser })(History);
