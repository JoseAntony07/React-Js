import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: 1,
      second: 100,
    };

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  handleClick1() {
    this.setState({ first: this.state.first + 1 });
  }

  handleClick2() {
    this.setState({ second: this.state.second + 1 });
  }

  componentDidMount() {
    console.log("data received");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.first !== this.state.first) {
      console.log("First value changed");
    }
  }

  render() {
    return (
      <div>
        <h1>First: {this.state.first}</h1>
        <h1>Second: {this.state.second}</h1>

        <button onClick={this.handleClick1}>Add First</button>
        <button onClick={this.handleClick2}>Add Second</button>
      </div>
    );
  }
}

export default App;
