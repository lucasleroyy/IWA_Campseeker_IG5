export const login = (userInfo, isAdmin) => {
    return {
      type: 'LOGIN',
      payload: {
        userInfo: userInfo,
        isAdmin: isAdmin,
      },
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };