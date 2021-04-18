This folder contains all scripts necessary to start Blockchain network in docker/Minikube/kops production

Home: identity-xxx folder
All paths relative to main folder

## Set up binaries for your system

NOTE:
Please install binaries for teh first time on a system and replace them.
Do not use existing binaries as is in bin/ folder, they may not work on your system.

1. Go to Blockchain folder
2. Install fabric binaries and images (refer: https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html)
   Use versions as below:
   curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.1 1.4.7
3. Go to Blockchain/fabric-samples/bin.
4. Set path to this folder. VERY IMPORTANT.
5. Check if configtxgen --version works.
   krutikavk@ubuntu:~/identity-verification-with-blockchain/Blockchain$ configtxgen --version
   configtxgen:
   Version: 2.2.1
   Commit SHA: 344fda602
   Go version: go1.14.4
   OS/Arch: linux/amd64

6. Make sure gopath is correctly set up:
    gopath: /Users/krutikavk/git/identity-verification-with-blockchain/chaincode
    Initialize: 
    krutikavk@Krutikas-MacBook-Pro chaincode % cd resources
    krutikavk@Krutikas-MacBook-Pro resources % go mod init resourcescc

    Generate vendor dependencies
    krutikavk@Krutikas-MacBook-Pro resources % go mod tidy
    krutikavk@Krutikas-MacBook-Pro resources % go mod vendor
    krutikavk@Krutikas-MacBook-Pro resources % go build resourcescc.go 

## Set up minikube/kubectl/docker-compose/docker on your machine

## Network setup steps:

1.  Set permissions for scripts folder
    sudo chmod -R 777 scripts/

2.  Generate crypto-config folder with certs
    docker-compose -f Blockchain/docker/docker-compose-ca.yaml up
    (Add -d to the end to run as administrator if permission denied error without)

    crypto-config folder should now be created inside main folder. Don't need CA network anymore.
    docker-compose -f Blockchain/docker/docker-compose-ca.yaml down -d

    Make sure to set down the network if previously used.
    Check if crypto-config folder is created with below

3.  Change ownership of crypto-config
    sudo chmod -R 777 crypto-config
    sudo chown $USER:$USER -R crypto-config

4.  Start minikube
    minikube start

5.  Start pvc. This will also start pv.
    kubectl apply -f Blockchain/minikube/storage/pvc.yaml

    This will start pvc as well as pv
    kubectl get pvc
    kubectl get pv

6.  Apply tests to check if example1/example2 pods access the shared volume
    kubectl apply -f Blockchain/minikube/storage/tests

7.  Setup the files for the network
    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- mkdir -p /host/files/scripts
    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- mkdir -p /host/files/chaincode

    kubectl cp ./scripts $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
    kubectl cp ./Blockchain/minikube/configtx.yaml $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
    kubectl cp ./Blockchain/minikube/config.yaml $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
    kubectl cp ./chaincode/resources $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files/chaincode
    kubectl cp Blockchain/fabric-samples/bin $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files

8.  Start the ca containers
    kubectl apply -f Blockchain/minikube/cas

9.  Can check the logs for pods like orderers:
    kubectl logs -f orderers-ca-d69cbc664-qbs6zk

    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- bash
    Also, crypto-config files are gecnerated. Check for crypto-config folder:
    root@example1-6858b4f776-wmlth:/host# cd files
    root@example1-6858b4f776-wmlth:/host/files# ls
    bin chaincode config.yaml configtx.yaml crypto-config scripts
    root@example1-6858b4f776-wmlth:/host/files# cd crypto-config/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config# ls
    ordererOrganizations peerOrganizations
    root@example1-6858b4f776-wmlth:/host/files/crypto-config# cd peerOrganizations/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations# ls
    verify
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations# cd verify/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/verify# ls
    msp peers users
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/verify# cd msp/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/verify/msp# ls
    IssuerPublicKey IssuerRevocationPublicKey admincerts cacerts keystore signcerts tlscacerts user
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/verify/msp# cd tlscacerts/

10. Generate artifacts inside the containers.

    Before that, if OS is different from your parent OS, install binaries inside the container.
    (contents of bin folder should be inside hosts/files/bin/xxx) using thiss command
    curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.1 1.4.7

    Follow as below:

    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- bash

    root@example1-79dfd5bb95-z7wjp:/# apt-get update
    root@example1-79dfd5bb95-z7wjp:/# apt-get install curl -y
    root@example1-79dfd5bb95-z7wjp:/host/files# cd host/files
    root@example1-79dfd5bb95-z7wjp:/host/files# curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.1 1.4.7

    apt-get update
    apt-get install curl -y
    cd host/files
    curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.1 1.4.7
    ...
    =========================================================
    Docker not installed, bypassing download of Fabric images
    =========================================================
    ...

    root@example1-79dfd5bb95-z7wjp:/host/files# ls
    bin chaincode config config.yaml configtx.yaml crypto-config scripts
    root@example1-79dfd5bb95-z7wjp:/host/files/# cd bin

    bin folder is generated as above

    This will pull hyperledger binaries built on the system. If original OS is different, this needs to be done inside the container.
    Also inside the container:

    cd /host/files
    rm -rf orderer channels
    mkdir -p orderer channels
    bin/configtxgen -profile OrdererGenesis -channelID syschannel -outputBlock ./orderer/genesis.block
    bin/configtxgen -profile MainChannel -outputCreateChannelTx ./channels/mainchannel.tx -channelID mainchannel
    bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channels/verify-anchors.tx -channelID mainchannel -asOrg verify

11. Start orderers
    kubectl apply -f Blockchain/minikube/orderers

    kubectl get pods
    Pick an orderer deployment client from here

    Check if a leader is assigned
    kubectl logs -f orderer0-deployment-74f684c656-qzn2x

12. Start peers
    kubectl apply -f Blockchain/minikube/orgs/verify/couchdb
    kubectl apply -f Blockchain/minikube/orgs/verify/
    kubectl apply -f Blockchain/minikube/orgs/verify/cli

    Check deployments/pods/services
    kubectl get pods
    kubectl get deployments
    kubectl get services

13. Set up the network
    Create main channel
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer channel create -c mainchannel -f ./channels/mainchannel.tx -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    2021-04-16 22:31:30.920 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
    2021-04-16 22:31:30.962 UTC [cli.common] readBlock -> INFO 002 Expect block, but got status: &{NOT_FOUND}
    2021-04-16 22:31:30.968 UTC [channelCmd] InitCmdFactory -> INFO 003 Endorser and orderer connections initialized
    2021-04-16 22:31:31.171 UTC [cli.common] readBlock -> INFO 004 Expect block, but got status: &{SERVICE_UNAVAILABLE}
    2021-04-16 22:31:31.179 UTC [channelCmd] InitCmdFactory -> INFO 005 Endorser and orderer connections initialized
    2021-04-16 22:31:31.382 UTC [cli.common] readBlock -> INFO 006 Expect block, but got status: &{SERVICE_UNAVAILABLE}
    2021-04-16 22:31:31.388 UTC [channelCmd] InitCmdFactory -> INFO 007 Endorser and orderer connections initialized
    2021-04-16 22:31:31.590 UTC [cli.common] readBlock -> INFO 008 Expect block, but got status: &{SERVICE_UNAVAILABLE}
    2021-04-16 22:31:31.594 UTC [channelCmd] InitCmdFactory -> INFO 009 Endorser and orderer connections initialized
    2021-04-16 22:31:31.797 UTC [cli.common] readBlock -> INFO 00a Expect block, but got status: &{SERVICE_UNAVAILABLE}
    2021-04-16 22:31:31.803 UTC [channelCmd] InitCmdFactory -> INFO 00b Endorser and orderer connections initialized
    2021-04-16 22:31:32.005 UTC [cli.common] readBlock -> INFO 00c Expect block, but got status: &{SERVICE_UNAVAILABLE}
    2021-04-16 22:31:32.010 UTC [channelCmd] InitCmdFactory -> INFO 00d Endorser and orderer connections initialized
    2021-04-16 22:31:32.216 UTC [cli.common] readBlock -> INFO 00e Received block: 0

    Move block file to channels folder where it can be shared
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'cp mainchannel.block ./channels/'

    Connect peers to the channel
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer channel join -b channels/mainchannel.block'

    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer1-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer channel join -b channels/mainchannel.block'

    Update anchors for both peers
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer channel update -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem -c mainchannel -f channels/verify-anchors.tx'

14. Chaincode steps

    NOTE: 
    Make sure gopath is correctly set up and vendor dependencies are set up beforehand as below. If not, follow these steps and restart network setup from minikube start. GOPATH should point to chaincode folder
    GOPATH: /Users/krutikavk/git/identity-verification-with-blockchain/chaincode
    Initialize: 
    krutikavk@Krutikas-MacBook-Pro chaincode % cd resources
    krutikavk@Krutikas-MacBook-Pro resources % go mod init resourcescc
    Generate vendor dependencies
    krutikavk@Krutikas-MacBook-Pro resources % go mod tidy
    krutikavk@Krutikas-MacBook-Pro resources % go mod vendor
    krutikavk@Krutikas-MacBook-Pro resources % go build resourcescc.go 

    Package chaincode
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode package resources.tar.gz --path /opt/gopath/src/resources --lang golang --label resources_1'
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer1-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode package resources.tar.gz --path /opt/gopath/src/resources --lang golang --label resources_1'

    Install chaincode (takes a bit)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode install resources.tar.gz &> pkg.txt'
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer1-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode install resources.tar.gz'

    (kubectl logs -f $(kubectl get pods -o=name | grep peer0-verify-deployment | sed "s/^.\{4\}//") to check chaincode installation logs)

    Approval for chaincode
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode approveformyorg -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem --channelID mainchannel --collections-config /opt/gopath/src/resources/collections-config.json --name resources --version 1.0 --sequence 1 --package-id $(tail -n 1 pkg.txt | awk '\''NF>1{print $NF}'\'')'

    Commit chaincode
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode commit -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem --channelID mainchannel --collections-config /opt/gopath/src/resources/collections-config.json --name resources --version 1.0 --sequence 1'

    NOTE:
    Error on peer0-verify-deployment: streaming call completed grpc.service=protos.Deliver grpc.method=DeliverFiltered grpc.request_deadline=2021-04-17T05:51:48.753Z grpc.peer_address=172.17.0.1:39553 error="context finished before block retrieved: context canceled" grpc.code=Unknown grpc.call_duration=2.1417194s

    Refer: https://stackoverflow.com/questions/55733319/how-to-fix-context-finished-before-block-retrieved-context-canceled-occurred

    (This is not an error. You are using an SDK that connects to the peer and waits for the instantiate to finish. The block is received by the peer, and when it does - the SDK closes the gRPC stream because it doesn't need it anymore, and the peer logs this to notify you why it closed the stream from the server side.)

15. Test chaincode
    // CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["CreateIdentity","regy3fh334","Passport","Passport Authority"]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //ReadIdentity(ctx contractapi.TransactionContextInterface, walletId string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode query -C mainchannel -n resources -c '\''{"Args":["ReadIdentity","cmVneTNmaDMzNFBhc3Nwb3J0NjA3YmUyNmE="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //UpdateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, walletId string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["UpdateIdentity","regy3fh334","DL","DL Authority","cmVneTNmaDMzNFBhc3Nwb3J0NjA3YmUyNmE="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //Delete wallet/identity for the user
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["DeleteIdentity","Mzd5YWZkc3lnZTIzREw2MDdiODc5Yw=="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'
