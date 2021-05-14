package main

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Structure of data in the ledger
type Identity struct {
	UserId   string `json:"userId"`
	DocType  string `json:"docType"`
	Verifier string `json:"verifier"`
	IsValid  bool   `json:"isValid"`
	WalletId string `json:"walletId"`
}

//Return type
type ReturnTypeWallet struct {
	Status   int    `json:"status"`
	WalletId string `json:"walletId"`
	IsValid  bool 	`json:"isValid"`
	Message  string `json:"message"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string) (string, error) {

	partEnc := strconv.FormatInt(time.Now().Unix(), 16)
	walletId := b64.StdEncoding.EncodeToString([]byte(userId + docType + partEnc))


	identity := Identity{
		UserId:   userId,
		DocType:  docType,
		Verifier: verifier,
		IsValid:  true,
		WalletId: walletId,
	}

	identityJSON, err := json.Marshal(identity)
	if err != nil {
		return "", err
	}
	ctxErr := ctx.GetStub().PutState(walletId, identityJSON)
	if ctxErr != nil {
		return "", ctxErr
	} else {
		return walletId, nil
	}
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadIdentity(ctx contractapi.TransactionContextInterface, walletId string) (string, error) {
	identityJSON, err := ctx.GetStub().GetState(walletId)
	if err != nil || identityJSON == nil {
		return "", nil
	}

	var identity Identity
	err = json.Unmarshal(identityJSON, &identity)
	
	if err != nil {
		return "false", nil
	} else {
		if identity.IsValid == true {
			return "true", nil
		} 
		
		return "false", nil
		
	}

}

// UpdateAsset updates an existing asset in the world state with provided parameters.
func (s *SmartContract) UpdateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, walletId string) (string, error) {

	partEnc := strconv.FormatInt(time.Now().Unix(), 16)
	newWalletId := b64.StdEncoding.EncodeToString([]byte(userId + docType + partEnc))

	// overwriting original asset with new asset
	identity := Identity{
		UserId:   userId,
		DocType:  docType,
		Verifier: verifier,
		IsValid:  true,
		WalletId: newWalletId,
	}

	oldIdentity := Identity{
		UserId:   userId,
		DocType:  docType,
		Verifier: verifier,
		IsValid:  false,
		WalletId: walletId,
	}

	identityJSON, err := json.Marshal(identity)
	oldIdentityJSON, err1 := json.Marshal(oldIdentity)
	if err != nil || err1 != nil {
		return "", err
	}
	
	//Update old identity--no more valid
	ctxErr1 := ctx.GetStub().PutState(walletId, oldIdentityJSON)
	if ctxErr1 != nil {
		return "", ctxErr1
	}

	//Update new identity
	ctxErr := ctx.GetStub().PutState(newWalletId, identityJSON)
	if ctxErr != nil {
		return "", ctxErr
	} else {
		return newWalletId, nil
	}
}

func (s *SmartContract) DeleteIdentity(ctx contractapi.TransactionContextInterface, walletId string) (string, error) {

	ctxErr := ctx.GetStub().DelState(walletId)
	if ctxErr != nil {
		//error deleting identity
		return "false", nil
	} else {
		//deleted from ledger
		return "true", nil
	}
}

func (s *SmartContract) WalletExists(ctx contractapi.TransactionContextInterface, walletId string) (bool, error) {
	identityJSON, err := ctx.GetStub().GetState(walletId)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}
	return identityJSON != nil, nil
}

func main() {
	// os.Setenv("CORE_CHAINCODE_LOGLEVEL", "debug")
	// os.Setenv("CORE_PEER_ADDRESS", "127.0.0.1:7052")
	// os.Setenv("CORE_CHAINCODE_ID_NAME", "mycc:0")
	identityChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating identity chaincode: %v", err)
	}

	if err := identityChaincode.Start(); err != nil {
		log.Panicf("Error starting identity chaincode: %v", err)
	}
}
