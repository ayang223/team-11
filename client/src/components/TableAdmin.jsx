import React from 'react';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table';

// Table data (list)
const rows = [
  ['a1', 'b1', 'c1','d1'],
  ['a2', 'b2', 'c2','d2'],
  ['a3', 'b3', 'c3','d3'],
  // .... and more
];

// Render your table
var TableAdmin=React.createClass({
  createtListUsers: function(data){
  var metadata = [];
  // var id = data.ID;
  alert(JSON.parse(data));
  // var username = data.username;
  // var firstname = data.firstname;
  // var lastname = data.lastname;
  //
  // var row =[];
  // row.push(currentID)
  // row.push(currentUserName);
  // row.push(currentFirstName);
  // row.push(currentLastName);
  // metadata.push(row);
  return metadata;

},



render() {
    var dataFromAdmin = this.props.data;
    var metadata=this.createtListUsers(dataFromAdmin);
    var heightTotal = metadata.length*50 + 52

    return (
      <Table
        rowHeight={50}
        rowsCount={rows.length}
        width={960}
        height={heightTotal}
        headerHeight={50}>
        <Column
          header={<Cell>ID</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][0]}
            </Cell>
          )}
          width={240}
        />
        <Column
          header={<Cell>Username</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][1]}
            </Cell>
          )}
          width={240}
        />
        <Column
          header={<Cell>First Name</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][2]}
            </Cell>
          )}
          width={240}
        />
        <Column
          header={<Cell>Last Name</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][3]}
            </Cell>
          )}
          width={240}
        />
      </Table>
    );
  }
});
module.exports = TableAdmin;
