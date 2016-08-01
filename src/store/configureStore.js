import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

const createAppStore = compose(applyMiddleware(thunk))(createStore);

export default function configureStore(initialState) {


	const store = createAppStore(rootReducer, initialState)

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default
			store.replaceReducer(nextReducer)
		})
	}
	return store
}
