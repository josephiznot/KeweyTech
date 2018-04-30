import React from "react";
import { connect } from "react-redux";
import axios from "axios";

function History() {
  axios.get("/api/history").then(res => {
    console.log(res);
  });
  return (
    <div>
      <div className="appbar-imitator" />
      history
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(History);
