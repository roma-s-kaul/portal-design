/*jshint esversion: 9 */
import React, {Component} from 'react'
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
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Graph } from 'react-d3-graph';

const response = require('./response.json');

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.graphRef = React.createRef();
        this.state = { 
            nodeId: 2,
            myConfig:  {
                //staticGraph: true,
                nodeHighlightBehavior: true,
                automaticRearrangeAfterDropNode: true,
                maxZoom: 1,
                minZoom: 0.1,
                initialZoom: 0.5,
                panAndZoom: true,
                height: 400,
                width: 600,
                disableLinkForce: true,
                directed: true,
                node: {
                    color: "pink",
                    size: 2000,
                    fontSize: 18,
                    labelPosition: "center",
                    highlightStrokeColor: "blue"
                },
                link: {
                    highlightColor: "lightblue",
                    color: 'black',
                    renderLabel: true,
                    semanticStrokeWidth: true,

                    //strokeWidth: 300
                },
                d3: {
                    gravity: -1000,
                    disableLinkForce: false,
                    linkLength: 1000
                }
            }
        };
        
        this.onClickNode = this.onClickNode.bind(this);
    }

    componentDidMount() {
        var myConfig = {...this.state.myConfig};
        myConfig.width = this.graphRef.current.parentElement.clientWidth;
        myConfig.height = this.graphRef.current.parentElement.clientHeight;

        this.setState({myConfig});
        
    }
    
    transformData() {
        var linksObj = [];
        response.results[0].data[0].graph.relationships.forEach( function (rel) {
            var tempObj = {
                source: rel.startNode,
                target: rel.endNode,
                label: rel.properties.score || null
            };
            linksObj.push(tempObj);
        });
        return {
                nodes: response.results[0].data[0].graph.nodes,
                links: linksObj
        };
    }
    
    onClickNode (id) {
        this.setState({nodeId: id});
    }
    
    render() {
        //const classes = useStyles(); 
        const graphData = this.transformData();
        let config = this.state.myConfig;
        return (
            <div ref={this.graphRef}>
                <Graph id="graph-id" 
                data={graphData} 
                config={config} 
                onClickNode={(nodeId) => this.onClickNode(nodeId)}
                
                />
            </div>
        
        
        )}

}

export default GraphComponent;