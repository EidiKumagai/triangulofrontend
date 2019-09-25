import React from 'react';
import { DeleteCell } from '../../Tables/antTables/helperCells';
function createColumns(editColumn, deleteColumn) {
  return [
    {
      title: 'Numero',
      dataIndex: 'number',
      rowKey: 'number'
    },
    {
      title: 'Nome Completo',
      dataIndex: 'name',
      rowKey: 'name'
    },
    {
      title: 'Nota',
      dataIndex: 'notes',
      rowKey: 'notes'
    },
    {
      title: '',
      rowKey: 'action',
      render: (text, record) =>
        <span>
          <DeleteCell
            onDeleteCell={() => {
              deleteColumn(record);
            }}
          />
        </span>
    }
  ];
}

const fakedata = [
  {
    id: 3,
    key: 1,
    number: '**** **** **** 4243',
    name: 'John Brown',
    notes: 'Nulla vitae elit libero, a pharetra augue.'
  },
  {
    id: 2,
    key: 2,
    number: '**** **** **** 4242',
    name: 'Jim Green',
    notes: 'Nullam id dolor id nibh ultricies vehicula ut id elit.'
  },
  {
    id: 1,
    key: 3,
    number: '**** **** **** 4241',
    name: 'Joe Black',
    notes: 'Nulla vitae elit libero, a pharetra augue.'
  }
];
export { createColumns, fakedata };
