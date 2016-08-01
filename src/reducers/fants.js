import * as _types from '../constants/Fants'

const initialState = { fantsList: [], types:[], currentType: [], loading: false, errors: null}

export default function fants(state = initialState, action) {

	switch (action.type) {
		case _types.GET_FANTS_SUCCESS:
			let fantsTypes = action.fants.map(fant => fant.type).sort()
			let i = fantsTypes.length
			while (i--) {
				if (fantsTypes[i] == fantsTypes[i-1]) {
					fantsTypes.splice(i, 1);
				}
			}
			return {...state, fantsList: action.fants, types: fantsTypes}

		case _types.SET_TYPE:
			let currentTypes
			if (state.currentType.indexOf(action.fantsType) != -1) {
				currentTypes = state.currentType.filter(type => type != action.fantsType)
			} else {
				currentTypes = [...state.currentType, action.fantsType] 	
			}


			return {...state, currentType: currentTypes}

		default:
			return state
	}

}