export const loadEvents = (events) => {
    return {
        type: "loadEvents",
        events : events.map((e) => {
        e.date = new Date(e.date)
        return e
      })
    }
}

export const addEvent = (event) => {
    return {
        type: "addEvent",
        event : {
            ...event,
            date: new Date(event.date)
        }
    }
}