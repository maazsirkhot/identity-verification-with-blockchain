const express = require('express');
const Buffer = require('buffer');
const router = express.Router();
const network = require('../system/network');


// Create a new wallet
router.post('/', async (request, response) => {

    // Request body: {
    //     "userId": "gud237gc2x",
    //     "docType": "Passport",
    //     "verifier": "Passport Authority"
    // }  
    if (!request || !request.body) {
        res.status(400).send('resource required in body');
        return;
    }

    const data = {...request.body}

    mainNetwork = await network.setup();
    const contract = mainNetwork.getContract('resources');


    // CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string)
    const resp = await contract.submitTransaction('CreateIdentity', data.userId, data.docType, data.verifier)

    // Converting buffer response from golang to string (walletID)
    // Ref: https://stackoverflow.com/questions/55041955/javascript-how-to-convert-buffer-to-a-string
    var test = '' + resp

    const results = {
        "status": 200,
        "walletId": test,
        "isValid": true,
        "message": "Successfully read from ledger"
    }
    console.log('results: ', results)

    if(test == '')  {
        results = {
            "status": 400,
            "walletId": test,
            "isValid": false,
            "message": "Error creating wallet"
        }
    }

    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    response.end(JSON.stringify(results));
})

//Fetch wallet ID
router.get('/:walletId', async(request, response)=>{
    if (!request || !request.params) {
        res.status(400).send('resource required in params');
        return;
    }
    
    mainNetwork = await network.setup();
    const contract = mainNetwork.getContract('resources');

    const resp = await contract.submitTransaction('ReadIdentity', request.params.walletId)
    var test = '' + resp
    console.log("response:" , resp)
    console.log("test:" , test)

    //Return: 400 for incorrect wallet ID
    const results = {
        "status":200,
        "walletId":request.params.walletId,
        "isValid":test,
        "message":"Successfully read from ledger"
    }

    if (test == '') {
       results = {
        "status":400,
        "walletId":request.params.walletId,
        "isValid":false,
        "message":"WalletID Not found"
    } 
    }
    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    // console.log('results: ', results);
    response.end(JSON.stringify(results));
})

//Change a user's identity information like Passport number/DL number/etc if it needs a new ledger update
router.post('/update/:walletId', async(request,response)=>{
    if (!request || !request.params || !request.body) {
        res.status(400).send('resource missing');
        return;
    }

    const data = {...request.body}

    mainNetwork = await network.setup();
    const contract = mainNetwork.getContract('resources');

    //userId string, docType string, verifier string, walletId string
    const resp = await contract.submitTransaction('UpdateIdentity', data.userId, data.docType, data.verifier, request.params.walletId)
    var test = '' + resp

    //Request body: userId string, docType string, verifier string
    //docType should be different for an update
    //Return 400 for incorrect update values
    const results = {
        "status":200,
        "walletId":test,
        "isValid":true,
        "message":"Updated ledger"
    }
    if(test == '') {
        results = {
            "status":400,
            "walletId":test,
            "isValid":false,
            "message":"Error updating ledger"
        }
    }

    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    // console.log('results: ', results);
    response.end(JSON.stringify(results));

})

//Delete user's wallet from the ledger
router.post('/delete/:walletId', async(request,response)=>{
    if (!request || !request.params) {
        res.status(400).send('resource required in params');
        return;
    }

    mainNetwork = await network.setup();
    const contract = mainNetwork.getContract('resources');

    const resp = await contract.submitTransaction('DeleteIdentity', request.params.walletId)
    var test = '' + resp
    console.log("response:" , resp)
    console.log("test:" , test)

    //Request body: userId string, docType string, verifier string
    // Delete true {"status":200,"walletId":"Mzd5YWZkc3lnZTIzUGFzc3BvcnQ2MDdiODc0ZA==","isValid":false,"message":"Successfully read from ledger"}
    // Delete false {"status":400,"walletId":"","isValid":false,"message":"Identity does not exist in the ledger"}

    if test == 'true' {
        const results = {
            "status":200,
            "walletId":request.params.walletId,
            "isValid":test,
            "message":"Successfully deleted from ledger"
        }
    } else {
        const results = {
            "status":400,
            "walletId":request.params.walletId,
            "isValid":test,
            "message":"Error deleting from ledger"
        }
    }
    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    response.end(JSON.stringify(results));

})

module.exports = router;
