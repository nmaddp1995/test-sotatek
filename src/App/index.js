import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'

import Task from '../Task'
import TodoList from '../TodoList'
import './styles.scss'
import { isEmpty } from 'lodash'

let idIndex = 0
try {
  idIndex = localStorage.getItem('idIndex') ? parseInt(localStorage.getItem('idIndex')) : 0
} catch {}

const App = () => {
  const [listTask, setListTask] = useState([])
  
  useEffect(() => {

    try {
      const listTaskInStorage = localStorage.getItem('listTask')
      if (!isEmpty(listTaskInStorage)) {
        setListTask(JSON.parse(listTaskInStorage))
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('listTask', JSON.stringify(listTask));
    localStorage.setItem('idIndex', idIndex);
  }, [listTask])

  const onAddTask = (task, callback) => {
    setListTask([...listTask, {
      ...task,
      id: idIndex
    }])
    idIndex ++
    if (callback) {
      callback()
    }
  }

  const onRemoveTask = (id) => {
    setListTask(listTask.filter(item => item.id !== id))
  }

  const onUpdateTask = (task) => {
    const newListTask = listTask.map(item => {
      if (item.id === task.id) {
        return {
          ...task
        }
      }
      return item
    })
    setListTask(newListTask)
  }

  const onBulkDone = (ids, callback) => {
    setListTask(listTask.filter(item => !ids.includes(item.id)))
    callback()
  }

  const onBulkRemove = (ids, callback) => {
    setListTask(listTask.filter(item => !ids.includes(item.id)))
    callback()
  }


  return (
    <div className="main">
      <Row className="container">
        <Col span={10}>
          <Task onSave={onAddTask} />
        </Col>
        <Col span={14} className="h-100">
          <TodoList
            listTask={listTask}
            onRemoveTask={onRemoveTask}
            onUpdateTask={onUpdateTask}
            onBulkDone={onBulkDone}
            onBulkRemove={onBulkRemove}
          />
        </Col>
      </Row>
    </div>

  );
}

export default App;
