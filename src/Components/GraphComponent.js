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
import getData from './api.js';
//const response = require('./response.json');

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
            response: {},
            businessPlan: this.props.businessPlan,
            view: "graph",
            nodeId: "My Plan",
            myConfig:  {
                nodeHighlightBehavior: true,
                maxZoom: 1,
                //focusZoom: 1,
                minZoom: 0.1,
                initialZoom: 1,
                panAndZoom: true,
                height: 400,
                width: 600,
                node: {
                    size: 200,
                    fontSize: 12,
                    labelPosition: "left",
                    fontColor: "white",
                    highlightFontSize: 18
                },
                link: {
                    highlightColor: "red",
                    color: 'white',
                    renderLabel: true,
                    fontSize: 12,
                    opacity : 1,
                    fontColor: 'wheat',
                    type: 'STRAIGHT'
                },
                d3: {
                    gravity: -1000,
                    disableLinkForce: true,
                    //linkLength: 3000,
                }
            }
        };
        
        this.onClickNode = this.onClickNode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.renderGraph = this.renderGraph.bind(this);
    }

    componentDidMount() {
        var myConfig = {...this.state.myConfig};
        myConfig.width = this.graphRef.current.clientWidth;
        myConfig.height = this.graphRef.current.clientHeight - 51 - 32;

        this.setState({myConfig});
        getData(this.state.businessPlan).then((reply)=> this.setState({response: reply}));
        /*force.on('tick', () => {
            this.forceUpdate()
            });*/
        //var myurl="http://ckg03.isi.edu:8050/getneighborfrombusinessplan?businessplan="
       
        
        
    }
    
    transformData() {
        var nodeObj = [];
        var linkObj = [];
        //fetch('').then(response => 
            //response.json().then(data => {
        var maxPoints = 10
        var usableHeight = this.state.myConfig.height 
        var usableWidth = this.state.myConfig.width 
        var originXCoord = usableWidth / 2
        var originYCoord = usableHeight / 2
        var radius = Math.min(originXCoord, originYCoord)
        var startDegree = -90
        var jumpDegree = 360 / maxPoints
        var xCoord = originXCoord
        var yCoord = originYCoord
        var counter = 0
        var degree = 0;
// For semicircle make `originYCoord = usableHeight` and `jumpDegree = 180 / maxPoints`
        if(!this.state.response.result) return null; 
        this.state.response.result.companies.forEach(company => {
            var com = company.url.replace('www.', '');
            var color = this.getNodeColor(company);
            //mpPlan do nothing
            var companyName = '';
            if(counter != 0) {
                degree = startDegree + (counter * jumpDegree)
                xCoord = originXCoord + (radius * Math.sin((Math.PI * degree) / 180))
                yCoord = originYCoord + (radius * Math.cos((Math.PI * degree) / 180))
            }
            var alignment = 'left';
            if(xCoord > originXCoord) {
                alignment = 'right';
            }
            if(counter == 0) {
                alignment = 'bottom';
            }
            
            counter += 1
            
            

            var tempObj = {
                id: com,
                companyName: company.Company_Name,
                url: company.url,
                naicsCode: company.NAICS_code,
                sector: company.sector,
                color: color,
                x: xCoord,
                y: yCoord,
                labelPosition: alignment
            }
            nodeObj.push(tempObj);
        });
        
        var minSim = 1
        Object.keys(this.state.response.result.similarity).forEach(key => {
            if(this.state.response.result.similarity[key].start == 'My Plan' && minSim > (this.state.response.result.similarity[key].sim))
                minSim = (this.state.response.result.similarity[key].sim);
        });
        Object.keys(this.state.response.result.similarity).forEach(key => {
            var similarity = (this.state.response.result.similarity[key].sim);
            var lineStyle = 'STRAIGHT';
            if((this.state.response.result.similarity[key].start) != 'My Plan') {
                lineStyle = 'CURVE_SMOOTH';
            }
            if(similarity >= minSim) {
                var tempObj = {
                    target: this.state.response.result.similarity[key].end,
                    source: this.state.response.result.similarity[key].start,
                    label: (this.state.response.result.similarity[key].sim).toFixed(2),
                    type: lineStyle
                }
                linkObj.push(tempObj);
            }
            
        });
        
        return {
                nodes: nodeObj,
                links: linkObj,
                focusedNodeId: 'My Plan'
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
        let config = this.state.myConfig;
        const graphData = this.transformData();
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
                        {graphData ? (this.state.view === "graph") ? 
                        <Graph id="graph-id" data={graphData} config={config} 
                        onClickNode={(nodeId) => this.onClickNode(nodeId)}/> : <StickyHeadTable data = {graphData}/> : ""}
                    </div>
                <div style={temp.additionalInfo} >
                    {graphData ? 
                    <TableComponent nodeId={this.state.nodeId} data = {this.state.response}/> : ''}
                </div>
            </div>
        
        )}

}

export default GraphComponent;