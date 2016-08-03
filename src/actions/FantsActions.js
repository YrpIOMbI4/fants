import * as _types from '../constants/Fants'
import request from 'axios'

export function getFants() {
    return dispatch => {

        dispatch({
            type: _types.GET_FANTS_REQUEST
        });

        request.get('/fants.json')
            .then(result => {
                dispatch({
                    type: _types.GET_FANTS_SUCCESS,
                    fants: result.data
                })
            })
            .catch(result => {
                dispatch({
                    type: _types.GET_FANTS_ERROR,
                    errors: result.statusText
                })
            })
    }
}

export function playFant(playedItem) {
    return {
        type: _types.PLAY_FANT,
        playedItem
    }
}

export function formDeck(fants) {
    return {
        type: _types.FORM_DECK,
        fants
    }
}

export function returnFant(fant) {
	return {
		type: _types.RETURN_FANT,
		fant
	}
}
