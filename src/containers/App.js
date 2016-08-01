import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FantsActions from '../actions/FantsActions'

import Fant from '../components/Fant'

class App extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			currentFant: {}
		}
	}

	componentDidMount() {
		this.props.fantsActions.getFants()
	}

	filterFants(arr, types) {
		return arr.filter(item => 
			types.indexOf(item.type) != -1
		)
	}

	getRandomId(arr) {
		const max = arr.length
		return Math.floor(Math.random() * (max));
	}

	getRandomFant() {
		let arr = this.filterFants(this.props.fants.fantsList, this.props.fants.currentType)
		console.log('random pressed')
		const currentFant = this.getRandomId(arr)
		let fant = {}
		if (fant = arr.length) {
			this.setState({currentFant: arr[currentFant]})
		}
	}

	handleSetType(type) {
		this.props.fantsActions.setType(type)
	}

	typeColors(type) {
		console.log(type)
		switch (type) {
			case 'green': return 'Зелёные'
			case 'orange': return 'Оранжевые'
			case 'yellow': return 'Жёлтые'
			case 'red': return 'Красные'
			default: return ''
		}	
	}

	render() {
		const { fants, fantsActions } = this.props

		const filteredFants = this.filterFants(fants.fantsList, fants.currentType)
		let fant = {}

		console.log(this.state.currentFant)

		return (
			<div className={`Fants Fants--${this.state.currentFant.type}`}>
				
				<div className="TypeSwitch">
					{fants.types.map(type => 
						<span
							className={`TypeSwitch__item ${fants.currentType.indexOf(type) != -1 ? 'active' : ''}`}
							key={Math.random()*1000}
							onClick={() => this.handleSetType(type)}
						>
							{this.typeColors(type)}
						</span>
					)}
				</div>

				<Fant fant={this.state.currentFant}/>

				<span className="Btn" onClick={::this.getRandomFant}>Следующий</span>
			</div>
		)
	}
}

App.propTypes = {
	fants: PropTypes.object.isRequired,
	fantsActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		fants: state.fants
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fantsActions: bindActionCreators(FantsActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)