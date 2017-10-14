import React, { Component } from 'react';

export class TravelCard extends Component {
	render(){
		const { imgUrl, date, title, price } = this.props.result;
		const formattedDate = new Date(date);
		return (
			<div class="panel panel-default">
				<div className="panel-body">
					<div className="trvlImg">

						<img className="img-responsive" src={imgUrl||'http://travel.viralitytoday.com/newassets/travel-022.jpg'} alt=""/>
					</div>
					<div className="mt10">
	                   <div className="text-uppercase text-muted"><small><small>Sydney To</small></small></div>
	                   <div className="clearfix">
	                   	<span className="text-uppercase pull-left"><b><h4 className="clear-margin">{title}</h4></b></span>
	                   	<span className="pull-right"><b><h3 className="clear-margin">${price}</h3></b></span>
	                   </div>
					</div>
					<div className="mt10">
	                   <div className="clearfix">
	                   	<span className="pull-left"><small className="text-muted">Next flight is on {formattedDate.toDateString()}</small></span>
	                   	<button className="btn btn-primary pull-right btn-primary-inverted">Book now</button>
	                   </div>
					</div>
				</div>
			</div>
		);
	}
}