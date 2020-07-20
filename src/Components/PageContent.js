import React, {useState} from 'react';
import './PageContent.css'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from '@material-ui/core/IconButton';
import GraphComponent from './GraphComponent';

const response = require('./response.json');

const LandingComponent = ({textState, boolState, setTextState, setBoolState, onToggle}) => {
    return(
        <div>
            <div className='tester'>
                <h3>What is your starting point?</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="option1" checked={boolState === 'option1'} onChange={e => setBoolState(e.target.value)} />
                                    I will describe my product idea.
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="option2" checked={boolState === 'option2'} onChange={e => setBoolState(e.target.value)} />
                                    I will describe a technology I want to commercialize.
                                </label>
                            </div>
                        </form>
                        <div className="col-75">
                            <textarea id="subject" name="subject" placeholder="Enter Description here!" value = {textState} onChange = {e => setTextState(e.target.value)}></textarea>
                        </div>
                        <div className="row">
                            <button className="button" onClick={onToggle}><span>Get Market Intelligence</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ResultComponent = ({onToggle}) => {
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
            <div className = {classes.edit}>
            <IconButton aria-label="edit" onClick={onToggle}><EditTwoToneIcon fontSize="small" color="black"/></IconButton>
            </div>
            <div className={classes.root}>
                <ButtonGroup size="small" aria-label="large outlined primary button group">
                    <Button>Competitors</Button>
                    <Button>Customers</Button>
                    <Button>Technologies</Button>
                </ButtonGroup>
            </div>
            <div className = {classes.resultContainer}>
                <GraphComponent />
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: "black",
      marginTop: "2%",
    },
    edit: {
        position: "absolute"
    },
    resultContainer: {
        height: "calc(100%)",
        marginTop: "1.25rem",
        width: "100%"
    },
}));

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
                        <ResultComponent onToggle={() => setResultState(!showResultState)} dimension={graphDimension} /> 
                } 
            </div>
        </div>
      );

}
export default PageContent;