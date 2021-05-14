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

1.  Start minikube
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

    CREATE IDENTITY
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["CreateIdentity","hdw3278ycbjceuh","Passport","Passport Authority"]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //READ IDENTITY (ctx contractapi.TransactionContextInterface, walletId string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode query -C mainchannel -n resources -c '\''{"Args":["ReadIdentity","aGR3MzI3OHljYmpjZXVoUGFzc3BvcnQ2MDkzNTc4NQ=="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    cmVneTNmaDMzNERMNjA3Y2M1NmQ=

    //UPDATE IDENTITY UpdateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, walletId string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["UpdateIdentity","hdw3278ycbjceuh","DL","DL Authority","aGR3MzI3OHljYmpjZXVoREw2MDdlNGE3Yg=="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //DELETE WALLET/IDENTITY
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["DeleteIdentity","aGR3MzI3OHljYmpjZXVoUGFzc3BvcnQ2MDkzNTc0Yg=="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

16. Deploy backend

    kubectl apply -f fabric-be-deployment.yaml
    kubectl apply -f fabric-be-service.yaml
    minikube service fabric-be-service


-----------------------PRODUCTION ENVIRONMENT------------------------------

1. Install kops and aws cli
    Create IAM user
2. aws configure 
    k8s-hyperledger-fabric-2.2 [master] ⚡  aws configure
    AWS Access Key ID [****************IGXO]: xxxxxxx
    AWS Secret Access Key [****************PL4g]: xxxxxxx
    Default region name [us-west-2]: 
    Default output format [json]: 

3. Test AWS cli
    aws sts get-caller-identity
    aws ec2 describe-availability-zones --region us-west-1

4. S3 bucket: idverfbucket

    export KOPS_CLUSTER_NAME=hyperledger.k8s.local
    export KOPS_STATE_STORE=s3://idverfbucket
    export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
    export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
    source ~/.zshrc

5. Generate ssh
    ssh-keygen (no passphrase)

    Your identification has been saved in /Users/krutikavk/.ssh/id_rsa.
    Your public key has been saved in /Users/krutikavk/.ssh/id_rsa.pub.
    The key fingerprint is:
    SHA256:8RdOUbyIBXMu/4vrtCWgy4ROLVm0vj4bLI0pLV3qyro krutikavk@Krutikas-MacBook-Pro.local
    The key's randomart image is:
    +---[RSA 3072]----+
    |          o.oo.  |
    |           +...  |
    |        o .o+. . |
    |       . +.=...  |
    |        S o +    |
    |     o & . o .   |
    |    o % O   o o  |
    |   . * =.+ . = . |
    |  Eoo.o.*o .=..  |
    +----[SHA256]-----+

6. Create cluster
    kops create cluster \
        --zones us-west-2b,us-west-2c \
        --node-count 3 \
        --master-zones us-west-2b,us-west-2c \
        --master-count 3 \
        --authorization AlwaysAllow --yes \
        --master-volume-size 40 \
        --node-volume-size 20

    Name of cluster will be default: hyperledger.k8s.local
    
    Check if cluster is built 
    kops validate cluster
    if deleted: kops update cluster --yes

    INSTANCE GROUPS
    NAME                    ROLE    MACHINETYPE     MIN     MAX     SUBNETS
    master-us-west-2b-1     Master  t3.medium       1       1       us-west-2b
    master-us-west-2b-2     Master  t3.medium       1       1       us-west-2b
    master-us-west-2c-1     Master  t3.medium       1       1       us-west-2c
    nodes-us-west-2b        Node    t3.medium       2       2       us-west-2b
    nodes-us-west-2c        Node    t3.medium       1       1       us-west-2c

    NODE STATUS
    NAME                                            ROLE    READY
    ip-172-20-33-173.us-west-2.compute.internal     master  True
    ip-172-20-43-50.us-west-2.compute.internal      master  True
    ip-172-20-49-63.us-west-2.compute.internal      node    True
    ip-172-20-54-170.us-west-2.compute.internal     node    True
    ip-172-20-68-28.us-west-2.compute.internal      node    True
    ip-172-20-78-29.us-west-2.compute.internal      master  True

    Also, check if instances are up on ec2 on mgmt console
    6 instances-3 nodes, 3 masters will be created

    kubectl context should be set to kops cluster
    krutikavk@Krutikas-MacBook-Pro identity-verification-with-blockchain % kubectl config current-context  
    hyperledger.k8s.local

    Delete cluster if anything is incorrect
    kops delete cluster hyperledger.k8s.local
    kops delete cluster --name hyperledger.k8s.local --yes

7. After the cluster is created, need to add some secrets to the network

    kubectl create secret generic couchdb --from-literal username=krutika --from-literal password=1234

    kubectl create secret docker-registry regcred \
        --docker-server=https://index.docker.io/v1/ \
        --docker-username=krutikavk \
        --docker-password=xxxxxxx \
        --docker-email=krutikavk@gmail.com

8. Adding nginx to our network
    Add load balancer's DNS name to ingress-nginx.yaml

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/kops/master/addons/ingress-nginx/v1.6.0.yaml

    A load balancer will be created with this command
    Add this load balancer to 

    kubectl create secret tls udemy-hyperledger.com --key ~/udemy-hyperledger.com/privkey.pem --cert ~/udemy-hyperledger.com/cert.pem
    kubectl apply -f Blockchain/production/ingress-nginx.yaml

    kubectl delete -f Blockchain/production/ingress-nginx.yaml

9. Now, lets add the NFS file system. Go ahead and login to your AWS account and go to EFS. Create a NFS file system in the same REGION as the cluster and make sure to SET THE VPC the same as the network. VERY IMPORTANT!!!! Also, create mount points and set them to include ALL of the permissions for the network (should be for of them). Now, we can create the storage by using the PV and PVC yaml files. We're going to use multiple PVC's just to show how to do that.

    NOTE: update dns name of efs in pv.yaml
    file-system-id.efs.aws-region.amazonaws.com
    Ref: https://docs.aws.amazon.com/efs/latest/ug/mounting-fs-mount-cmd-dns-name.html

    kubectl apply -f Blockchain/production/storage/pv.yaml 
    kubectl apply -f Blockchain/production/storage/pvc.yaml
    kubectl apply -f Blockchain/minikube/storage/tests 


    Testing pv/pvc: created a file on 1, available on 2

10. Copy files

    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- mkdir -p /host/files/scripts
    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- mkdir -p /host/files/chaincode

    kubectl cp ./scripts $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
    kubectl cp ./Blockchain/production/configtx.yaml $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
    kubectl cp ./Blockchain/production/config.yaml $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
    kubectl cp ./chaincode/resources $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files/chaincode
    
    //not needed as system different from mac
    kubectl cp Blockchain/fabric-samples/bin $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files

    (same as minikube)

11. Let's bash into the container and make sure everything copied over properly

    kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- bash


12. Finally ready to start the ca containers

    kubectl apply -f Blockchain/minikube/cas

13. Time to generate the artifacts inside one of the containers and in the files folder

    apt-get update
    apt-get install curl -y
    cd /host/files
    curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.1 1.4.7

    
    rm -rf orderer channels
    mkdir -p orderer channels
    bin/configtxgen -profile OrdererGenesis -channelID syschannel -outputBlock ./orderer/genesis.block
    bin/configtxgen -profile MainChannel -outputCreateChannelTx ./channels/mainchannel.tx -channelID mainchannel
    bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channels/verify-anchors.tx -channelID mainchannel -asOrg verify


14. Let's try to start up the orderers
    kubectl apply -f Blockchain/minikube/orderers

15. We should be able to start the peers now

    kubectl apply -f Blockchain/minikube/orgs/verify/couchdb 
    kubectl apply -f Blockchain/minikube/orgs/verify/
    kubectl apply -f Blockchain/minikube/orgs/verify/cli

16. Set up the network
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


17. Chaincode steps

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
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode package resources.tar.gz --path /opt/gopath/src/resources --lang golang --label resources_2'
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer1-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode package resources.tar.gz --path /opt/gopath/src/resources --lang golang --label resources_2'

    Install chaincode (takes a bit)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode install resources.tar.gz &> pkg.txt'
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer1-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode install resources.tar.gz'

    (kubectl logs -f $(kubectl get pods -o=name | grep peer0-verify-deployment | sed "s/^.\{4\}//") to check chaincode installation logs)

    Approval for chaincode
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode approveformyorg -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem --channelID mainchannel --collections-config /opt/gopath/src/resources/collections-config.json --name resources --version 1.1 --sequence 3 --package-id $(tail -n 1 pkg.txt | awk '\''NF>1{print $NF}'\'')'

    Commit chaincode
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer lifecycle chaincode commit -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem --channelID mainchannel --collections-config /opt/gopath/src/resources/collections-config.json --name resources --version 1.1 --sequence 3'

    NOTE:
    Error on peer0-verify-deployment: streaming call completed grpc.service=protos.Deliver grpc.method=DeliverFiltered grpc.request_deadline=2021-04-17T05:51:48.753Z grpc.peer_address=172.17.0.1:39553 error="context finished before block retrieved: context canceled" grpc.code=Unknown grpc.call_duration=2.1417194s

    Refer: https://stackoverflow.com/questions/55733319/how-to-fix-context-finished-before-block-retrieved-context-canceled-occurred

    (This is not an error. You are using an SDK that connects to the peer and waits for the instantiate to finish. The block is received by the peer, and when it does - the SDK closes the gRPC stream because it doesn't need it anymore, and the peer logs this to notify you why it closed the stream from the server side.)


15. Test chaincode
    // CreateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string)

    CREATE IDENTITY
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["CreateIdentity","hdw3278ycbjceuh","Passport","Passport Authority"]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //READ IDENTITY (ctx contractapi.TransactionContextInterface, walletId string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode query -C mainchannel -n resources -c '\''{"Args":["ReadIdentity","Z3VkMjM3MzRmaGl1ZWdjMnhQYXNzcG9ydDYwOTVlYTQ1"]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    cmVneTNmaDMzNERMNjA3Y2M1NmQ=

    //UPDATE IDENTITY UpdateIdentity(ctx contractapi.TransactionContextInterface, userId string, docType string, verifier string, walletId string)
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["UpdateIdentity","hdw3278ycbjceuh","DL","DL Authority","aGR3MzI3OHljYmpjZXVoUGFzc3BvcnQ2MDk1ZTYxNQ=="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

    //DELETE WALLET/IDENTITY
    kubectl exec -it $(kubectl get pods -o=name | grep cli-peer0-verify-deployment | sed "s/^.\{4\}//") -- bash -c 'peer chaincode invoke -C mainchannel -n resources -c '\''{"Args":["DeleteIdentity","aGR3MzI3OHljYmpjZXVoUGFzc3BvcnQ2MDk1ZTYxNQ=="]}'\'' -o orderer0-service:7050 --tls --cafile=/etc/hyperledger/orderers/msp/tlscacerts/orderers-ca-service-7054.pem'

16. Deploy backend
    docker build -t krutikavk/fabric:v6 .
    docker push krutikavk/fabric:v6
    cd ..
    kubectl apply -f Blockchain/production/backend

    kubectl delete -f Blockchain/production/backend


17. Try to curl inside verify-ca-client-677d58f984-rk99v to check if Blockchain-backend api works
    root@example1-79dfd5bb95-z7wjp:/# apt-get update
    root@example1-79dfd5bb95-z7wjp:/# apt-get install curl -y
    
    kubectl exec -it verify-ca-client-677d58f984-jfkhl -- bash
    READ
    curl http://api-service:4000/resources/Z3VkMjM3MzRmaGl1ZWdjMnhQYXNzcG9ydDYwOTVmOWI2
    curl a9d8f9d2f7570421fa2e6c6768e56afa-1233238198.us-west-2.elb.amazonaws.com/resources/gud23734fhiuegc2x

    {"status":200,"walletId":"Z3VkMjM3MzRmaGl1ZWdjMnhQYXNzcG9ydDYwOTVmOTdk==","isValid":false,"message":"Successfully read from ledger"}root@verify-ca-client-677d58f984-rk99v:/# curl -X POST http://api-service:4000/resources -d '{"userId": "gud23734f2x","docType": "Passport","verifier": "Passport Authority"}]}'

    CREATE
    curl -i -X POST -H "Content-Type: application/json" -d '{"userId": "gud23734fhiuegc2x","docType": "Passport","verifier": "Passport Authority"}' http://api-service:4000/resources
    curl -i -X POST -H "Content-Type: application/json" -d '{"userId": "gud23734fhiuegc2x","docType": "Passport","verifier": "Passport Authority"}' a9d8f9d2f7570421fa2e6c6768e56afa-1233238198.us-west-2.elb.amazonaws.com/resources

    UPDATE
    curl -i -X POST -H "Content-Type: application/json" -d '{"userId": "gud23734fhiuegc2x","docType": "Passport","verifier": "Passport Authority1"}' http://api-service:4000/resources/update/Z3VkMjM3MzRmaGl1ZWdjMnhQYXNzcG9ydDYwOTVmOTdk

    DELETE
    curl -i -X POST -H "Content-Type: application/json" -d '{"userId": "gud23734fhiuegc2x"}' http://api-service:4000/resources/delete/Z3VkMjM3MzRmaGl1ZWdjMnhQYXNzcG9ydDYwOTVmOWI2


    

