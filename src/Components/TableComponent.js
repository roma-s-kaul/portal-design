/*jshint esversion: 9 */
import React from 'react';
import './TableComponent.css';
import { getAdditionalInfo } from './api';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {VictoryLegend, VictoryContainer} from 'victory';
//const additionalResponse = require('./clickResponse.json');

/* This is for displaying the basic and additional information and the legend */
const tableStyles = (theme) => ({
    root: {
        position: "relative",
        height: "100%",
        top: "0px",
        left: "0px",
        padding: "10px"
    },
    heading: {
        //fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    table: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflowWrap: "anywhere"
    },
    rowKey: {
        textAlign: "left",
        width: "33%"
    },
    rowValue: {
        textAlign: "right",
        fontStyle: "italic",
        width: "67%"
    },
    accord: {
        boxShadow: "5px 5px 10px #1d1e1e, -5px -5px 10px #272828",
        backgroundColor: "rgb(34,35,35)",
        color: "white",
        borderRadius: "10px",
        //margin: "20px 0"
        marginBottom: "2rem",
        fill: "white"
    }
});

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false, nodeId: "My Plan", response: this.props.data, additionalInfo: {}};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({nodeId: this.props.nodeId});
        //getAdditionalInfo(this.state.nodeId).then((reply)=> this.setState({additionalInfo: reply}));
    }

    componentDidUpdate(prev) {
        if(this.props.nodeId != prev.nodeId) {
            getAdditionalInfo(this.props.nodeId).then((reply)=> this.setState({additionalInfo: reply}));
        }
    }

    handleChange(panel, e) {
        this.state.expanded ? this.setState({ expanded: false }) : this.setState({ expanded: panel });
    };

    createData() {
        if ( !this.state.response.result ) return;
        const nodeData = this.state.response.result.companies.find(function(x) {
            return x.url.replace('www.', '') == this.props.nodeId;
        }.bind(this));
        var nodeObj = {}
        nodeObj['companyName'] = nodeData.Company_Name || '-';
        nodeObj['naicsCode'] = nodeData.NAICS_code || '-';
        nodeObj['sector'] = nodeData.sector || '-';
        nodeObj['url'] = nodeData.url || '-';
        return nodeObj;
    }

    render() {
        //const { users } = this.state;
        const displayData = this.createData();
        //const additionalData = this.createAdditionalData(additionalResponse.opencorporates)
        //if(this.props.nodeId != "My Plan")
          //  var temp = getAdditionalInfo(this.props.nodeId).then((reply)=> this.setState({additionalInfo: reply}));
        const classes = tableStyles();
        let additionalResponse = this.state.additionalInfo;
        debugger;
        return (
            <div style={classes.root}>
                <h4>{this.props.nodeId}</h4>
                {displayData ? 
                    (<Accordion style={classes.accord} expanded={this.state.expanded === 'panel1'} value='panel1' onChange={(e) => this.handleChange("panel1", e)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                            <Typography className={classes.heading}>Basic Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <table style={classes.table}>
                                <tr>
                                    <td style = {classes.rowKey}>Company Name</td>
                                    <td style = {classes.rowValue} align="right">{displayData['companyName']}</td>
                                </tr>
                                <tr>
                                    <td style = {classes.rowKey}>URL</td>
                                    <td style = {classes.rowValue} align="right">{displayData['url']}</td>
                                </tr>
                                <tr>
                                    <td style = {classes.rowKey}>Sector</td>
                                    <td style = {classes.rowValue} align="right">{displayData['sector']}</td>
                                </tr>
                                <tr>
                                    <td style = {classes.rowKey}>NAICS Code</td>
                                    <td style = {classes.rowValue} align="right">{displayData['naicsCode']}</td>
                                </tr>
                            </table>
                        </AccordionDetails>
                    </Accordion>) : ''
                }
                {(this.state.additionalInfo && Object.keys(this.state.additionalInfo).length != 0 && (this.state.additionalInfo.opencorporates != null)) ? 
                (<Accordion style={classes.accord} expanded={this.state.expanded === 'panel2'} value='panel2' onChange={(e) => this.handleChange("panel2", e)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header" >
                        <Typography className={classes.heading}>Additional Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <table style={classes.table}>
                            <tr>
                                <td style = {classes.rowKey}>Agent Name</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo['opencorporates']['agent_name'] || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Retrieved At</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.retrieved_at || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Updated At</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.updated_at || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Incorporation Date</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.incorporation_date || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Jurisdiction Code</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.jurisdiction_code || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Company Type</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.company_type || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Agent Address</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.agent_address || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Current Status</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.current_status || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Company Number</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.company_number || '-'}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Registry Url</td>
                                <td style = {classes.rowValue} align="right">{this.state.additionalInfo.opencorporates.registry_url || '-'}</td>
                            </tr>
                        </table>

                    </AccordionDetails>
                </Accordion>) : ''
                }   
                <h4>Legend</h4>
                    <VictoryLegend
                        height="750"
                        containerComponent={<VictoryContainer responsive={true}/>}
                        orientation="vertical"
                        colorScale={[ "#68bdf6", "#6dce9e", "#faafc2", "#f2baf6", "#ff928c", "#fcea7e", "#ffc766", "#405f9e",
                                        "#a5abb6", "#78cecb", "#b88cbb", "black", "blue", "orange", "pink", "white", "yellow",
                                        "green" ]}
                        borderPadding={{ bottom: 10, left: 20, right: 20 }}
                        data={[{ name: "Automobiles", labels: { fill: "white", fontSize: 18}, symbol: { fill: "pink" }},
                            { name: "Banks", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#6dce9e" }},
                            { name: "Chemicals", labels: { fill: "white", fontSize: 18}, symbol: { fill: "blue" }},
                            { name: "Construction and Construction", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#ff928c" }}, 
                            { name: "Consumer Durables", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#ffc766" }}, 
                            { name: "Drugs", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#b88cbb" }},
                            { name: "Fabricated Products", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#405f9e" }},
                            { name: "Food", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#fcea7e" }},
                            { name: "Machinery and Business Equipme", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#f2baf6" }},
                            { name: "Mining and Minerals", labels: { fill: "white", fontSize: 18}, symbol: { fill: "white" }},
                            { name: "Oil and Petroleum Products", labels: { fill: "white", fontSize: 18}, symbol: { fill: "orange" }},
                            { name: "Other", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#68bdf6" }},
                            { name: "Retail Stores", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#78cecb" }}, 
                            { name: "Steel Works Etc", labels: { fill: "white", fontSize: 18}, symbol: { fill: "black" }},
                            { name: "Textiles", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#a5abb6" }},
                            { name: "Transportation", labels: { fill: "white", fontSize: 18}, symbol: { fill: "#faafc2" }},
                            { name: "Utilities", labels: { fill: "white", fontSize: 18}, symbol: { fill: "yellow" }}, 
                            { name: "Undefined", labels: { fill: "white", fontSize: 18}, symbol: { fill: "green" }}]}
                    />
            </div>
        );
    }
}

export default TableComponent;