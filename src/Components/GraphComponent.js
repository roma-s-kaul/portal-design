/*jshint esversion: 9 */
import React, {Component} from 'react'
import { Graph } from 'react-d3-graph';
import TableComponent from './TableComponent';
import { makeStyles } from '@material-ui/core/styles';

const response = require('./response.json');
const temp = {
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
}
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
        const classes = temp;
        return (
            <div>
                <div className = {classes.graph}>
                    <div ref={this.graphRef}>
                        <Graph id="graph-id" 
                            data={graphData} 
                            config={config} 
                            onClickNode={(nodeId) => this.onClickNode(nodeId)}
                        />
                    </div>
                    <div className = {classes.additionalInfo} >
                        <TableComponent nodeId={this.state.nodeId}/>
                    </div>
                </div>
                
            </div>
        
        )}

}

export default GraphComponent;