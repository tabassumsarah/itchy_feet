import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <div className="brand text-uppercase">TravelGeta</div>
        <div className="user-details">
          <strong>{this.props.name}, </strong> your budget is:
        </div>
        <div>
          <small className="text-uppercase muted">Travel Saving Account</small>
        </div>
        <div className="budget"><strong>${this.props.budget}</strong></div>
      </div>
    );
  }
}
