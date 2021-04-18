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
func (s *SmartContract) CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string) (string, error) {
	// exists, err := s.AssetExists(ctx, id)
	// if err != nil {
	// 	return err
	// }
	// if exists {
	// 	return fmt.Errorf("the asset %s already exists", id)
	// }

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
		return "nil", err
	}
	ctxErr := ctx.GetStub().PutState(walletId, identityJSON)
	if ctxErr != nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Error saving to ledger",
		}
		ret, _ := json.Marshal(retVal)

		return string(ret), nil
	} else {
		retVal := ReturnTypeWallet{
			Status:   200,
			WalletId: walletId,
			IsValid: true,
			Message:  "Saved to ledger",
		}
		ret, _ := json.Marshal(retVal)
		return string(ret), nil
	}
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadIdentity(ctx contractapi.TransactionContextInterface, walletId string) (string, error) {
	identityJSON, err := ctx.GetStub().GetState(walletId)
	if err != nil || identityJSON == nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Identity does not exist in the ledger",
		}
		ret, _ := json.Marshal(retVal)

		return string(ret), nil
	}

	var identity Identity
	err = json.Unmarshal(identityJSON, &identity)
	
	if err != nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Error marshal/unmarshal",
		}
		ret, _ := json.Marshal(retVal)

		return string(ret), nil
	} else {
		retVal := ReturnTypeWallet{
			Status:   200,
			WalletId: identity.WalletId,
			IsValid: identity.IsValid,
			Message:  "Successfully read from ledger",
		}
		ret, _ := json.Marshal(retVal)
		return string(ret), nil
	}

}

// UpdateAsset updates an existing asset in the world state with provided parameters.
func (s *SmartContract) UpdateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, walletId string) (string, error) {
	// exists, err := s.AssetExists(ctx, id)
	// if err != nil {
	// 	return err
	// }
	// if !exists {
	// 	return fmt.Errorf("the asset %s does not exist", id)
	// }

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
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Error marshal/unmarshal",
		}
		ret, _ := json.Marshal(retVal)

		return string(ret), nil
	}
	
	//Update old identity--no more valid
	ctxErr1 := ctx.GetStub().PutState(walletId, oldIdentityJSON)
	if ctxErr1 != nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Error updating old identity",
		}
		ret, _ := json.Marshal(retVal)

		return string(ret), nil
	}

	//Update new identity
	ctxErr := ctx.GetStub().PutState(newWalletId, identityJSON)
	if ctxErr != nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Error updating ledger",
		}
		ret, _ := json.Marshal(retVal)

		return string(ret), nil
	} else {
		retVal := ReturnTypeWallet{
			Status:   200,
			WalletId: newWalletId,
			IsValid: true,
			Message:  "Updated ledger",
		}
		ret, _ := json.Marshal(retVal)
		return string(ret), nil
	}
}

func (s *SmartContract) DeleteIdentity(ctx contractapi.TransactionContextInterface, walletId string) (string, error) {
	// exists, err := s.WalletExists(ctx, walletId)
	// if err != nil {
	// 	return err
	// }
	// if !exists {
	// 	return fmt.Errorf("the asset %s does not exist", walletId)
	// }

	// return ctx.GetStub().DelState(walletId)

	ctxErr := ctx.GetStub().DelState(walletId)
	if ctxErr != nil {
		retVal := ReturnTypeWallet{
			Status:   400,
			WalletId: "",
			IsValid: false,
			Message:  "Error deleting identity",
		}
		ret, _ := json.Marshal(retVal)
		return string(ret), nil
	} else {
		retVal := ReturnTypeWallet{
			Status:   200,
			WalletId: walletId,
			IsValid: false,
			Message:  "Deleted from ledger",
		}
		ret, _ := json.Marshal(retVal)
		return string(ret), nil
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
