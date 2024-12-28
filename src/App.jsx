import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Newsboard from './components/Newsboard';

const App = () => {
  const [category, setCategory] = useState('general');

  return (
    <div>
      <Navbar setcategory={setCategory} />
      <Newsboard category={category} />
    </div>
  );
};

export default App;
