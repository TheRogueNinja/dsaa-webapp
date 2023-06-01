import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PlotRealImp from './PlotRealImp';
import PlotImagImp from './PlotImagImp';
import Switch from './Switch';
import DataTable from './Datatable';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
  },
  cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(2),
  },
  card: {
      flex: '0 0 calc(33.33% - 16px)',
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
  },
  cardContent: {
      flexGrow: 1,
      overflow: 'auto',
  }
}));

function FileUploadSingle({ graphView, plotData, setPlotData }) {
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const classes = useStyles();
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/resources/raw_data.csv`;
    link.setAttribute('download', 'raw_data_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadClick = () => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'csv') {
      alert('Only CSV files are allowed.');
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    // Uploading the file using the fetch API to the server
    fetch('https://dalkilic.luddy.indiana.edu/CRISP/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlotData(data);
        setIsUploading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleCardToggle = () => {
    setIsCardExpanded(!isCardExpanded);
  };
  return (
    <>
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <form style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ marginRight: '10px' }}>
                <input type="file" onChange={handleFileChange} />
              </div>
              <div style={{ marginRight: '10px' }}>
                <button onClick={handleUploadClick} disabled={isUploading}>
                  Upload
                </button>
              </div>
              <div style={{ marginRight: '10px' }}>
                <button onClick={downloadTemplate}>Download Template</button>
              </div>
            </form>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <label htmlFor="toggleSwitch" style={{ marginRight: '10px' }}>Toggle View:</label>
              <Switch id="toggleSwitch" isOn={value} handleToggle={() => setValue(!value)} onColor="#782ed9" />
            </div>
            </CardContent>
          </Card>
          <div>
          <Card className={classes.card} onClick={handleCardToggle}>
          <CardContent className={classes.cardContent}>
            <h3>How to use the App?</h3>
            {isCardExpanded && (
              <ol>
                <li>Download the template file by clicking on 'Download Template'</li>
                <li>You can add/edit the file with your findings but ensure that the column names are untouched</li>
                <li>Once you have your data ready click on choose file to select and upload your file and click on upload</li>
                <li>You can see the results generated in the below table</li>
                <li>If you wish to see the results as 3D graphical representation, check the show graphs switch</li>
              </ol>
            )}
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '20px' }}>
        {value && (
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px' }}>
                {plotData && <PlotRealImp data={plotData} />}
              </div>
              <div style={{ paddingLeft: '10px' }}>
                {plotData && <PlotImagImp data={plotData} />}
              </div>
            </div>
          </div>
        )}
        {!plotData ? (
          <div>
            <h2>Generated data will be shown here..!</h2>
          </div>
        ) : (
          <div>
            <h1>Predicted Data</h1>
            {plotData && <DataTable data={plotData.pred_data} rowsPerPage={25} />}
            <div>
              <h1>Regenerated Data</h1>
              {plotData && <DataTable data={plotData.graph_data} rowsPerPage={25} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FileUploadSingle;
