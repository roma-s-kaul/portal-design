/*jshint esversion: 9 */
import React, {Component} from 'react';
import { Graph } from 'react-d3-graph';
import TableComponent from './TableComponent';
import StickyHeadTable from './Network';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import * as d3 from 'd3';
import './GraphComponent.css';

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
            borderRadius: "5px",
            padding: "1rem"
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
      svgTemp: {
        fill: "white"
      }
}

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.graphRef = React.createRef();
        this.state = { 
            view: "graph",
            nodeId: "My Plan",
            myConfig:  {
                
                nodeHighlightBehavior: true,
                //automaticRearrangeAfterDropNode: true,
                maxZoom: 1,
                minZoom: 0.1,
                initialZoom: 1,
                panAndZoom: true,
                height: 400,
                width: 900,
                //disableLinkForce: false,
                directed: false,
                node: {
                    //color: "wheat",
                    size: 200,
                    fontSize: 18,
                    labelPosition: "left",
                    fontColor: "white"
                    //highlightStrokeColor: "white"
                },
                link: {
                    highlightColor: "lightblue",
                    color: 'white',
                    renderLabel: true,
                    fontSize: 18,
                    //semanticStrokeWidth: true,
                    fontColor: 'wheat',
                    type: 'STRAIGHT',
                    //markerWidth: 10
                    //strokeWidth: 300
                },
                d3: {
                    gravity: -1000,
                    disableLinkForce: true,
                    //linkLength: 3000,
                    //staticGraph: true
                }
            }
        };
        
        this.onClickNode = this.onClickNode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.renderGraph = this.renderGraph.bind(this);
    }

    componentDidMount() {
        var myConfig = {...this.state.myConfig};
        debugger;
        myConfig.width = this.graphRef.current.clientWidth;
        myConfig.height = this.graphRef.current.clientHeight - 51 - 32;

        this.setState({myConfig});
        /*force.on('tick', () => {
            this.forceUpdate()
            });*/
        
    }
    
    transformData() {
        var nodeObj = [];
        var linkObj = [];
        //fetch('').then(response => 
            //response.json().then(data => {
                var maxNodes = 10;
                var originHeight = this.state.myConfig.height * 0.8;
                var xoffset = this.state.myConfig.width / (maxNodes + 1);
                var originWidth = ((this.state.myConfig.width) / 2) + xoffset;
                var yoffset = originHeight / ((maxNodes / 2) + 1);
                var counter = 0;
                var xCoord = originWidth;
                var yCoord = this.state.myConfig.height;
                response.result.companies.forEach(company => {
                    var com = company.url.replace('www.', '');
                    var color = this.getNodeColor(company);
                    //mpPlan do nothing
                    if(counter != 0) {
                        xCoord = (counter + 1) * xoffset;
                        if(counter <= maxNodes/2) {
                            yCoord = originHeight - ((counter - 1) * yoffset);
                        } else {
                            yCoord = originHeight - (((maxNodes/2) - 1) * yoffset) + ((counter - 1 - (maxNodes/2)) * yoffset);
                        }
                    }
                    counter += 1;
                    
                    var tempObj = {
                        id: com,
                        companyName: company.Company_Name,
                        url: company.url,
                        naicsCode: company.NAICS_code,
                        sector: company.sector,
                        color: color,
                        x: xCoord,
                        y: yCoord
                        
                    }
                    nodeObj.push(tempObj);
                });
           // })
       // )
        

        Object.keys(response.result.similarity).forEach(key => {
            var similarity = (response.result.similarity[key].sim).toFixed(3);
            if(similarity > 0.3) {
                var tempObj = {
                    target: response.result.similarity[key].end,
                    source: response.result.similarity[key].start,
                    label: (response.result.similarity[key].sim).toFixed(3)
                }
                linkObj.push(tempObj);
            }
            
        });
        
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

    handleChange(event) {
        this.setState({view: event.currentTarget.value});
    }

    getNodeColor(node) {
        switch(node.sector) {
            case "Other":
                return '#68bdf6';
            case "Banks":
                return '#6dce9e';
            case "Transportation":
                return '#faafc2';
            case "Machinery and Business Equipme":
                return '#f2baf6';
            case "Construction and Construction":
                return '#ff928c';
            case "Food":
                return '#fcea7e';
            case "Consumer Durables":
                return '#ffc766';
            case "Fabricated Products":
                return '#405f9e';
            case "Textiles":
                return '#a5abb6';
            case "Retail Stores":
                return '#78cecb';
            case "Drugs":
                return '#b88cbb';
            case "Steel Works Etc":
                return 'black';
            case "Chemicals":
                return 'blue';
            case "Oil and Petroleum Products":
                return 'black';
            case "Automobiles":
                return 'pink';
            case "Mining and Minerals":
                return 'white';
            case "Utilities":
                return 'yellow';
            default:
                return 'green';
        }
    }

    
    render() {
        const graphData = this.transformData();
        let config = this.state.myConfig;

        return (
            <div style={temp.root}>
                    <div style={temp.graph} ref={this.graphRef}>
                    <div>
                        <ToggleButtonGroup orientation="horizontal" value={this.view} exclusive>
                            <ToggleButton value="graph" aria-label="graph" onClick={this.handleChange}>
                                <ViewModuleIcon style={temp.svgTemp} />
                            </ToggleButton>
                            <ToggleButton  value="network" aria-label="network" onClick={this.handleChange}>
                                <ViewQuiltIcon style={temp.svgTemp}/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                        {(this.state.view === "graph") ? 
                        <Graph id="graph-id" data={graphData} config={config} 
                        onClickNode={(nodeId) => this.onClickNode(nodeId)}/> : <StickyHeadTable data = {graphData}/>}
                    </div>
                <div style={temp.additionalInfo} >
                    <TableComponent nodeId={this.state.nodeId}/>
                </div>
            </div>
        
        )}

}

export default GraphComponent;