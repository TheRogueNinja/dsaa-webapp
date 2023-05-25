import { useState } from 'react';
import PlotRealImp from './PlotRealImp';
import PlotImagImp from './PlotImagImp';
import Switch from './Switch';
import DataTable from './Datatable';
import Spinner from './Spinner';
function FileUploadSingle({ graphView }) {
  const [file, setFile] = useState(null);
  const [plotData, setPlotData] = useState(null);
  const [value, setValue] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    setIsUploading(true);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Uploading the file using the fetch API to the server
    fetch('https://204.48.28.66/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPlotData(data)
        setIsUploading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <div>{file && `${file.name} - ${file.type}`}</div>
        <button onClick={handleUploadClick} disabled={isUploading}>{isUploading ? <Spinner /> : 'Upload'}</button>
      </div>
      <Switch
        isOn={value}
        handleToggle={() => setValue(!value)}
        onColor={"#782ed9"}
      />
      {value && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px' }}>
          {plotData && <PlotRealImp data={plotData} />}
        </div>
        <div style={{ paddingLeft: '10px' }}>
          {plotData && <PlotImagImp data={plotData} />}
        </div>
      </div>}
      {!value &&
      <div>
        <div>
          <h1>Predicted Data</h1>
          {plotData && <DataTable data={plotData.pred_data} rowsPerPage={50}/>}
        </div>
        <div>
          <h1>Regenerated Data</h1>
          {plotData && <DataTable data={plotData.graph_data} rowsPerPage={50}/>}
        </div>
      </div>
     }
    </>
  );
}

export default FileUploadSingle;
