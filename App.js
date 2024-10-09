import React, { useState } from 'react';
import PageTest from './src/pages/Test';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Search');

  const onNavigate = (page) => {
    setCurrentPage(page);
  };


  return (
    <PageTest/>
  );
};



export default App;
