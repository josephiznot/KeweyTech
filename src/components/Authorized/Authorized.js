import swal from "sweetalert";
// import React from "react";
import { connect } from "react-redux";
import { getUser } from "./../../redux/userReducer";

function Authorized() {
  if (
    this.props.location.pathname !== "/" &&
    this.props.location.pathname !== "/about"
  ) {
    this.props
      .getUser()
      .then(response => console.log(response))
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
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getUser })(Authorized);
