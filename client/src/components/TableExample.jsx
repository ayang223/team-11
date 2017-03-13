import React from 'react';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table';

// Table data as a list of array.
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];

// Render your table
var TableExample=React.createClass({

render() {

    return (
      <Table
        rowHeight={50}
        rowsCount={rows.length}
        width={2000}
        height={300}
        headerHeight={50}>
        <Column
          header={<Cell>Col 1</Cell>}
          cell={<Cell>Column 1 static content</Cell>}
          width={1000}
        />
        <Column
          header={<Cell>Col 3</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              Data for column 3: {rows[rowIndex][2]}
            </Cell>
          )}
          width={1000}
        />
      </Table>
    );
  }
});
module.exports = TableExample;
