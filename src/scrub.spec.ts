import { scrub, replaceWithAsterisks, scrubEmail, scrubFriend } from "./scrub"
import { User, Friend } from "./types"

describe("Scrub tests", () => {
    describe("replaceWithAsterisks", () => {
        it("should return a string of asterisks with the same length as string arg", () => {
            const stringArg = "howLongIsThis"
            const expectedString = "*************"
            const result = replaceWithAsterisks(stringArg)
            expect(result).toBe(expectedString)
            expect(result.length).toBe(expectedString.length)
        })
        it("should throw an error if a non-string arg is passed to fn", () => {
            const numArg = 5
            const expectedErrMsg = "Invalid arg type: received number but expected string"
            // @ts-ignore
            expect(() => replaceWithAsterisks(numArg)).toThrow(expectedErrMsg)
        })
        it("should return an empty string given an empty string", () => {
            expect(replaceWithAsterisks("")).toBe("")
        })
    })

    describe("scrubEmail", () => {
        it("should replace the username portion of the email with asterisks", () => {
            const emailArg = "inno@gmail.com"
            const expectedStr = "***@gmail.com"
            expect(scrubEmail(emailArg)).toBe(expectedStr)
        })
    })

    describe("scrubFriend", () => {
        it("should replace value of the username property of a friend object with asterisks", () => {
            const friend: Friend = {
                id: 123,
                username: "some_random_userXX"
            }
            const expectedFriend: Friend = {
                id: 123,
                username: "******************"
            } 
            expect(scrubFriend(friend)).toEqual(expectedFriend)
        })
    })

    describe("scrub", () => {
        test("given a user, it should scrub sensitive values(name, username, email, friends) and replace them with asterisks", () => {
            const testUser: User = {
                id: 123,
                name: "Elsa",
                username: "xXfrozen_princessXx",
                email: "elsa@arendelle.com",
                password: "trueToMyself!",
                age: 21,
                power: "ice ray",
                friends: [
                    {
                        id: 234,
                        username: "MagicSnowMan32"
                    },
                    {
                        id: 456,
                        username: "call_me_anna"
                    }
                ]
            }
    
            const expectedUser: User = {
                id: 123,
                name: "****",
                username: "*******************",
                email: "****@arendelle.com",
                password: "*************",
                age: 21,
                power: "ice ray",
                friends: [
                    {
                        id: 234,
                        username: "**************"
                    },
                    {
                        id: 456,
                        username: "************"
                    }
                ]
            }
    
            expect(scrub(testUser)).toEqual<User>(expectedUser)
        })
    })
})