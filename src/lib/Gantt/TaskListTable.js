import React from 'react';
import {Table} from 'antd';

const TaskListTable = props => {
  const {rowHeight: rowheight, tasks, columns, data, width = 700} = props;
  return (
    <div style={{width, height: rowheight * tasks.length}}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        size="middle"
        showHeader={false}
      />
    </div>
  );
};

export default TaskListTable;
