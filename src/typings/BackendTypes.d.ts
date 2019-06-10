export interface EventRedued {
    event_id: number
    name: string
    blurb: string
    image: string
    tickets: number
    date: Date
    company: string
}

export interface Event extends EventRedued {
    itineraries: Itinerary[]
    attendees: Attendee[]
}

export interface Transport {
    transport_id: number
    operator: string
    vessel_id: string
    duration: number
    departTime: Date
    departFrom: string
    arriveAt: string
}

export interface Attendee {
    attendee_id: number
    fname: string
    sname: string
    diet: string
    confirmed: boolean
    form_id: string
    transport?: Transport
}

export interface Itinerary {
    itinerary_id: number
    name: string
    description: string
    start_date: Date
    end_date?: Date
    long: number
    lat: number
    menu?: Menu
}

export interface Menu {
    menu_id: number
    courses: Course[]
    caterer: string
    image?: string
}

export interface Course {
    course_id: number
    name: string
    dishes: Dish[]
}

export interface Dish {
    dish_id: number
    name: string
    description: string
    warnings: string[]
}
