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
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";

class CardHolder extends Component {
  constructor() {
    super();
    this.state = { canEdit: false, expanded: false };
  }
  handleExpandChange(expanded) {
    this.setState({ expanded: !expanded, canEdit: false });
  }
  handleChange(val) {
    this.setState({ newResolution: val });
  }
  render() {
    return (
      <div>
        <Card
          expanded={this.state.expanded}
          onExpandChange={() => this.handleExpandChange(this.state.expanded)}
        >
          <CardHeader
            title={this.props.hit_date}
            textStyle={{ paddingRight: 0 }}
            showExpandableButton={true}
            actAsExpander={true}
            avatar={this.props.avatar}
          />
          <CardText>{this.props.fence_alias}</CardText>
          <CardMedia expandable={true} />
          <CardActions expandable={true}>
            {/* ----------------CONDITIONALLY RENDERED-------------------- */}
            {this.state.canEdit ? (
              <div>
                <CardText expandable={true}>
                  <TextField
                    defaultValue={this.props.resolution}
                    onChange={e => this.handleChange(e.target.value)}
                    floatingLabelText="Resolution"
                  />
                </CardText>
                <RaisedButton
                  label="SAVE"
                  disabled={!this.state.newResolution}
                  primary={true}
                  onClick={() => {
                    this.props.handleSave(
                      this.props.o_b_id,
                      this.state.newResolution
                    ),
                      this.setState({
                        expanded: false,
                        canEdit: false,
                        newResolution: ""
                      });
                  }}
                />
              </div>
            ) : (
              <div>
                <CardText expandable={true}>
                  Resolution: {this.props.resolution}
                </CardText>
                <RaisedButton
                  label="EDIT"
                  onClick={() => this.setState({ canEdit: true })}
                  primary={true}
                  style={{ marginRight: "20px" }}
                />
                <RaisedButton
                  label="DELETE"
                  onClick={() => this.props.handleDelete(this.props.o_b_id)}
                  secondary={true}
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
