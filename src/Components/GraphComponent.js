/*jshint esversion: 9 */
import React, {Component} from 'react'
import { Graph } from 'react-d3-graph';
import TableComponent from './TableComponent';

const response = require('./response.json');
const temp = {
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        height: "500px"
      },
      edit: {
          position: "absolute",
          color: 'blue',
          marginLeft: "2%",
          backgroundColor: "white"
      },
      graph: {
            width: "70%",
            boxShadow: "4px -4px 8px 0 rgba(0,0,0,0.5)",
            transition: "0.3s",
            color: "white",
            backgroundColor: "rgb(49 47 47)",
            marginRight: "5px",
            borderRadius: "5px"
      },
      additionalInfo: {
        width: "30%",
        boxShadow: "4px -4px 8px 0 rgba(0,0,0,0.5)",
        transition: "0.3s",
        color: "white",
        backgroundColor: "rgb(49 47 47)",
        marginLeft: "5px",
        borderRadius: "5px",
        overflowY: "scroll"
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
                directed: true,
                node: {
                    color: "wheat",
                    size: 2000,
                    fontSize: 14,
                    labelPosition: "center",
                    //highlightStrokeColor: "white"
                },
                link: {
                    highlightColor: "lightblue",
                    color: 'white',
                    renderLabel: true,
                    fontSize: 14,
                    semanticStrokeWidth: true,
                    fontColor: 'wheat'
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
        myConfig.width = this.graphRef.current.clientWidth;
        myConfig.height = this.graphRef.current.clientHeight;

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
            <div style={temp.root}>
                <div style={temp.graph} ref={this.graphRef}>
                    <Graph id="graph-id" 
                        data={graphData} 
                        config={config} 
                        onClickNode={(nodeId) => this.onClickNode(nodeId)}
                    />
                </div>
                <div style={temp.additionalInfo} >
                    <TableComponent nodeId={this.state.nodeId}/>
                </div>
            </div>
        
        )}

}

export default GraphComponent;