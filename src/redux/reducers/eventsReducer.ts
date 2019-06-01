const initialState = {
    events: []
}

const events = (state = initialState, action) => {
    switch (action.type){
        case "loadEvents":
            return {
                events: action.events
            }
        case "addEvent":
            const newEvents = state.events
            newEvents.push(action.event)
            return {
                events: newEvents
            }
        default:
            return state
    }
}

export default events