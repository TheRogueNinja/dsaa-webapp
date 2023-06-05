import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import FileUploadSingle from './FileUploadSingle';
import Demotab from './Demotab';

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
    },
    cardMedia: {
        height: 0,
        paddingTop: '100%',
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

function Apptabs() {
    const [value, setValue] = React.useState(0);
    const [plotData, setPlotData] = React.useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (<>
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered={!isSmallScreen} // Centered tabs for larger screens
            variant={isSmallScreen ? 'scrollable' : 'standard'} // Scrollable tabs for smaller screens
            scrollButtons={isSmallScreen ? 'auto' : 'off'} // Show scroll buttons for smaller screens
        >
            <Tab label="About the App" />
            <Tab label="Predict Impedance" />
            <Tab label="Sample results" />
            <Tab label="Authors & Contributors" />
        </Tabs>
        <TabPanel value={value} index={0}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <h3>What is CRISP?</h3>
                    <p>
                        Lithium-ion batteries (LiBs), the energy-dense electrochemical devices ubiquitous in mobile energy applications, are nearing their theoretical energy density limits, with many aspects still poorly understood. This research introduces an innovative application of Artificial Intelligence (AI) to Electrochemical Impedance Spectroscopy (EIS) measurements, aiming to accelerate innovation in LiBs performance and safety. Our method, the Comprehensive Regression for Impedance Spectroscopy Prediction (CRISP), employs AI to significantly enhance EIS measurements across a broad impedance spectrum, including extra low frequencies (ELF). CRISP predicts real and imaginary parts of impedance behavior, Z, using a modest data set. Tested over varying charging states, CRISP exhibits speed and accuracy, particularly in challenging ELF regions. Built efficiently without specialized hardware or libraries, CRISP is adaptable for human-in-the-loop operations, if needed. This pioneering work offers substantial promise for online monitoring and characterizing LiBs, potentially hastening advancements in LiBs technology
                    </p>
                </CardContent>
            </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <h2 style={{ textAlign: 'center' }}>Predict Impedance</h2>
            <FileUploadSingle graphView={false} plotData={plotData} setPlotData={setPlotData} />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <h2 style={{ textAlign: 'center' }}>Sample Results</h2>
            <Demotab />
        </TabPanel>
        <TabPanel value={value} index={3}>
            <h2 style={{ textAlign: 'center' }}>Authors & Contributors</h2>
            <div className={classes.cardContainer}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={`${process.env.PUBLIC_URL}/resources/prof_hasan.jpg`}
                        title="Hasan Kurban"
                    />
                    <CardContent className={classes.cardContent}>
                        <h3>Hasan Kurban</h3>
                        <p>Hasan Kurban is a Visiting Associate Professor at Indiana University, Bloomington, specializing in AI and its applications. He holds a Ph.D. in Computer Science with a minor in Statistics. Dr. Kurban's research focuses on data-centric AI (DCAI) and its impact on materials science, particularly in the areas of nanoparticles and Lithium-ion batteries. His work on rapidly predicting Kohn-Sham total energy using DCAI, published in Nature Scientific Reports, showcases the effectiveness of this approach. He has received accolades including the best paper award at the IEEE International Conference on Data Science and Advanced Analytics and the best poster award at the IEEE/ACM International Conference on Big Data Computing, Applications, and Technologies. Notably, his contributions to improving the expectation-maximization algorithm through DCAI have been recognized with an honorable mention paper award. Dr. Kurban's CRAN R package, DCEM for EM*, has been downloaded over 24K times. For more information, please visit <a href="https://www.hasankurban.com" target="_blank" rel="noopener noreferrer">https://www.hasankurban.com</a></p>
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
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={`${process.env.PUBLIC_URL}/resources/LR_Selcuk.jpg`}
                        title="Selcuk Temiz"
                    />
                    <CardContent className={classes.cardContent}>
                        <h3>Selcuk Temiz</h3>
                        <p>Dr. Temiz is currently working as a Faculty in the Physics Department at Eskisehir Osmangazi University, in Turkey. He earned his PhD in the Materials Science and Engineering at University of California, Riverside, in 2017. His research is mainly focused on nanomaterials and energy storage. He specifically studies on the synthesis and characterization of lower-dimensional-layered materials and electrochemical characterization of Li-ion batteries. He teaches nanotechnology, energy storage, and fundamental physics-related courses.<a href="mailto:stemiz@ogu.edu.tr" target="_blank" rel="noopener noreferrer">stemiz@ogu.edu.tr</a></p>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={`${process.env.PUBLIC_URL}/resources/shreyas.jpg`}
                        title="Shreyas Sawant"
                    />
                    <CardContent className={classes.cardContent}>
                        <h3>Shreyas Sawant
                            <a href="https://www.linkedin.com/in/thespiritninja/" target="_blank" rel="noopener noreferrer" >
                                <LinkedInIcon />
                            </a>
                            <a href="mailto:shreyassawant018@gmail.com" target="_blank" rel="noopener noreferrer">
                                <EmailIcon />
                            </a>
                            <a href="https://github.com/TheRogueNinja" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon />
                            </a>
                        </h3>
                        <p>Shreyas is currently pursuing his graduate program in Data Science at IU's esteemed Bloomington Campus. With a solid industry background as a software development and integration professional, he brings valuable expertise to the table. His skill set spans across mobile app development, web application development, and database management, with a strong command of technologies such as the MERN stack, C#, C++, and proficiency in SQL and NoSQL. Shreyas has demonstrated exceptional proficiency in the Unix environment, making him well-versed in diverse technical landscapes. He thrives when faced with complex challenges, consistently delivering robust solutions that address critical business needs. Beyond his technical acumen, Shreyas is an avid sports enthusiast, engaging in regular workouts and passionately playing football (soccer). As a dedicated gaming enthusiast, he is driven to make a breakthrough in the gaming industry, leveraging his newfound knowledge and passion for data science to contribute to innovative gaming experiences and drive holistic advancements.</p>
                    </CardContent>
                </Card>
            </div>
        </TabPanel>
    </>)
}
export default Apptabs;