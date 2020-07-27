/*jshint esversion: 9 */
import React from 'react';
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './TableComponent.css';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const response = require('./response.json');
const additionalResponse = require('./clickResponse.json');

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
        height: "100%"
    },
    rowKey: {
        textAlign: "left",
        width: "33%"
    },
    rowValue: {
        textAlign: "right",
        fontStyle: "italic",
        width: "67%",
        overflow: "auto"
    },
    accord: {
        boxShadow: "0px 4px 8px 0px rgb(255 255 255 / 20%), 0px 4px 8px 0px rgb(255 255 255 / 14%), 0px 4px 8px 0px rgb(255 255 255 / 12%)",
    backgroundColor: "#312f2f",
    color: "white",
    margin: "16px 0",
    borderRadius: "10px"
    }
});

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false, nodeId: 2, }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(panel, e) {
        this.state.expanded ? this.setState({ expanded: false }) : this.setState({ expanded: panel });
    };

    createData(response) {
        const nodeData = response.result.find(function(x) {
            return x.url == this.props.nodeId;
        }.bind(this));
        var nodeObj = {}
        nodeObj['id'] = nodeData.id;
        //nodeObj['labels'] = nodeData.labels;
        nodeObj['companyName'] = nodeData.companyName || '-';
        nodeObj['naicsCode'] = nodeData.naicsCode || '-';
        nodeObj['sector'] = nodeData.sector || '-';
        nodeObj['url'] = nodeData.url || '-';
        //let relationshipData = graph.relationships.find(node => node.properties.url == this.props.nodeId);
        //nodeObj['type'] = relationshipData.type;
        //nodeObj['score'] = relationshipData.properties.score;
        return nodeObj;
    }

    /*createAdditionalData(openCorp) {
        let addObj = {}
        addObj['AgentName']=
        addObj['Retrieve'] =
        addObj['']
    }*/
    /*componentDidMount() {
        fetch('https://randomuser.me/api/1.1/?results=15')
            .then(response => response.json())
            .then(data => { this.setState({ users: data.results }) });
    }*/

    render() {
        //const { users } = this.state;
        const displayData = this.createData(response);
        //const additionalData = this.createAdditionalData(additionalResponse.opencorporates)
        const classes = tableStyles();
        return (
            <div style={classes.root}>
                <h4> Id selected: {this.props.nodeId}</h4>

                <Accordion style={classes.accord} expanded={this.state.expanded === 'panel1'} value='panel1' onChange={(e) => this.handleChange("panel1", e)}>
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
                                <td style = {classes.rowValue} align="right">{displayData['id']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Sector</td>
                                <td style = {classes.rowValue} align="right">{displayData['sector']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Label</td>
                                <td style = {classes.rowValue} align="right">{displayData['labels']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Score</td>
                                <td style = {classes.rowValue} align="right">{displayData['score']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>NAICS Code</td>
                                <td style = {classes.rowValue} align="right">{displayData['naicsCode']}</td>
                            </tr>
                        </table>

                    </AccordionDetails>
                </Accordion>
                <Accordion style={classes.accord} expanded={this.state.expanded === 'panel2'} value='panel2' onChange={(e) => this.handleChange("panel2", e)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header" >
                        <Typography className={classes.heading}>Additional Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <table style={classes.table}>
                            <tr>
                                <td style = {classes.rowKey}>Agent Name</td>
                                <td style = {classes.rowValue} align="right">{displayData['AgentName']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Retrieved At</td>
                                <td style = {classes.rowValue} align="right">{displayData['Retrieve']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Updated At</td>
                                <td style = {classes.rowValue} align="right">{displayData['Sector']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Incorporation Date</td>
                                <td style = {classes.rowValue} align="right">{displayData['labels']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Jurisdiction Code</td>
                                <td style = {classes.rowValue} align="right">{displayData['score']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Company Type</td>
                                <td style = {classes.rowValue} align="right">{displayData['NAICS Code']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Agent Address</td>
                                <td style = {classes.rowValue} align="right">{displayData['NAICS Code']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Current Status</td>
                                <td style = {classes.rowValue} align="right">{displayData['NAICS Code']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Company Number</td>
                                <td style = {classes.rowValue} align="right">{displayData['NAICS Code']}</td>
                            </tr>
                            <tr>
                                <td style = {classes.rowKey}>Registry Url</td>
                                <td style = {classes.rowValue} align="right">{displayData['NAICS Code']}</td>
                            </tr>
                        </table>

                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default TableComponent;