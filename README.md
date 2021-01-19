# E-Commerce Website

## Description

#### E-Commerce Website Build Using Nodejs,React,Docker and Kubernetes.Created locally using **Minikube** which runs on Virtual box on your system that run only 1 **Node K8s Cluster**. App lets users **Create/Buy/Sell** Tickets.

### Services

- auth

- client

- tickets

- orders

- payments

- expiration

- ingress

- Nats-Streaming-server

## System Design Diagram

![Screenshot_1](https://github.com/Flux99/E-commerce/blob/master/System%20Design%20Microservice.jpeg?raw=true)


## Sequence Diagram

![Screenshot_1](https://github.com/Flux99/E-commerce/blob/master/e-COMMERCE.jpg?raw=true)

## Prerequisite

1. Docker for Mac/Windows [Docker desktop](https://docs.docker.com/desktop/)

2. Docker engine for linux [Docker Engine](https://docs.docker.com/engine/install/)

3. For Mac/Windows [Enable](https://birthday.play-with-docker.com/kubernetes-docker-desktop/) Kubernetes in your Docker desktop.

4. For Linux you have to [install](https://matthewpalmer.net/kubernetes-app-developer/articles/install-kubernetes-ubuntu-tutorial.html) Minikube and Kubernetes.

5. Enable Ingress Nginx for [Windows](https://dev.to/katzekat/ingress-in-kubernetes-with-docker-for-windows-33o2) and [Mac](https://kubernetes.github.io/ingress-nginx/deploy/)

6. Install [Skaffold](https://skaffold.dev/docs/install/)

## How to run

1. Now either fork or download the app and open the folder in the cli

2. For Mac/Windows Start Docker desktop

3. For Linux open terminal and start Minikube by running `minikube start` command.

4. First you have to expose your pod through nodeport.

5. For Mac/Linux run `code /etc/hosts` command.

6. For Windows run `code C:\Windows\System32\Drivers\etc\hosts` command.

7. For minikube run `minikube ip`.

8. For Windows/Mac ip will be 127.0.0.1

9. In that file(Steps 5 & 6) paste your ip and space ticket.dev Like this `127.0.0.1 ticket.dev`, Your_ip space ticket.dev

10. Go to Project Folder.

11. Run the command `skaffold dev`.

## User Stories

- User SignIn/Login creates a ticket to sell

- As soon as a user creates a ticket

- ticket created event is publish

- Order service store that ticket for future ticket ordering

## Dependencies & Tools

- Minikube

- Kubernetes

- Ingress Nginx

- Docker

- Redis

- skaffold

- Typescript

- express

- mongoose

- jsonwebtoken

- node-nats-streaming

- jest

##Screenshot
![Screenshot_1](https://github.com/Flux99/E-commerce/blob/master/Screenshot_1.png)
![Screenshot_2](https://github.com/Flux99/E-commerce/blob/master/Screenshot_2.png)
![Screenshot_3](https://github.com/Flux99/E-commerce/blob/master/Screenshot_3.png)
![Screenshot_4](https://github.com/Flux99/E-commerce/blob/master/Screenshot_4.png)
