import React, { Component, PropTypes } from 'react'

class TypeSwitchItem extends Component {

	calculateLength(type, balance) {
		return ((balance.length / type.fants.length) * 100)
	}

	render() {

		const { type, onSelect, deck } = this.props

		const balance = deck.filter(fant => fant.type === type.type)

		const length = (deck.length) ? this.calculateLength(type, balance) : '0'


		return (
			<div
				className={`TypeSwitch__item TypeSwitch__item--${type.className} ${balance.length ? 'active' : ''}`}
				onClick={() => onSelect(type)}
			>
				{type.name} 
				<span className="TypeSwitch__indicator" style={{width: length+'%'}}></span>
			</div>
		)
	}
}

TypeSwitchItem.propTypes = {
	type: PropTypes.object.isRequired,
	deck: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired
}

export default TypeSwitchItem