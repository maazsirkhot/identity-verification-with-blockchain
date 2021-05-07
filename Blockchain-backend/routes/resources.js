const express = require('express');
const router = express.Router();
const network = require('../system/network');


// Create a new wallet
router.post('/', async (request, response) => {
    // console.log('Hit endpoint')

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
    console.log('data: ', data);
    const createResp = await contract.submitTransaction('CreateIdentity', data.userId, data.docType, data.verifier)
    console.log('createResp:', JSON.stringify(JSON.stringify(createResp).data));
    // response.end(JSON.stringify(createResp));
    response.status(200).end('Added new wallet');


    //Dummy data 
    // For incorrect data:
    // retVal := ReturnTypeWallet{
	// 		Status:   400,
	// 		WalletId: "",
	// 		IsValid: false,
	// 		Message:  "Error saving to ledger",
	// 	}
    // const results = {"status":200,"walletId":"Mzd5YWZkc3lnZTIzUGFzc3BvcnQ2MDdiODc0ZA==","isValid":true,"message":"Successfully read from ledger"}

    // response.writeHead(200,{
    //     'Content-Type' : 'application/json'
    // })
    // console.log('results: ', results);
    // response.end(JSON.stringify(results));
})

//Fetch wallet ID
router.get('/:walletId', async(request, response)=>{
    if (!request || !request.params) {
        res.status(400).send('resource required in params');
        return;
    }

    
    // mainNetwork = await network.setup();
    // const contract = mainNetwork.getCosntract('resources');
    // CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string)
    // const createResp = await contract.submitTransaction('ReadIdentity', data.walletId)
    // console.log(createResp);
    // response.status(200).end('Added new wallet');


    //Return: 400 for incorrect wallet ID
    const results = {"status":200,"walletId":"Mzd5YWZkc3lnZTIzUGFzc3BvcnQ2MDdiODc0ZA==","isValid":false,"message":"Successfully read from ledger"}
    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    // console.log('results: ', results);
    response.end(JSON.stringify(results));
})

//Change a user's identity information like Passport number/DL number/etc if it needs a new ledger update
router.post('/update/:walletId', async(request,response)=>{
    // mainNetwork = await network.setup();

    // const contract = mainNetwork.getContract('resources');

    // CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string)
    // const createResp = await contract.submitTransaction('UpdateIdentity', data.walletId)
    // console.log(createResp);
    // response.status(200).end('Added new wallet');


    //Request body: userId string, docType string, verifier string
    //docType should be different for an update
    //Return 400 for incorrect update values
    const results = {"status":200,"walletId":"cmVneTNmaDMzNERMNjA3YmNhN2I=","isValid":true,"message":"Updated ledger"}
    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    // console.log('results: ', results);
    response.end(JSON.stringify(results));s

})

//Delete user's wallet from the ledger
router.post('/delete/:walletId', async(request,response)=>{
    // mainNetwork = await network.setup();

    // const contract = mainNetwork.getContract('resources');

    // CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string)
    // const createResp = await contract.submitTransaction('DeleteIdentity', data.walletId)
    // console.log(createResp);
    // response.status(200).end('Added new wallet');


    //Request body: userId string, docType string, verifier string
    // Delete true {"status":200,"walletId":"Mzd5YWZkc3lnZTIzUGFzc3BvcnQ2MDdiODc0ZA==","isValid":false,"message":"Successfully read from ledger"}
    // Delete false {"status":400,"walletId":"","isValid":false,"message":"Identity does not exist in the ledger"}

    const results = {"status":200,"walletId":"Mzd5YWZkc3lnZTIzUGFzc3BvcnQ2MDdiODc0ZA==","isValid":false,"message":"Successfully deleted from ledger"}
    response.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    // console.log('results: ', results);
    response.end(JSON.stringify(results));

})

module.exports = router;
