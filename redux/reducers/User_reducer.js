// Types d'actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// État initial
const initialState = {
  isLoggedIn: false,  // Par défaut, l'utilisateur n'est pas connecté
  isAdmin: false,     // Par défaut, l'utilisateur n'est pas administrateur
  userInfo: null,     // Informations de l'utilisateur (nom, email, etc.)
};

// Reducer utilisateur
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: action.payload.isAdmin,  // Si l'utilisateur est admin, on le met à jour
        userInfo: action.payload.userInfo, // Stocker les infos de l'utilisateur
      };
      
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        userInfo: null,  // Réinitialiser l'info utilisateur
      };
      
    default:
      return state;
  }
};

// Actions creators
export const login = (userInfo, isAdmin) => ({
  type: LOGIN,
  payload: {
    userInfo,
    isAdmin,
  }
});

export const logout = () => ({
  type: LOGOUT,
});

export default userReducer;
