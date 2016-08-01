import React, { Component, PropTypes } from 'react'

class Fant extends Component {
	render() {

		const { fant } = this.props

		return (
			<div className="Fant">
				<h2 className="Fant__title">{fant.title}</h2>
				<p className="Fant__description">{fant.description}</p>
			</div>
		)
	}
}

Fant.propTypes = {
	fant: PropTypes.object.isRequired
}

export default Fant