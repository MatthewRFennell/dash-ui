const inititalState = {
    set: false,
}

const form = (state = inititalState, action) => {
    switch (action.type) {
        case 'setFormDetails':
            return {
                set: true,
                itinerary_id: action.itinerary.itinerary_id,
            }
        case 'removeFormDetails':
            return {
                set: false,
            }
        default:
            return state
    }
}

export default form
