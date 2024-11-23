import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetStore } from './src/redux/actions/configAction';
import { persistor } from './src/redux/store';

const useAppStateReset = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        dispatch(resetStore());
        persistor.purge(); // Purge le stockage persistant
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); // Nettoie l'écouteur
    };
  }, [dispatch]);
};

export default useAppStateReset;
