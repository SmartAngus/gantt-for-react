import React from 'react';
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import {getStartEndDateForProject, initTasks} from './helper';
import TaskListTable from './TaskListTable';
import TaskListHeader from './TaskListHeader';

const BiciGantt = ({
  tasks,
  tableColumns,
  tableData,
  ganttHeight,
  tableWidth,
  mode=ViewMode.Month,
  onDateChange,
  onDelete,
  onDoubleClick,
  onExpanderClick,
  onProgressChange,
  onSelect,
}) => {
  const [view, setView] = React.useState(ViewMode.Month);
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = task => {
    onDateChange && onDateChange(task);
  };

  const handleTaskDelete = task => {
    onDelete && onDelete(task);
  };

  const handleProgressChange = async task => {
    onProgressChange && onProgressChange(task);
  };

  const handleDblClick = task => {
    onDoubleClick && onDoubleClick(task);
  };

  const handleSelect = (task, isSelected) => {
    onSelect && onSelect(task, isSelected);
  };

  const handleExpanderClick = task => {
    onExpanderClick && onExpanderClick(task);
  };

  return (
    <div style={{flex: 1}}>
      <Gantt
        locale="zh-CN"
        tasks={tasks}
        viewMode={mode}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? '155px' : ''}
        columnWidth={columnWidth}
        ganttHeight={ganttHeight}
        todayColor="antiquewhite"
        TaskListTable={p => (
          <TaskListTable
            {...p}
            columns={tableColumns}
            data={tableData}
            width={tableWidth}
          />
        )}
        TaskListHeader={p => (
          <TaskListHeader
            {...p}
            columns={tableColumns}
            data={tableData}
            width={tableWidth}
          />
        )}
        TooltipContent={(p)=>(
          <TooltipContent {...p}/>
        )}
      />
    </div>
  );
};

const TooltipContent=(props)=>{
  console.log(props);
  return (
    <div>sdsdsd</div>
  )
}

export default BiciGantt;
