import React, {useState} from 'react';
import './PageContent.css'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Graph } from 'react-d3-graph';

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




/*const Table = (node) => {
    const {nodeId} = node;
    let nodeData = response.results[0].data[0].graph.nodes.find(node => node.id == nodeId)
    const {id, labels, properties} = nodeData;
    return(
        <div>
            <tr key={id}>
                <td>label</td>
                <td>{labels}</td>
            </tr>
            
            {Object.keys(properties).map(key => {
                return(
                    <tr>
                        <td>{key}</td>
                        <td>{properties[key]}</td>
                    </tr>
                );
            })}
            
        </div>
        
    );
}*/

const StickyHeadTable = (node) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const {nodeId} = node;
    let nodeData = response.results[0].data[0].graph.nodes.find(node => node.id == nodeId)
    const {id, labels, properties} = nodeData;
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {Object.keys(properties).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const value = properties[row];
                      return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                                <TableCell key= {row}>
                                  {row}
                                </TableCell>
                                <TableCell key= {row}>
                                  {value}
                                </TableCell>
                            </TableRow>
                      );
                })}
                  
    );
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Object.keys(properties).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }


const myConfig = {
    nodeHighlightBehavior: true,
    automaticRearrangeAfterDropNode: true,
    staticGraph: false,
    maxZoom: 1,
    minZoom: 1,
    width: 600,
    panAndZoom: false,
    node: {
        color: "white",
        size: 2000,
        highlightStrokeColor: "blue"
    },
    link: {
        highlightColor: "lightblue",
        color: 'black',
        renderLabel: true
    },
    d3: {
        gravity: -1000,
    }
};

function transformData() {
    var linksObj = [];
    response.results[0].data[0].graph.relationships.forEach(rel => {
        var tempObj = {
            source: rel.startNode,
            target: rel.endNode,
            label: rel.properties.score || null
        }
        linksObj.push(tempObj)
    })
    return {
            nodes: response.results[0].data[0].graph.nodes,
            links: linksObj
    }
}

const onClickNode = (nodeId, setNodeId) =>{
    setNodeId(nodeId)
};


const GraphComponent = ({onToggle}) => {
    const classes = useStyles(); 
    const [nodeId, setNodeId] = useState(2);
    const data = transformData();
    //const [sideBarState, setSideBarState] = useState(true);
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
                <div id = "nodeTable" className = {classes.attributes}>
                    <StickyHeadTable nodeId={nodeId}/>
                </div>
                <div className = {classes.graph}>
                    <Graph
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={data}
                        config={myConfig}
                        onClickNode={(nodeId) => onClickNode(nodeId, setNodeId)}
                    />
                </div>
                <div className = {classes.additionalInfo}>
                </div>
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
        marginTop: "10px",
        width: "100%",
        position: "relative",
        height: "400px",
        border: "1px solid black",
        borderRadius: "5px"
    },
    attributes: {
        position: "relative",
        width: "calc(30% - 1px)",
        height: "100%",
        float: "left",
        borderRight: "1px solid black"
    },
    graph: {
        position: "relative",
        width: "40%",
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
                        <GraphComponent onToggle={() => setResultState(!showResultState)} dimension={graphDimension} /> 
                } 
            </div>
        </div>
      );

}
export default PageContent;