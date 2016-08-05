import React, { Component, PropTypes } from 'react'

class CompletedFants extends Component {

	render() {

		const { playedFants, setClass, onReturn } = this.props
 
		return (

				<div className="CompletedFants__wrapper">
					{playedFants.map(fant => (
						<div className={`CompletedFants__item CompletedFants__item--${setClass(fant)}`} key={fant.id} onClick={() => onReturn(fant)}>
							<span className="CompletedFants__itemTitle">{fant.title}</span>
						</div>
					))}
				</div>

		)
	}
}

CompletedFants.propTypes = {
	playedFants: PropTypes.array.isRequired,
	onReturn:  PropTypes.func.isRequired,
	setClass: PropTypes.func.isRequired
}

export default CompletedFants