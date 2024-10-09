import React, { useState } from 'react';
import PageTest from './src/Pages/Test';
import PageTest_Lucas from './src/Pages/Test_Lucas';

import PageRecherche from './src/Pages/PageRecherche';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };


  return (
    <PageTest_Lucas />
  );
};



export default App;
