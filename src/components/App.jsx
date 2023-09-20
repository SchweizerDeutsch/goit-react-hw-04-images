import { useState } from 'react';
import './styles.css';

import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '..//components/ImageGallery/ImageGallery';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <Searchbar onSubmit={newquery => setQuery(newquery)} />
      <ImageGallery query={query} />
    </div>
  );
}

export default App;
