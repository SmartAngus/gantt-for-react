import React from 'react';
import {Table} from 'antd';
import styles from './styles.module.css';

const TaskListHeader = props => {
  console.log('----');
  const {rowHeight, tasks, rowWidth, columns, data, width = 700} = props;
  console.log(rowWidth);
  const renderContent = (value, row, index) => {
    const obj = {
      children: '',
      props: {},
    };
    return obj;
  };
  const headerColumns = columns.map((item, index) => ({
    ...item,
    render: renderContent,
  }));
  return (
    <div style={{width, height: 50, border: '1px solid #e0e0e0'}}>
      <Table
        columns={headerColumns}
        dataSource={data}
        pagination={false}
        size="middle"
        rowClassName={styles.hiddenHeaderRow}
      />
    </div>
  );
};
export default TaskListHeader;
