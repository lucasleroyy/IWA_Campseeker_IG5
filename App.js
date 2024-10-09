import React, { useState } from 'react';
import PageTest from './src/pages/Test';
import PageRecherche from './src/pages/PageRecherche';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };


  return (
    <PageRecherche />
  );
};



export default App;
