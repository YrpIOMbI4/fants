import * as _types from '../constants/Fants'

const initialState = {
	fantsList: [],
	types:[],
	deck: [],
	currentType: [],
	playedFants: [],
	loading: false,
	errors: null
}

function randSort() {
	return (Math.random() > 0.5) ? true : false
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = arr[num];
        arr[num] = arr[i];
        arr[i] = d;
    }
    return arr;
}


function typesTranscript(type) {
	switch(type) {
		case 'A':
			return ({
				className: 'green',
				name: 'Зелёные',
			})

		case 'B':
			return ({
				className: 'orange',
				name: 'Оранжевые',				
			})

		case 'C':
			return ({
				className: 'yellow',
				name: 'Жёлтые',			
			})

		case 'D':
			return ({
				className: 'red',
				name: 'Красные',			
			})

		default:
			return ({
				className: 'unknown',
				name: 'ХэЗэ',
			})
	}
}

function getTypes(arr) {
	let fantsTypes = arr.map(fant => fant.type).sort()
	let i = fantsTypes.length
	while (i--) {
		if (fantsTypes[i] == fantsTypes[i-1]) {
			fantsTypes.splice(i, 1);
		}
	}
	return fantsTypes
}

function formTypes(arr) {
	let typesArr = getTypes(arr)
	let j =0

	let sortedArr = typesArr.map(type => {
		let typeId = j
		j++
		let typeFants = arr.filter(fant => fant.type === type)
		return (
			{
				id: typeId,
				type: type,
				className: typesTranscript(type).className,
				name: typesTranscript(type).name,
				fants: typeFants
			}	
		)
	})

	return sortedArr
}

export default function fants(state = initialState, action) {

	switch (action.type) {
		case _types.GET_FANTS_SUCCESS:
			let fantsList = action.fants
			let sortedFants = formTypes(fantsList)
			return {...state, fantsList: fantsList, types: sortedFants}

		case _types.PLAY_FANT:
			let playedDeck = state.deck.filter(fant => fant.id !== action.playedItem.id)
			return {...state, deck: playedDeck, playedFants: [...state.playedFants, action.playedItem]}

		case _types.FORM_DECK:
			let playedCards = state.playedFants
			let formedDeck
			let deckFants = shuffle(action.fants.fants)
			console.log(deckFants)
			let balance = state.deck.filter(fant => fant.type == action.fants.type)
			if (balance.length) {
				formedDeck = state.deck.filter(fant => fant.type !== action.fants.type)
			} else {
				formedDeck = shuffle(state.deck.concat(deckFants))
				playedCards = state.playedFants.filter(fant => fant.type !== action.fants.type)
			}
			return {...state, deck: formedDeck, playedFants: playedCards}

		case _types.RETURN_FANT:
		console.log(state.deck)
			let returnedDeck = state.deck
			returnedDeck.unshift(action.fant)
			let returnedFants = state.playedFants.filter(fant => fant.id !== action.fant.id)
			console.log('deck ' + returnedDeck)
			console.log('fants ' + returnedFants)
			return {...state, deck: returnedDeck, playedFants: returnedFants}

		default:
			return state
	}

}