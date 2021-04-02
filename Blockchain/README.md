ALl paths relative to main folder

1. Start minikube
   minikube start

2. Start pvc. This will also start pv.
   kubectl apply -f Blockchain/minikube/storage/pvc.yaml

   This will start pvc as well as pv
   kubectl get pvc
   kubectl get pv

3. Apply tests to check if example1/example2 pods access the shared volume
   kubectl apply -f Blockchain/minikube/storage/tests
