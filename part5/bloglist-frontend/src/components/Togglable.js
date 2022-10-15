import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(props.initState)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div className="d-grid gap-2">
      {!visible ? (
        <Button variant="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      ) : (
        <div>
          {props.children}
          <Button variant="secondary" onClick={toggleVisibility}>
            cancel
          </Button>
        </div>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  initState: PropTypes.bool.isRequired,
}

export default Togglable
