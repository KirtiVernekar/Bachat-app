export default (state, action) => {
    switch(action.type) {
      case 'TRANSACTION_TYPE':
        return {
          ...state,
          typeOfTransaction: action.payload
        }
      default:
        return state;
    }
  }