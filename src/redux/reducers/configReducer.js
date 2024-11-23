const initialState = {
    //commande: ifconfig ou ipconfig
    //le port est celui de la Gateway, il faut lancer la Gateway et les MS
    apiUrl: 'http://localhost:8086'
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
  