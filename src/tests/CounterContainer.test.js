import React from 'react'
import ReactDOM from 'react-dom'
import { CounterContainer } from '../containers/CounterContainer'

it('renders without crashing', () => {
  const div = document.createElement('div')
<<<<<<< HEAD
  ReactDOM.render(<CounterContainer  counter={0} dispatch={() => {

  }}/>, div)
})

=======
  ReactDOM.render(<CounterContainer, counter={0}
  dispatch={() = > {
  }}/>, div)
})
>>>>>>> c5c2f75955290dc75aeb2549e6312cec58d7e8d7
