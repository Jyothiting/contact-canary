pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "jyothi235/contact-book"
  }

  stages {

    stage("Checkout") {
      steps {
        git 'https://github.com/Jyothiting/contact-canary.git'
      }
    }

    stage("Build Image") {
      steps {
        sh "docker build -t $DOCKER_IMAGE:canary ."
      }
    }

    stage("Docker Login") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                          usernameVariable: 'USER',
                          passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
        }
      }
    }

    stage("Push Image") {
      steps {
        sh "docker push $DOCKER_IMAGE:canary"
      }
    }

    stage("Deploy Canary") {
      steps {
        sh "kubectl apply -f k8s/canary-deployment.yaml"
        sh "kubectl apply -f k8s/service.yaml"
      }
    }
  }
}
