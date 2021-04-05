ALl paths relative to main folder

1. Generate crypto-config folder with certs
   docker-compose -f Blockchain/docker/docker-compose-ca.yaml up -d
   (Add -d to the end to run as administrator if permission denied error without)

   crypto-config folder should now be created inside main folder. Don't need CA network anymore.
   docker-compose -f Blockchain/docker/docker-compose-ca.yaml down -d

2. Change ownership of crypto-config
   sudo chmod 777 -R crypto-config
   sudo chown $USER:$USER -R crypto-config

3. Start minikube
   minikube start

4. Start pvc. This will also start pv.
   kubectl apply -f Blockchain/minikube/storage/pvc.yaml

   This will start pvc as well as pv
   kubectl get pvc
   kubectl get pv

5. Apply tests to check if example1/example2 pods access the shared volume
   kubectl apply -f Blockchain/minikube/storage/tests

6. Setup the files for the network

kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- mkdir -p /host/files/scripts
kubectl exec -it $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//") -- mkdir -p /host/files/chaincode

kubectl cp ./scripts $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
kubectl cp ./Blockchain/minikube/configtx.yaml $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
kubectl cp ./Blockchain/minikube/config.yaml $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
kubectl cp ./chaincode/resources $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files/chaincode
kubectl cp ./chaincode/resource_types $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files/chaincode
kubectl cp ./fabric-samples/bin $(kubectl get pods -o=name | grep example1 | sed "s/^.\{4\}//"):/host/files
