import React, {useState, useEffect} from 'react';
import './PageContent.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from '@material-ui/core/IconButton';
import GraphComponent from './GraphComponent';

/* decide whether to display the Landing page or the result page */

/* Enter the business idea page */
const LandingComponent = ({textState, boolState, setTextState, setBoolState, onToggle}) => {
    const classes = useStyles();
    return(
        <div>
            <div className='tester'>
                <h3>What is your starting point?</h3>
            </div>
            <div className="container">
                <FormControl style={{width: "100%"}}component="fieldset">
                    <RadioGroup aria-label="startingPoint" name="options" value={boolState} onChange={e => setBoolState(e.target.value)}>
                        <FormControlLabel value="option1" control={<Radio />} label="I will describe my product idea" />
                        <FormControlLabel value="option2" control={<Radio />} label="I will describe a technology I want to commercialize" />
                    </RadioGroup>
                    
                    <TextField  className ={classes.textField} value = {textState} onChange = {e => setTextState(e.target.value)} id="outlined-multiline-static" label="Enter description" 
                                multiline rows={4} variant="outlined"/>
                    
                    <Button variant="contained" color="primary" className={classes.button} onClick={onToggle}> Get Market Intelligence </Button>
                </FormControl>
            </div>
        </div>
    );
}

/* result component - Market intelligence page */
const ResultComponent = ({onToggle, plan}) => {
    const classes = useStyles(); 
    return(
        <div>
            <div className='tester'>
                <h3>Market Intelligence Results</h3>
                <div>
                <ButtonGroup size="small" aria-label="large outlined primary button group">
                    <Button>Graph</Button>
                    <Button>Setting</Button>
                    <Button>Legend</Button>
                    <Button>Export</Button>
                </ButtonGroup>
                </div>
            </div>
            <div className={classes.formGroup}>
                <div className = {classes.edit}>
                    <IconButton aria-label="edit" onClick={onToggle}><EditTwoToneIcon fontSize="small" color="#90caf9"/></IconButton>
                </div>
                 <div className={classes.root}>
                    <ButtonGroup size="small" aria-label="large outlined primary button group">
                        <Button>Competitors</Button>
                        <Button>Customers</Button>
                        <Button>Technologies</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className = {classes.resultContainer}>
                <GraphComponent businessPlan={plan}/>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "16px 0px",
        borderRadius: "10px",
        backgroundColor: "#312f2f",
         display: "flex",
         justifyContent: "center"
    },
    resultContainer: {
        height: "calc(100%)",
        marginTop: "1.25rem",
        width: "100%",
        height: "528px"
    },
    button: {
        marginTop: "2rem",
        backgroundColor: "#90caf9",
        color: "black"
    },
    formGroup: {
        display: "flex",
        alignItems: "center",
        alignContent: "center"
    },
    textField: {
        marginTop: "2rem",
        width: "40%",
        color:"white"
    }
}));

/* Decide which content to display */
const PageContent = ({graphDimension}) => {
    const [showResultState, setResultState] = useState(true);
    const [textState, setTextState] = useState('');
    const [boolState, setBoolState] = useState('option1');
    
    
    const classes = useStyles();
    return (
        <div className="parent">
            
            <div className="page-container">
                { 
                    showResultState ? 
                        <LandingComponent textState={textState} boolState={boolState} setTextState={setTextState} setBoolState={setBoolState} onToggle={() => setResultState(!showResultState)} /> 
                            : 
                        <ResultComponent onToggle={() => setResultState(!showResultState)} dimension={graphDimension} plan={textState}/> 
                } 
            </div>
        </div>
      );

}
export default PageContent;