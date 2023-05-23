import React, { useState } from 'react';
import FileUploadSingle from './FileUploadSingle';

function App() {
  const [graphView] = useState(false);
  return (
    <>
      <div>
        <FileUploadSingle graphView={graphView} />
      </div>      
    </>
  );
}

export default App;