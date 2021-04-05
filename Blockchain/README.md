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

6.
