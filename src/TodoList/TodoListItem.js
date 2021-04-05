import React, { useState } from 'react'
import { Checkbox, Button } from 'antd';

import Task from '../Task'

const TodoListItem = ({
  task,
  onSelectTask,
  onRemoveOneTask,
  onUpdateTask
}) => {
  const [showDetail, setShowDetail] = useState(false)

  const onShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const onRemoveClick = () => {
    onRemoveOneTask(task.id)
  }

  const onCheckboxChange = (e) => {
    onSelectTask({ id: task.id, checked: e.target.checked})
  }

  return (
    <>
      <div className="todo-list-item-container">
        <Checkbox
          onChange={onCheckboxChange}
          className="checkbox-content"
        >
          {task.title}
        </Checkbox>
        <div className="item-btn-group">
          <Button className="detail-btn" onClick={onShowDetail}>
            Detail
          </Button>
          <Button className="remove-btn" onClick={onRemoveClick}>
            Remove
          </Button>
        </div>
      </div>
      {showDetail && (
        <div className="task-item-detail">
          <Task
            taskDetail={task}
            onSave={onUpdateTask}
            notShowTitle
            styleContainer={{
              padding: 0
            }}
          />
        </div>
      )}
    </>
  )
}

export default TodoListItem