import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { isEmpty, sortBy } from 'lodash'
import moment from 'moment'

import TodoListItem from './TodoListItem'
import './styles.scss'

const DATE_FORMAT = 'DD MMM YYYY'

const TodoList = ({
  listTask,
  onRemoveTask,
  onUpdateTask,
  onBulkDone,
  onBulkRemove
}) => {

  const [searchVal, setSearchVal] = useState('')
  const [selectedId, setSelectedId] = useState([])

  const onChangeSearchVal = e => {
    setSearchVal(e.target.value)
  }

  const onSelectTask = ({ id, checked }) => {
    if (checked) {
      setSelectedId([...selectedId, id])
    } else {
      setSelectedId(selectedId.filter(item => item !== id))
    }
  }

  const onBulkDoneClick = () => {
    onBulkDone(selectedId, () => {
      setSelectedId([])
    })
  }

  const onBulkRemoveClick = () => {
    onBulkRemove(selectedId, () => {
      setSelectedId([])
    })
  }

  const onRemoveOneTask = (id) => {
    onRemoveTask(id)
    setSelectedId(selectedId.filter(item => item !== id))
  }

  const listTaskShow = listTask.filter(item => item.title.includes(searchVal || ''))
  const listTaskShowSorted = sortBy(listTaskShow, (item) => moment(item.dueDate, DATE_FORMAT))

  return (
    <>
    <div className="todo-list-container">
      <div className="title">
        To Do List
      </div>
      <Input
        className="mb-3"
        placeholder="Search ..."
        value={searchVal}
        onChange={onChangeSearchVal}
      />
      <div className="list-item">
        {listTaskShowSorted.map(item => (
          <TodoListItem
            task={item}
            key={item.id}
            onRemoveOneTask={onRemoveOneTask}
            onUpdateTask={onUpdateTask}
            onSelectTask={onSelectTask}
          />
        ))}
      </div>
     
    </div>
    {!isEmpty(selectedId) && (
        <div className="bulk-action">
          <span>
            Bulk Action:
          </span>
          <div>
            <Button className="done-btn" onClick={onBulkDoneClick}>
              Done
            </Button>
            <Button className="remove-btn" onClick={onBulkRemoveClick}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default TodoList
