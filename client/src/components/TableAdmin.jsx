import React from 'react';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table';

// Render your table
var TableAdmin=React.createClass({

  createListUsers: function(data){
  var metadata = [];
  var users = data.Users;
  if(users != null){
    for(var i = 0; i < users.length; i++) {
      var row = [];
      var currentUser = users[i];
      var currentUsername = currentUser.user;
      var currentID = currentUser.id;
      var currentFirstName = currentUser.first_name;
      var currentLastName = currentUser.last_name;

      if(currentID != null) {
        row.push(currentID);
      } else {
        row.push("N/A");
      }

      if(currentUsername != null) {
        row.push(currentUsername);
      } else {
        row.push("N/A");
      }

      if(currentFirstName != null) {
        row.push(currentFirstName);
      } else {
        row.push("N/A");
      }

      if(currentLastName != null) {
        row.push(currentLastName);
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
    var metadata=this.createListUsers(dataFromAdmin);
    var heightTotal = metadata.length*50 + 52

    return (
      <Table
        rowHeight={38}
        rowsCount={metadata.length}
        width={920}
        height={heightTotal}
        headerHeight={38}>
        <Column
          header={<Cell>ID</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][0]}
            </Cell>
          )}
          width={230}
        />
        <Column
          header={<Cell>Username</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][1]}
            </Cell>
          )}
          width={230}
        />
        <Column
          header={<Cell>First Name</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][2]}
            </Cell>
          )}
          width={230}
        />
        <Column
          header={<Cell>Last Name</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {metadata[rowIndex][3]}
            </Cell>
          )}
          width={230}
        />
      </Table>
    );
  }
});
module.exports = TableAdmin;
