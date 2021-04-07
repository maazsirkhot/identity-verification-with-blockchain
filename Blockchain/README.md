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
    kubectl cp ./chaincode/resource_types $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files/chaincode
    kubectl cp Blockchain/fabric-samples/bin $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files

8.  Start the ca containers
    kubectl apply -f Blockchain/minikube/cas

9.  Can check the logs for pods like orderers:
    kubectl logs -f orderers-ca-d69cbc664-qbs6z

    Also, crypto-config files are generated. Check for crypto-config folder:
    root@example1-6858b4f776-wmlth:/host# cd files
    root@example1-6858b4f776-wmlth:/host/files# ls
    bin chaincode config.yaml configtx.yaml crypto-config scripts
    root@example1-6858b4f776-wmlth:/host/files# cd crypto-config/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config# ls
    ordererOrganizations peerOrganizations
    root@example1-6858b4f776-wmlth:/host/files/crypto-config# cd peerOrganizations/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations# ls
    ibm oracle
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations# cd ibm/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/ibm# ls
    msp peers users
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/ibm# cd msp/
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/ibm/msp# ls
    IssuerPublicKey IssuerRevocationPublicKey admincerts cacerts keystore signcerts tlscacerts user
    root@example1-6858b4f776-wmlth:/host/files/crypto-config/peerOrganizations/ibm/msp# cd tlscacerts/

10. Generate artifacts inside the containers.
    kubectl exec -it <container_name> bash  
    If OS is different from your parent OS, install binaries inside the container.
    (contents of bin folder should be inside hosts/files/bin/xxx)
    curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.1 1.4.7`

    cd /host/files
    rm -rf orderer channels
    mkdir -p orderer channels
    bin/configtxgen -profile OrdererGenesis -channelID syschannel -outputBlock ./orderer/genesis.block
    bin/configtxgen -profile MainChannel -outputCreateChannelTx ./channels/mainchannel.tx -channelID mainchannel
    bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channels/verify-anchors.tx -channelID mainchannel -asOrg verify

11. Start orderers
    kubectl apply -f Blockchain/minikube/orderers

    Check if a leader is assigned
    kubectl logs -f orderer0-deployment-74f684c656-qzn2x

12. Start peers
    kubectl apply -f Blockchain/minikube/orgs/verify/couchdb
    kubectl apply -f Blockchain/minikube/orgs/verify/
    kubectl apply -f Blockchain/minikube/orgs/verify/cli

    Check deployments/peers/services
    kubectl get peers
    kubectl get deployments
    kubectl get services

13.
