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

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      hits: [],
      expanded: false
    };
  }
  componentDidMount() {
    axios.get("/api/history").then(res => {
      this.setState({ hits: res.data });
    });
  }
  render() {
    console.log(this.state.hits);
    const mapped = this.state.hits.map((e, i) => {
      return (
        <div key={i}>
          <Card>
            <CardHeader title={e.hit_date} showExpandableButton={true} />
          </Card>
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
