package main

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"log"
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

// Structure of data in the ledger
type ReturnTypeWallet struct {
	Status   int    `json:"code"`
	WalletId string `json:"walletId"`
	Message  string `json:"message"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	// identities := []Identity{
	// 	{
	// 		UserId:   "dummy",
	// 		DocType:  "dummydoc",
	// 		Verifier: "dummyverifier",
	// 		IsValid:  true,
	// 	},
	// }

	// for _, identity := range identities {
	// 	identityJSON, err := json.Marshal(identity)
	// 	if err != nil {
	// 		return err
	// 	}

	// 	err = ctx.GetStub().PutState(identity.UserId, identityJSON)
	// 	if err != nil {
	// 		return fmt.Errorf("failed to put to world state. %v", err)
	// 	}
	// }

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, isValid bool) ([]byte, error) {
	// exists, err := s.AssetExists(ctx, id)
	// if err != nil {
	// 	return err
	// }
	// if exists {
	// 	return fmt.Errorf("the asset %s already exists", id)
	// }

	walletId := b64.StdEncoding.EncodeToString([]byte(userId + docType + time.Now().String()))

	identity := Identity{
		UserId:   userId,
		DocType:  docType,
		Verifier: verifier,
		IsValid:  isValid,
		WalletId: walletId,
	}

	identityJSON, err := json.Marshal(identity)
	if err != nil {
		return nil, err
	}
	ctxErr := ctx.GetStub().PutState(walletId, identityJSON)
	if ctxErr != nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			Message:  "Error saving to ledger",
		}
		ret, _ := json.Marshal(retVal)

		return ret, nil
	} else {
		retVal := ReturnTypeWallet{
			Status:   200,
			WalletId: walletId,
			Message:  "Saved to ledger",
		}
		ret, _ := json.Marshal(retVal)
		return ret, nil
	}
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadIdentity(ctx contractapi.TransactionContextInterface, walletId string) (*Identity, error) {
	identityJSON, err := ctx.GetStub().GetState(walletId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if identityJSON == nil {
		return nil, fmt.Errorf("the identity %s does not exist", walletId)
	}

	var identity Identity
	err = json.Unmarshal(identityJSON, &identity)
	if err != nil {
		return nil, err
	}
	return &identity, nil
}

// UpdateAsset updates an existing asset in the world state with provided parameters.
func (s *SmartContract) UpdateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, isValid bool) error {
	// exists, err := s.AssetExists(ctx, id)
	// if err != nil {
	// 	return err
	// }
	// if !exists {
	// 	return fmt.Errorf("the asset %s does not exist", id)
	// }

	newWalletId := b64.StdEncoding.EncodeToString([]byte(userId + docType + time.Now().String()))

	// overwriting original asset with new asset
	identity := Identity{
		UserId:   userId,
		DocType:  docType,
		Verifier: verifier,
		IsValid:  isValid,
		WalletId: newWalletId,
	}

	identityJSON, err := json.Marshal(identity)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(newWalletId, identityJSON)
}

func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, walletId string) error {
	exists, err := s.WalletExists(ctx, walletId)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", walletId)
	}

	return ctx.GetStub().DelState(walletId)
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
