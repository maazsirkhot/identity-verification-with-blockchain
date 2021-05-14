## Fabric-Backend service
This folder contains the steps to set up a backend service interfacing with hyperledger fabric on local Kubernetes network.

### Requirements
1. docker
2. docker-compose
3. minikube
4. A working hyperledger network on minikube
Follow Blockchain/README.md for details on setting up Fabric network

### Setting up Backend service on minikube
All paths relative to Blockchain-backend folder
1. Create Dockerfile for Blockchain-backend and build it
    docker login
    docker build -t krutikavk/fabric-be:v1 .

    For uploading the file on dockerhub, 
    docker push krutikavk/fabric-be:v1

    NOTE: 
    krutikavk/fabric-be:latest: <user-id>/<image-name>:<image-tag>

2. Create a yaml file for a deployment on Kubernetes: fabric-be-deployment.
    Use the docker image built in the file

3. Start deployment. (Assuming minikube is already running with fabric cluster)
    kubectl apply -f fabric-be-deployment.yaml 

4. Create a service yaml (fabric-service.yaml) to load balance and expose the backend outside kube. Start the service
    kubectl apply -f fabric-be-service.yaml

5. Expose the service.
    --Don't use this now--
    minikube service fabric-be-service

    Follow the IP address to use APIs from backend.




6. Change port for new deployment
    curl http://api-service:4000/resources/gud23734fhiuegc2x
    {"status":200,"walletId":"Mzd5YWZkc3lnZTIzUGFzc3BvcnQ2MDdiODc0ZA==","isValid":false,"message":"Successfully read from ledger"}%

    curl -X POST http://api-service:4000/resources -d '{"userId": "gud23734fhiuegc2x","docType": "Passport","verifier": "Passport Authority"}]}'

   







