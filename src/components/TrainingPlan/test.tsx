import React, { Component, ChangeEvent } from "react";

interface AppState {
  numberOfComponents: number;
  componentArray: number[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numberOfComponents: 0,
      componentArray: [],
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numberOfComponents = parseInt(event.target.value);
    const componentArray = Array.from(
      { length: numberOfComponents },
      (_, index) => index + 1
    );

    this.setState({
      numberOfComponents,
      componentArray,
    });
  };

  render() {
    const { componentArray } = this.state;

    return (
      <div>
        <input
          type="number"
          placeholder="Enter a number"
          onChange={this.handleInputChange}
        />
        <div>
          {componentArray.map((componentNumber) => (
            <CustomComponent key={componentNumber} number={componentNumber} />
          ))}
        </div>
      </div>
    );
  }
}

interface CustomComponentProps {
  number: number;
}

class CustomComponent extends Component<CustomComponentProps> {
  render() {
    const { number } = this.props;
    return <div>This is component {number}</div>;
  }
}

export default App;
