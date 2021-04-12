package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Asset describes basic details of what makes up a simple asset
// type Asset struct {
// 	ID      string `json:"ID"`
// 	IsValid bool   `json:"isValid"`
// }

type Identity struct {
	userId   string `json:"userId"`
	docType  string `json:"docType"`
	verifier string `json:"verifier"`
	isValid  bool   `json:"isValid"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	identities := []Identity{
		{
			userId:   "dummy",
			docType:  "dummydoc",
			verifier: "dummyverifier",
			isValid:  true,
		},
	}

	for _, identity := range identities {
		identityJSON, err := json.Marshal(identity)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(identity.userId, identityJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, isValid bool) error {
	// exists, err := s.AssetExists(ctx, id)
	// if err != nil {
	// 	return err
	// }
	// if exists {
	// 	return fmt.Errorf("the asset %s already exists", id)
	// }

	identity := Identity{
		userId:   userId,
		docType:  docType,
		verifier: verifier,
		isValid:  isValid,
	}
	identityJSON, err := json.Marshal(identity)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(userId, identityJSON)
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadIdentity(ctx contractapi.TransactionContextInterface, userId string) (*Identity, error) {
	identityJSON, err := ctx.GetStub().GetState(userId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if identityJSON == nil {
		return nil, fmt.Errorf("the identity %s does not exist", userId)
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

	// overwriting original asset with new asset
	identity := Identity{
		userId:   userId,
		docType:  docType,
		verifier: verifier,
		isValid:  isValid,
	}
	identityJSON, err := json.Marshal(identity)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(userId, identityJSON)
}

func main() {
	identityChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating identity-basic chaincode: %v", err)
	}

	if err := identityChaincode.Start(); err != nil {
		log.Panicf("Error starting idetity-basic chaincode: %v", err)
	}
}
