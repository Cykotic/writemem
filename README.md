# NodePS4debug

This repository demonstrates the use of the `nodeps4debug` package to interact with a PS4 console.

## Prerequisites

- Node.js installed on your computer.
- `nodeps4debug` npm package installed. You can find it here [npm](https://www.npmjs.com/package/nodeps4debug) 

## Description

The script performs the following operations:
1. Connects to a PS4 console using its IP address.
2. Sends a notification to the console.
3. Retrieves a list of processes running on the console.
4. Searches for a process named `eboot.bin`.
5. Writes specified memory bytes to the found process.

## Script Overview

```javascript
const {
    connect,
    writeMemory,
    notify,
    getProcessList
} = require("nodeps4debug");

async function main() {
    try {
        await connect('192.168.137.151');
        console.log('Connected to PS4.');

        await notify('Hello World!');

        const processList = await getProcessList();
        const pid = processList.processArray.find(obj => obj.name === 'eboot.bin');

        if (!pid) {
            throw new Error('Process eboot.bin not found.');
        }

        const meh = [{
            address: "134A073", // address
            data: "909090" // bytes
        }];

        for (const eh of meh) {
            const addressInt = parseInt(eh.address, 16);
            const bytes = Buffer.from(eh.data, "hex");
            await writeMemory(pid.id, addressInt, bytes);
            console.log(`Memory written to PID: ${pid.id}, Address: ${addressInt}, Data: ${bytes.toString('hex')}`);
        }

        console.log("Memory write operations completed!");
    } catch (error) {
        throw new Error(error)
    }
}

main();
```

# Usage
```Bash
node index.js
```

