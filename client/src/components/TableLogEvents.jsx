import React from 'react';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table';

// Render your table
var TableLogEvents = React.createClass({
  createLogList: function(data) {
    var metadata = [];
    console.log('xDDDD');
    console.log(data);
    var logEvents = null;
    if (data && data["Log Events"]) {
      logEvents = data["Log Events"];
    }
    if (logEvents != null) {
      for (var i = 0; i < logEvents.length; i++) {
        var row = [];
        var currentLogEvent = logEvents[i];
        var currentID = currentLogEvent.id;
        var currentUsername = currentLogEvent.username;
        var currentAction = currentLogEvent.action;
        var currentDateTime = currentLogEvent.date_time;
        if (currentID != null) {
          row.push(currentID);
        } else {
          row.push("N/A");
        }
        if (currentUsername != null) {
          row.push(currentUsername);
        } else {
          row.push("N/A");
        }
        if (currentAction != null) {
          row.push(currentAction);
        } else {
          row.push("N/A");
        }
        if (currentDateTime != null) {
          row.push(currentDateTime);
        } else {
          row.push("N/A");
        }
        metadata.push(row);
      }
    }
    return metadata;
  },

  render() {
    var dataFromAdmin = this.props.data;
    var metadata = this.createLogList(dataFromAdmin);
    var heightTotal = metadata.length*50 + 52

    return (
      <Table
        rowHeight={50}
        rowsCount={metadata.length}
        width={960}
        height={heightTotal}
        headerHeight={50}>
        <Column
          header={<Cell>ID</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][0]}
            </Cell>
          )}
          width={100}
        />
        <Column
          header={<Cell>Username</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][1]}
            </Cell>
          )}
          width={240}
        />
        <Column
          header={<Cell>Action</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][2]}
            </Cell>
          )}
          width={380}
        />
        <Column
          header={<Cell>Date and Time</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][3]}
            </Cell>
          )}
          width={240}
        />
      </Table>
    );
  }
});
module.exports = TableLogEvents;
