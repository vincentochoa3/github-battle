import React from "react";

export default class Hover extends React.Component<{
  children: (hovering: boolean) => React.ReactNode;
}> {
  state = { hovering: false };
  mouseOver = () => {
    this.setState({
      hovering: true,
    });
  };
  mouseOut = () => {
    this.setState({
      hovering: false,
    });
  };
  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
