## docker

도커 데스크톱으로 쿠버네티스 실행
혹은 쿠버네티스 환경 구성

### bash

cd Desktop/k8bit-master/
kubectl proxy --www=.

- 127.0.0.1:8001/static

- "proxy": "http://localhost:8001"
- "/api/v1/pods"

요청 가능해짐

kubectl create deployment nginx --image=nginx

kubectl scale deployment/nginx --replicas=3
