import React, { useState } from 'react';
import FileUploadSingle from './FileUploadSingle';
import Switch from './Switch';

function App() {
  const [graphView, setGraphView] = useState(false);
  return (
    <>
      <div>
        <FileUploadSingle graphView={graphView} />
      </div>      
    </>
  );
}

export default App;