import adapter from '../services/adapter'

export function logIn() {
  return {
    type: 'LOGGED_IN'
  }
}

export function logInAsync(dispatch) {
  dispatch({
    type: 'LOGGED_IN'
  })

  if (!localStorage.token) {
    throw new Error('Please log in')
  }

  adapter.initialLoad()
    .then(r => {
      if (r.status === 401) {
        throw new Error('Unauthorized')
      }
      return r.json()
    })
    .then(() => {
      dispatch({ type: 'LOGGED_IN' })
    })
}
