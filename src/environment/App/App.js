import React from 'react';
import {BiciGantt, Counter} from 'lib';
import './App.css';
import 'antd/dist/antd.css';
import {getStartEndDateForProject, initTasks} from '../../lib/Gantt/helper';

const App = () => {
  const [tasks, setTasks] = React.useState(initTasks());
  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 4 || index === 5 || index === 6 || index === 7) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 120,
      render: (text, row, index) => {
        if (index < 4) {
          return <a>{text}</a>;
        }
        return {
          children: <a>{text}</a>,
          props: {
            colSpan: 5,
          },
        };
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 80,
      render: renderContent,
    },
    {
      title: 'Home phone',
      colSpan: 2,
      width: 200,
      dataIndex: 'tel',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4 || index === 5 || index === 6 || index === 7) {
          obj.props.colSpan = 0;
        }

        return obj;
      },
    },
    {
      title: 'Phone',
      colSpan: 0,
      width: 130,
      dataIndex: 'phone',
      render: renderContent,
    },
    {
      title: 'Address',
      width: 200,
      dataIndex: 'address',
      render: renderContent,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
    {
      key: '6',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
    {
      key: '7',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
    {
      key: '8',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
  ];
  const handleTaskChange = task => {
    console.log(`On date change Id:${task.id}`);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = {...project, start, end};
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = task => {
    const conf = window.confirm(`Are you sure about ${task.name} ?`);
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async task => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log(`On progress change Id:${task.id}`);
  };

  const handleDblClick = task => {
    alert(`On Double Click event Id:${task.id}`);
  };

  const handleSelect = (task, isSelected) => {
    console.log(`${task.name} has ${isSelected ? 'selected' : 'unselected'}`);
  };

  const handleExpanderClick = task => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log(`On expander click Id:${task.id}`);
  };
  return (
    <div>
      <Counter initialValue={0} />
      <BiciGantt
        tasks={tasks}
        tableColumns={columns}
        tableData={data}
        ganttHeight={300}
        tableWidth={700}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
      />
    </div>
  );
};

export default App;
