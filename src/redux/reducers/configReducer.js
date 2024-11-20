

const initialState = {
    //commande: ifconfig ou ipconfig
    apiUrl: 'http://162.38.35.249'
  };
  
  const configReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_API_URL':
        return {
          ...state,
          apiUrl: action.payload
        };
      default:
        return state;
    }
  };
  
  export default configReducer;
  