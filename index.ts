import fs from "fs"
import path from "path"
import { scrub, User, userSchema } from "./src"

const scrubDataFromFile = () => {
    const args = process.argv.slice(2)
    const filePath = args[0]

    if (!filePath || args.length > 1) {
        console.error("Invalid usage of command: requires exactly one filePath arg")
        process.exit()
    }

    const fPath = path.relative(".", filePath)
    if (path.extname(fPath) !== ".json") {
        console.error("Invalid file format: only json files accepted")
        process.exit()
    }

    if (!fs.existsSync(fPath)) {
        console.error(`Invalid filePath at ${fPath}. 
        Make sure that your test file is created in the project folder.`)
        process.exit()
    }

    const fileContent = fs.readFileSync(fPath, "utf-8")
    let userData: User[]

    try {
        userData = JSON.parse(fileContent)

        if (Array.isArray(userData)) {
            //validate data
            userData.every(user => userSchema.parse(user))
            const scrubbedData = userData.map(u => scrub(u))
            console.log(scrubbedData)
        }
        else {
            userSchema.parse(userData)
            console.log(scrub(userData))
        }
    } catch (err) {
        console.error(`Invalid json format in file: ${err.message}`)
    }
}

scrubDataFromFile()