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
        //height: "37rem",
        height: "calc(100vh - 291px)",
        overflowY: "scroll"
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
      },
      slider: {
        width: "300px",
      },
}

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.graphRef = React.createRef();
        this.state = { 
            nodeId: "My Plan",
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
                directed: false,
                node: {
                    color: "wheat",
                    size: 200,
                    fontSize: 14,
                    labelPosition: "left",
                    fontColor: "white"
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
        /*force.on('tick', () => {
            this.forceUpdate()
            });*/
        
    }
    
    cosineSimilarity(embedding1, embedding2) {
        var dotProd = 0;
        var mA = 0;
        var mB = 0;
        for(var i = 0; i < embedding1.length; i++) {
            dotProd += (embedding1[i] * embedding2[i]);
            mA += (embedding1[i] * embedding1[i]);
            mB += (embedding2[i] * embedding2[i]);
        }
        mA = Math.sqrt(mA);
        mB = Math.sqrt(mB);
        var similarity = dotProd/(mA * mB);
        return similarity;
    }
    
    transformData() {
        var nodeObj = [];
        var linkObj = [];
        for(var i=0; i < response.result.length; i++) {
            var tempObj = {
                id: response.result[i].url,
                companyName: response.result[i].Company_Name || null,
                naicsCode: response.result[i].NAICS_code || null,
                sector: response.result[i].sector || null
            };
            
            nodeObj.push(tempObj);
            for(var j=i+1; j< response.result.length; j++) {
                let simQ = (this.cosineSimilarity(response.result[i].embedding, response.result[j].embedding));
                console.log(simQ);
                if(simQ > 0.39) {
                    var tempObj2 = {
                        source: response.result[i].url,
                        target: response.result[j].url,
                        label: simQ.toFixed(3)
                    }
                    linkObj.push(tempObj2);
                }
            }

        }
        
        return {
                nodes: nodeObj,
                links: linkObj
        };
    }
    
    onClickNode (id) {
        this.setState({nodeId: id});
    }

    valuetext(value) {
        return `${value}`;
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