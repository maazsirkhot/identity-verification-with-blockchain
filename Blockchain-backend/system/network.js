const fabric = require('fabric-network');
const fs = require('fs');

const mspID = 'verify'
// const crytoPath = `${process.env.ENV == 'dev' ? '../crypto-config' : '/tmp/crypto'}`
const cryptoPath = '/tmp/crypto'

async function setup(user = 'Admin') {
    // User validation check... there's a better way
    if (!['Admin','User1'].includes(user)) {
        console.error(`${user} user not found...`)
    }

    const walletDirectoryPath = `./system/configs/${mspID}/walletstore`
    const connectionProfilePath = `./system/configs/${mspID}/network-local.json`;
    const mspPath = `${cryptoPath}/peerOrganizations/${mspID}/users/${user}@${mspID}/msp`
    const certPath = `${mspPath}/signcerts/${user}@${mspID}-cert.pem`
    const pvtKeyPath = `${mspPath}/keystore/pvt-cert.pem`

    const cert = (await fs.promises.readFile(certPath)).toString();
    const pvkey = (await fs.promises.readFile(pvtKeyPath)).toString();

    // Connect to a gateway peer
    const wallet = await fabric.Wallets.newFileSystemWallet(walletDirectoryPath);
    const identity = {
        credentials: {
            certificate: cert,
            privateKey: pvkey,
        },
        mspId: mspID,
        type: 'X.509',
    };
    await wallet.put(user.toLowerCase(), identity);
    const gatewayOptions = {
        identity: user.toLowerCase(), // Previously imported identity
        wallet,
        discovery: {
            asLocalhost: true,
            enabled: false
        }
    };
    // read a common connection profile in json format
    const data = fs.readFileSync(connectionProfilePath);
    console.log('data received from readFilesync', data)
    const connectionProfile = JSON.parse(data);
    console.log('connectionProfile', connectionProfile)

    // use the loaded connection profile
    const gateway = new fabric.Gateway();
    await gateway.connect(connectionProfile, gatewayOptions);

    // Obtain the smart contract with which our application wants to interact
    return await gateway.getNetwork('mainchannel');
}

module.exports.setup = setup;