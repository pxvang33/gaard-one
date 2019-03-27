import { combineReducers } from 'redux';


//SET_DISPLAY_SQUARE
const displaySquare = (state=[], action) => {
    switch (action.type) {
      case 'SET_DISPLAY_SQUARE':
        return action.payload;
      default:
        return state;
    }
  }

  const allocatedSquares = (state=[], action) => {
    switch (action.type) {
      case 'SET_ALLOCATED_SQUARES':
        return action.payload;
      default:
        return state;
    }
  }

  const squareTotal = (state=0, action) => {
    switch (action.type) {
      case 'SET_TOTAL_SQUARES':
        return action.payload[0].count;
      default:
        return state;
    }
  }

  const unitSq = combineReducers({
    displaySquare,
    allocatedSquares,
    squareTotal,
  });

export default unitSq;