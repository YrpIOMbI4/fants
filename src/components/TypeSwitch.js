import React, { Component, PropTypes } from 'react'
import TypeSwitchItem from '../components/TypeSwitchItem'

class TypeSwitch extends Component {

	handleSelect(type) {

		this.props.formDeck(type)
	}

	render() {

		const { types, deck } = this.props

		return (
			<div className="TypeSwitch">
				{types.map(type => 
					<TypeSwitchItem key={type.id} type={type} deck={deck} onSelect={(type) => this.handleSelect(type)} />
				)}
			</div>
		)
	}
}

TypeSwitch.propTypes = {
	types: PropTypes.array.isRequired,
	deck: PropTypes.array.isRequired,
	formDeck:  PropTypes.func.isRequired
}

export default TypeSwitch