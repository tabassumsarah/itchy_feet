import React, { Component } from 'react';

export class Header extends Component {
  render() {
    const sydneyClass = this.props.city === 'SYD' ? 'active': '';
    const melbClass = this.props.city === 'MELB' ? 'active' : '';
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
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" onClick={() => this.props.changeCity('SYD')} className={'btn btn-default ' + sydneyClass} >Sydney</button>
          <button type="button" onClick={() => this.props.changeCity('MEL')}className={'btn btn-default ' + melbClass}>Melbourne</button>
      </div>
      </div>
    );
  }
}
