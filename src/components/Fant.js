import React, { Component, PropTypes } from 'react'

class Fant extends Component {

	parseParagraph(string) {
		return string.split('#')
	}

	render() {

		const { fant } = this.props
		const paragraphs = this.parseParagraph(fant.description)

		return (
			<div className="Fant">
				<h2 className="Fant__title">{fant.title}</h2>
				{paragraphs.map(par => <p className="Fant__description">{par}</p>)}
			</div>
		)
	}
}

Fant.propTypes = {
	fant: PropTypes.object.isRequired
}

export default Fant