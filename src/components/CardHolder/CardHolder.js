import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  // CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

class CardHolder extends Component {
  constructor() {
    super();
    this.state = { canEdit: false };
  }
  handleExpandChange(expanded) {
    this.setState({ expanded: expanded });
  }
  handleChange(val) {
    this.setState({ newResolution: val });
  }
  render() {
    console.log("rendered");
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.hit_date}
            showExpandableButton={true}
            actAsExpander={true}
            avatar={this.props.avatar}
          />
          <CardText>Card Text</CardText>
          <CardMedia expandable={true} />
          <CardActions expandable={true}>
            {/* ----------------CONDITIONALLY RENDERED-------------------- */}
            {this.state.canEdit ? (
              <div>
                <CardText expandable={true}>
                  Resolution:
                  <input
                    defaultValue={this.props.resolution}
                    onChange={e => this.handleChange(e.target.value)}
                  />
                </CardText>
                <FlatButton
                  label="CANCEL"
                  onClick={() => this.setState({ canEdit: false })}
                />
                <FlatButton
                  label="SAVE"
                  onClick={() => this.props.handleSave(this.props.o_b_id)}
                />
              </div>
            ) : (
              <div>
                <CardText expandable={true}>
                  Resolution: {this.props.resolution}
                </CardText>
                <FlatButton
                  label="EDIT"
                  onClick={() => this.setState({ canEdit: true })}
                />
                <FlatButton
                  label="DELETE"
                  onClick={() => this.props.handleDelete(this.props.o_b_id)}
                />
              </div>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default CardHolder;
