import React from 'react';
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './TableComponent.css';
const response = require('./response.json')

function formatDate(str) {
  return str.substr(0, 10);
}

function capitalize(str) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}


class UserTableRow extends React.Component {
  state = { expanded: false, nodeId: 2}

  toggleExpander = (e) => {
    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }

  createData(graph) {
    let nodeData = graph.nodes.find(node => node.id == this.props.nodeId);
    let nodeObj = {}
    nodeObj['id'] = nodeData.id;
    nodeObj['labels'] = nodeData.labels;
    nodeObj['Company Name'] = nodeData.properties.Company_Name || '-';
    nodeObj['NAICS Code'] = nodeData.properties.NAICS_code || '-';
    nodeObj['Sector'] = nodeData.properties.sector || '-';
    nodeObj['URL'] = nodeData.properties.url || '-';
    let relationshipData = graph.relationships.find(node => node.endNode == this.props.nodeId);
    nodeObj['type'] = relationshipData.type;
    nodeObj['score'] = relationshipData.properties.score;
    return nodeObj;
}

  render() {
    const displayData = this.createData(response.results[0].data[0].graph);
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td className="uk-text-nowrap">{this.props.nodeId}.</td>
        <td>{displayData['Company Name']}<br /><small>{displayData['URL']}</small></td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div className="uk-width-3-4">
                <h3>{displayData['Company Name']}</h3>
                <p>
                  Sector: <br/>
                  <i>
                    {displayData['Sector']}<br/>
                  </i>
                </p>
                <p>
                  NAICS CODE: {displayData['NAICS Code']}<br/>
                  Label: {displayData['labels']}
                </p>
                <p>Score: {displayData['score']}</p>
              </div>
            </div>
          </td>
        </tr>
      )
    ];
  }
}

class TableComponent extends React.Component {
  state = { users: null }

  componentDidMount() {
    fetch('https://randomuser.me/api/1.1/?results=15')
      .then(response => response.json())
      .then(data => { this.setState({users: data.results}) });
  }

  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
              <thead>
                <tr>
                  <th colSpan = {4} align="center">Company Information</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? <tr><td colSpan={3} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : <UserTableRow key={this.props.nodeId} nodeId={this.props.nodeId}/>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }
}

export default TableComponent;