import PlotRealImp from './PlotRealImp';
import PlotImagImp from './PlotImagImp';
import DataTable from './Datatable';
import dummyData from './dummyData.json';

function Demotab() {    
    return (
        <>
            <div style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <p>You can interact with the below graphs as they are 3Dimensional; Also you can hover to find the trace values</p>
                <div
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '20px',
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px' }}>
                            {dummyData && <PlotRealImp data={dummyData} />}
                        </div>
                        <div style={{ paddingLeft: '10px' }}>
                            {dummyData && <PlotImagImp data={dummyData} />}
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Regenerated Data</h1>
                    <p>You can click on the column header to toggle sorting of the values (asc/desc)</p>
                    {dummyData && <DataTable data={dummyData.graph_data} rowsPerPage={50} />}
                </div>
            </div>
        </>
    )
}
export default Demotab;