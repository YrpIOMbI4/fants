import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FantsActions from '../actions/FantsActions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Fant from '../components/Fant'
import TypeSwitch from '../components/TypeSwitch'

class App extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			currentFant: 0
		}
	}

	componentDidMount() {
		this.props.fantsActions.getFants()
	}

	handlePlay() {
		this.props.fantsActions.playFant(this.props.fants.deck[0])
	}

	setCurrentClass(types, currentFant) {
		let curType
		for (let i=0; i < types.length; i++) {
			if (types[i].type == currentFant.type) {
				curType = types[i]
			}
		}
		return curType.className
	}

	render() {
		const { fants, fantsActions } = this.props
		const currentFant = fants.deck[0]
		const currentFantItem = fants.deck.length ? <Fant key={currentFant.id} fant={currentFant} /> : <span>Фсёё</span>
		const currentClass = fants.deck.length ? this.setCurrentClass(fants.types, currentFant) : ''

		const typeSwitch = fants.types.length ? <TypeSwitch types={fants.types} deck={fants.deck} {...fantsActions}/> : ''

		const doneButton = fants.deck.length ? (<span className ="Btn" onClick={::this.handlePlay}>Выполнено</span>) : ''

		return (
			<div className={`Fants Fants--${currentClass}`}>

					<ReactCSSTransitionGroup transitionName="TypeSwitchContainer__animation" transitionEnterTimeout={300} transitionLeaveTimeout={100}>
						{typeSwitch}
					</ReactCSSTransitionGroup>


				<div className="FantContainer">
					<ReactCSSTransitionGroup transitionName="FantContainer__animation" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{currentFantItem}
					</ReactCSSTransitionGroup>
				</div>

				<div className="Controls">
					{doneButton}
					{fants.playedFants.length ? (
					<div className="CompletedFants">
						<div className="CompletedFants__wrapper">
							{fants.playedFants.map(fant => (
								<div className={`CompletedFants__item CompletedFants__item--${this.setCurrentClass(fants.types, fant)}`} key={fant.id} onClick={() => fantsActions.returnFant(fant)}>
									<span className="CompletedFants__itemTitle">{fant.title}</span>
								</div>
							))}
						</div>
					</div>) : ''}
				</div>

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