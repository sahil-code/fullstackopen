import { useState } from 'react'
import { Form } from 'react-bootstrap'

const useField = (name, type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const placeholder = `insert ${name} here...`

  const formelement = (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control {...{ type, value, onChange, placeholder }} />
    </Form.Group>
  )

  return {
    value,
    formelement,
  }
}

export default useField
