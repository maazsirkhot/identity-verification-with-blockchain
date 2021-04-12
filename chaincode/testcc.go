package main

import (
  "fmt"
  "log"
  "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
   type SmartContract struct {
   contractapi.Contract
   }

   // Asset describes basic details of what makes up a simple asset
   type Asset struct {
    ID             string `json:"ID"`
	IsValid	       bool `json:"isValid"`
   }

   // InitLedger adds a base set of assets to the ledger
   func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
		assets := []Asset{
		{ID: "Dummy", IsValid: "true"},
		}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
		return err
		}

		err = ctx.GetStub().PutState(asset.ID, assetJSON)
		if err != nil {
		return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
	}

	// CreateAsset issues a new asset to the world state with given details.
	func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, id string, isValid bool) error {
		exists, err := s.AssetExists(ctx, id)
		if err != nil {
		  return err
		}
		if exists {
		  return fmt.Errorf("the asset %s already exists", id)
		}
	
		asset := Asset{
		  ID:             id,
		  IsValid:        isValid,
		}
		assetJSON, err := json.Marshal(asset)
		if err != nil {
		  return err
		}
		return ctx.GetStub().PutState(id, assetJSON)
	}

	// ReadAsset returns the asset stored in the world state with given id.
	func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id string) (*Asset, error) {
		assetJSON, err := ctx.GetStub().GetState(id)
		if err != nil {
		  return nil, fmt.Errorf("failed to read from world state: %v", err)
		}
		if assetJSON == nil {
		  return nil, fmt.Errorf("the asset %s does not exist", id)
		}
	
		var asset Asset
		err = json.Unmarshal(assetJSON, &asset)
		if err != nil {
		  return nil, err
		}
		return &asset, nil
	}

	// UpdateAsset updates an existing asset in the world state with provided parameters.
	func (s *SmartContract) UpdateAsset(ctx contractapi.TransactionContextInterface, id string, isValid bool) error {
		exists, err := s.AssetExists(ctx, id)
		if err != nil {
		  return err
		}
		if !exists {
		  return fmt.Errorf("the asset %s does not exist", id)
		}
  
		// overwriting original asset with new asset
		asset := Asset{
		  ID:             id,
		  IsValid:        isValid,
		}
		assetJSON, err := json.Marshal(asset)
		if err != nil {
		  return err
		}
		return ctx.GetStub().PutState(id, assetJSON)
	}