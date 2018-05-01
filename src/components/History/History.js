import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import swal from "sweetalert";
import CardHolder from "./../CardHolder/CardHolder";

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      hits: [],
      expanded: false,
      newResolution: ""
    };
    this.fetchAvatar = this.fetchAvatar.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    axios.get("/api/history").then(res => {
      this.setState({ hits: res.data });
    });
  }
  fetchAvatar(id) {
    console.log(id);
    axios.get(`/api/fetch_avatar/${id}`).then(res => {
      console.log(res.data[0].profile_pic);
      // return res.data[0].profile_pic;
      this.setState({ avatar: res.data[0].profile_pic });
    });
  }
  handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Deleting this history cannot be udone.",
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
  handleSave(id) {
    axios
      .put(`/api/resolution/${id}`, {
        resolution: this.state.newResolution
      })
      .then(response => {
        this.setState({ hits: response.data, canEdit: false });
      });
  }

  render() {
    const mapped = this.state.hits.map((e, i) => {
      return (
        <div key={i}>
          <CardHolder
            hit_date={e.hit_date}
            avatar={this.state.avatar}
            resolution={e.resolution}
            o_b_id={e.o_b_id}
            handleDelete={this.handleDelete}
            handleSave={this.handleSave}
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
export default connect(mapStateToProps)(History);
