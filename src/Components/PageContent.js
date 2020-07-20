import React, {useState} from 'react';
import './PageContent.css'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import GraphComponent from './GraphComponent';

const response = require('./response.json');

const LandingComponent = ({textState, boolState, setTextState, setBoolState, onToggle}) => {
    return(
        <div>
            <div className='tester'>
                <p>What is your starting point?</p>
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

/*const StickyHeadTable = (node) => {
    const classes = useStyles();

    const {nodeId} = node;
    let nodeData = response.results[0].data[0].graph.nodes.find(node => node.id == nodeId)
    const {id, labels, properties} = nodeData;
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
            <TableBody>
                {Object.keys(properties).map((row) => {
                    const value = properties[row];
                    return(
                        <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell>
                                {row}
                            </TableCell>
                            <TableCell>
                                {value}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
        </TableContainer>
      </Paper>
                  
    );
            
}*/

const ResultComponent = ({onToggle}) => {
    const classes = useStyles(); 
    return(
        <div>
            <div className='tester'>
                <p>Market Intelligence Results</p>
            </div>
            <button className={classes.edit} onClick={onToggle}><EditTwoToneIcon fontSize="small" color="black"/></button>
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
        position: "absolute",
        color: 'blue',
        marginLeft: "2%",
        backgroundColor: "white"
    },
    resultContainer: {
        height: "calc(100% - 315px)",
        marginTop: "10px",
        width: "100%",
        position: "absolute",
        border: "1px solid black"
    },
    attributes: {
        position: "relative",
        width: "calc(40% - 1px)",
        height: "100%",
        float: "left",
        borderRight: "1px solid black",
        overflow: "auto"
    },
    graph: {
        position: "relative",
        width: "60%",
        height: "100%",
        float: "left",
    },
    additionalInfo: {
        position: "relative",
        width: "calc(0% - 1px)",
        height: "100%",
        float: "left",
        borderLeft: "1px solid black"
    }
}));

const PageContent = ({graphDimension}) => {
    const [showResultState, setResultState] = useState(true);
    const [textState, setTextState] = useState('');
    const [boolState, setBoolState] = useState('option1');
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <ButtonGroup size="small" aria-label="large outlined primary button group">
                    <Button>Graph</Button>
                    <Button>Setting</Button>
                    <Button>Legend</Button>
                    <Button>Export</Button>
                </ButtonGroup>
            </div>
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