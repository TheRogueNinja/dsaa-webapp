import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FileUploadSingle from './FileUploadSingle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100vh',
    overflow: 'auto',
  },
  card: {
    flex: '1 0 30%',
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
    overflow: 'auto',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%'
  },
  instructions: {
    flex: '0 0 30%',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  instructionsHeading: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },
  instructionsText: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [plotData, setPlotData] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <h2 style={{ textAlign: 'center' }}>Web App to simulate CRISP</h2>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Instructions" />
        <Tab label="Demo" />
        <Tab label="Authors" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <h3>How to use the App?</h3>
            <ol>
              <li>Click on 'Demo' tab and download the template file by clicking on 'Download Template'</li>
              <li>You can add/edit the file with your findings but ensure that the column names are untouched</li>
              <li>Once you have your data ready click on choose file to select and upload your file and click on upload</li>
              <li>You can see the results generated in the below table</li>
              <li>If you wish to see the results as 3D graphical representation, check the show graphs switch</li>
            </ol>
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Test the Findings</h2>
        <FileUploadSingle graphView={false} plotData={plotData} setPlotData={setPlotData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Authors</h2>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`${process.env.PUBLIC_URL}/resources/prof_hasan.jpg`}
              title="Hasan Kurban"
            />
            <CardContent className={classes.cardContent}>
              <h3>Hasan Kurban</h3>
              <p>Hasan Kurban is a Visiting Associate Professor at Indiana University, Bloomington, specializing in AI and its applications. He holds a Ph.D. in Computer Science with a minor in Statistics. Dr. Kurban's research focuses on data-centric AI (DCAI) and its impact on materials science, particularly in the areas of nanoparticles and Lithium-ion batteries. His work on rapidly predicting Kohn-Sham total energy using DCAI, published in Nature Scientific Reports, showcases the effectiveness of this approach. He has received accolades including the best paper award at the IEEE International Conference on Data Science and Advanced Analytics and the best poster award at the IEEE/ACM International Conference on Big Data Computing, Applications, and Technologies. Notably, his contributions to improving the expectation-maximization algorithm through DCAI have been recognized with an honorable mention paper award. Dr. Kurban's CRAN R package, DCEM for EM*, has been downloaded over 24K times. For more information, please visit <a href="https://www.hasankurban.com">https://www.hasankurban.com</a></p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`${process.env.PUBLIC_URL}/resources/prof_memo.jpg`}
              title="Mehmet M Dalkilic"
            />
            <CardContent className={classes.cardContent}>
              <h3>Mehmet M Dalkilic</h3>
              <p>Mehmet M Dalkilic completed his MS and PhD in Computer Science at Indiana University, Bloomington, IN, USA. He was the first fulltime faculty at the School of Informatics, Computing, and Engineering and built the graduate computational program. His area of research is improving and applying AI to various areas like astronomy, geology, marine ecology, biology, chemistry, and physics. He is the author of many papers over wide range of topics. He has created over two dozen classes with unique content. Avocations include classical piano and composition, essays, poems, and is an avid reader.</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`${process.env.PUBLIC_URL}/resources/parichit.jpg`}
              title="Parichit Sharma"
            />
            <CardContent className={classes.cardContent}>
              <h3>Parichit Sharma</h3>
              <p>Parichit Sharma is a PhD student in Computer Science at IU, Bloomington. He studies and stays in Bloomington-the beautiful flagship campus of Indiana University and home to all Hoosiers. His research interests span Machine Learning, Data-centric AI, Big Data Mining (optimized algorithms for big data) and Bioinformatics. In particular-he develops machine learning algorithms for mining big data, optimizing unsupervised learning algorithms and extracting crucial patterns from genomics data. He has extensive industry and research experience in multiple roles through industry, academia and research labs, and has contributed to award-winning solutions for making high performance
                computing accessible to scientists and across domains.</p>
            </CardContent>
          </Card>
        </div>
      </TabPanel>
      <div className={classes.footer}>
        <Typography variant="body2" color="textSecondary">
          Webapp designed by: Shreyas Sawant
        </Typography>
        <a href="https://www.linkedin.com/in/thespiritninja/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
        <a href="mailto:shreyassawant018@gmail.com" target="_blank" rel="noopener noreferrer">
          <EmailIcon />
        </a>
        <a href="https://github.com/TheRogueNinja" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}

export default App;
