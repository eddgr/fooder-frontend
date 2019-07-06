import adapter from '../services/adapter'

export const loading = () => {
  return {
    type: 'LOADING'
  }
}

export const logIn = data => {
  return {
    type: 'SET_USER', payload: data
  }
}

export const logInAsync = () => {
  if (!localStorage.token) {
    throw new Error('Please log in')
  }

  return dispatch => {
    // add loading here
    dispatch(loading())

    // then fetch
    adapter.initialLoad()
    .then(r => {
      if (r.status === 401) {
        throw new Error('Unauthorized')
      }
      return r.json()
    })
    .then(data => {
      setTimeout(() => {
        dispatch(logIn(data))
      }, 0) // change back to 1500
    })
  } // end dispatch
}
