import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Result from './pages/Result/Result';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
