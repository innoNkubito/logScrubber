import {User, Friend } from "./types"

export const replaceWithAsterisks = (str: string): string => {
    if (typeof str !== "string") {
        throw Error(`Invalid arg type: received ${typeof str} but expected string`)
    }
    return Array(str.split('').length).fill("*").join("")
}

export const scrubEmail = (email: string): string => {
    const indexOfAtSym = email.indexOf("@")
    const username = email.slice(0, indexOfAtSym)
    const userNameRegex = new RegExp(username)
    return email.replace(userNameRegex, replaceWithAsterisks(username))
}

export const scrubFriend = ({ id, username }: Friend): Friend => {
    return {
        id,
        username: replaceWithAsterisks(username)
    }
}

export const scrub = (user: User): User => {
    const { name, username, password, email, friends } = user
    return {
        ...user,
        name: replaceWithAsterisks(name),
        username: replaceWithAsterisks(username),
        password: replaceWithAsterisks(password),
        email: scrubEmail(email),
        friends: friends.map(f => scrubFriend(f))
    } 
} 