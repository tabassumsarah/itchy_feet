import React, { Component } from 'react';
import { TravelCard } from './TravelCard.js';

export class SearchResults extends Component {
  render() {
    return (
     <div className="searchresults"> 
      <p className="text-muted">
        Destinations that fit your budget:
      </p>

      <div className="row">
        {this.props.results.map((result, idx) => (
          <div className="col-md-4" key={idx}><TravelCard city={this.props.city} result={result} /></div>
        ))}
      </div>
     </div>
    );
  }
}
