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
            address: "address",
            data: "bytes"
        }];

        for (const eh of meh) {
            const addressInt = parseInt(eh.address, 16);
            const bytes = Buffer.from(eh.data, "hex");
            await writeMemory(pid.id, addressInt, bytes);
            console.log(`Memory written to PID: ${pid.id}, Address: ${eh.addressInt}, Data: ${bytes.toString('hex')}`);
        }

        console.log("Memory write operations completed!");
    } catch (error) {
        throw new Error(error)
    }
}

main();