export interface NewCourse {
    name: string
    dishes: NewDish[]
}
export interface NewDish {
    name: string
    description: string
    warnings: string[]
}

export interface NewMenu {
    courses: NewCourse[]
    caterer:  string
}
