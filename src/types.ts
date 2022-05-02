export interface Friend {
    id: number
    username: string    
}

export interface User {
    id: number
    name: string
    username: string
    email: string
    age: number
    power: string
    password: string
    friends: Friend[]
}