import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FantsActions from '../actions/FantsActions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Scrollbars } from 'react-custom-scrollbars';

import Fant from '../components/Fant'
import TypeSwitch from '../components/TypeSwitch'
import CompletedFants from '../components/CompletedFants'

class App extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			options: true
		}
	}

	componentDidMount() {
		this.props.fantsActions.getFants()
	}

	handlePlay() {
		this.props.fantsActions.playFant(this.props.fants.deck[0])
	}

	toggleOptions() {
		this.setState({options: this.state.options ? false : true})
	}

	closeOptions() {
		this.setState({options: this.state.options ? false : ''})	
	}

	returnFant(fant) {
		this.props.fantsActions.returnFant(fant)
		this.closeOptions()
	}

	setCurrentClass(fant) {
		let curType
		let types = this.props.fants.types
		for (let i=0; i < types.length; i++) {
			if (types[i].type == fant.type) {
				curType = types[i]
			}
		}
		return curType.className
	}

	render() {
		const { fants, fantsActions } = this.props
		const currentFant = fants.deck[0]
		const currentFantItem = fants.deck.length ? <Fant key={currentFant.id} fant={currentFant} /> : <span>Фсёё</span>
		const currentClass = fants.deck.length ? this.setCurrentClass(currentFant) : ''

		const typeSwitch = fants.types.length ? <TypeSwitch types={fants.types} deck={fants.deck} {...fantsActions}/> : ''

		const doneButton = fants.deck.length ? (<span className ="Btn" onClick={::this.handlePlay}>Выполнено</span>) : ''

		return (
			<div className={`FantsApp FantsApp--${currentClass}`}>
				<div className="Settings">

						{typeSwitch}

					<div className="CompletedFants">

							<CompletedFants playedFants={fants.playedFants} setClass={(fant) => this.setCurrentClass(fant)} onReturn={(fant) => this.returnFant(fant)} />

					</div>
				</div>
				<div className={`Fants Fants--${currentClass} ${this.state.options ? 'opened' : 'closed'}`} >
					<span className="SettingsTrigger" onClick={::this.toggleOptions}>
						<svg width="24" height="32">
							<rect width="24" height="2" fill="currentColor" x="0" y="0"/>
							<rect width="24" height="2" fill="currentColor" x="0" y="7"/>
							<rect width="24" height="2" fill="currentColor" x="0" y="14"/>
						</svg>
					</span>
					<div className="FantContainer"  onClick={::this.closeOptions}>
						<ReactCSSTransitionGroup transitionName="FantContainer__animation" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
							{currentFantItem}
						</ReactCSSTransitionGroup>
					<div className="Controls">
						{doneButton}
					</div>
					</div>


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