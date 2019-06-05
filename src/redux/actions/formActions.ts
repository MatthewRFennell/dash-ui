export const setFormDetails = (itinerary) => {
    return {
        type: 'setFormDetails',
        itinerary,
    }
}

export const removeFormDetails = () => {
    return {
        type: 'removeFormDetails',
    }
}
