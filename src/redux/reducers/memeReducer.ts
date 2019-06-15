const initialState = {
  vaporwave: false,
}

const meme = (state = initialState, action) => {
  switch (action.type) {
    case 'activateVaporwave':
      return { ...state, vaporwave: true }
    case 'deactivateWindows':
      return { ...state, vaporwave: false }
    case 'toggleAesthetic':
      return { ...state, vaporwave: !state.vaporwave }
    default:
      return state
  }
}

export default meme
