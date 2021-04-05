import React, { useState, useEffect } from 'react'
import { Input, Row, Col, DatePicker, Select, Button } from 'antd'
import moment from 'moment'
import { cloneDeep } from 'lodash'

import ItemWithTitle from './ItemWithTitle'
import './styles.scss'

const DATE_FORMAT = 'DD MMM YYYY'

const { TextArea } = Input;
const { Option } = Select;

const taskDefault = {
  dueDate: moment().format(DATE_FORMAT),
  priority: 'normal'
}

const Task = ({
  onSave,
  taskDetail,
  notShowTitle,
  styleContainer
}) => {
  const [task, setTask] = useState(taskDetail || cloneDeep(taskDefault))

  useEffect(() => {
    setTask(taskDetail || cloneDeep(taskDefault))
  }, [taskDetail])

  const disabledDate = (date) => {
    return date && moment(date).endOf('day') < moment().endOf('day');
  }

  const onClickAdd = () => {
    onSave(task, () => {
      setTask(taskDefault)
    })
  }

  const onClickSave = () => {
    onSave(task)
  }

  const onUpdateField = (field) => (e, val) => {
    switch (field) {
      case 'title':
      case 'description':
        return setTask({
          ...task,
          [field]: e.target.value
        })
      case 'dueDate':
        return setTask({
          ...task,
          [field]: val
        })
      default:
        // case select priority
        return setTask({
          ...task,
          [field]: e
        })
    }
  }

  return (
    <div className="new-task-container" style={styleContainer}>
      {!notShowTitle && (
        <div className="title">
          New Task
        </div>
      )}
      <Input
        className="mb-3"
        placeholder="Add new task ..."
        value={task.title}
        onChange={onUpdateField('title')}
      />
      <ItemWithTitle title="Description">
        <TextArea
          rows={4}
          className="mb-3"
          onChange={onUpdateField('description')}
          value={task.description}
        />
      </ItemWithTitle>
      <Row>
      <Col span={11}>
        <ItemWithTitle title="Due Date">
          <DatePicker
            format={DATE_FORMAT}
            value={moment(task.dueDate, DATE_FORMAT)}
            disabledDate={disabledDate}
            onChange={onUpdateField('dueDate')}
            allowClear={false}
          />
        </ItemWithTitle>
      </Col>
      <Col span={11} offset={2}>
        <ItemWithTitle title="Piority">
          <Select
            defaultValue="normal"
            value={task.priority}
            onChange={onUpdateField('priority')}
          >
            <Option value="low">Low</Option>
            <Option value="normal">Normal</Option>
            <Option value="high">High</Option>
          </Select>
        </ItemWithTitle>
      </Col>

      {!taskDetail ? (
        <Button
          className="save-btn" style={{ marginTop: 50 }}
          onClick={onClickAdd}
          disabled={!task?.title}
        >
          Add
        </Button>
        ) : (
          <Button
            className="save-btn" style={{ marginTop: 50 }}
            onClick={onClickSave}
            disabled={!task?.title}
          >
            Update
          </Button>
        )}
    </Row>
    </div>
  )
}

export default Task
