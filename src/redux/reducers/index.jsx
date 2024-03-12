import { combineReducers } from 'redux'
import { addReducer } from '../reducers/addReducer'

const reducers = combineReducers({
    addItemsReducer: addReducer
})

export default reducers