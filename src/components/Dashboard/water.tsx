import React, { Component } from "react";

class Glass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fillLevel: 0, // Poziom napełnienia szklanki, początkowo 0
    };
  }

  handleFillClick = () => {
    if (this.state.fillLevel < 100) {
      // Max poziom napełnienia szklanki
      this.setState((prevState) => ({
        fillLevel: prevState.fillLevel + 10, // Możesz dostosować tempo napełniania
      }));
    }
  };

  render() {
    return (
      <div>
        <div
          className="water"
          style={{
            clipPath: `polygon(0 0, 100% 0, 85% ${100 - fillLevel}%, 15% ${
              100 - fillLevel
            }%)`,
          }}
        >
          <div className="water-level">{fillLevel}%</div>
        </div>
        <button onClick={this.handleFillClick}>Dodaj</button>
      </div>
    );
  }
}

export default Glass;
