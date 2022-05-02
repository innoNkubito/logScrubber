# Log Scrubber

This project ships a `scrub` function that helps blur sensitive PII data from incoming user data to the API. 


## Tools
- Node Version 17.5.0 (use `nvm` to install this version if necessary)
- `ts-node` is used by the project to run the Typescript files. This will be installed in the module installation step below, however if run into issues consider installing `ts-node` globally. (https://github.com/TypeStrong/ts-node)
- Yarn v1.22.4 (other versions should be compatible, but refer to this version if you run into issues)

## Setting up & Testing

1. Install the required packages

    ```bash
    yarn install
    ```
2. Generate a JSON file with your test data within the root project folder. Recommend to use the `/testData` dir but it's not a must. 

3. Ensure the JSON object(s) respect the format as specified by the typescript interfaces below, otherwise you'll get validation errors

    ```bash
    
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

    ```
4. Run the script from the command line

    ```bash
      yarn scrub:file <path-to-your-file>
    ```

