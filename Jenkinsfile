pipeline {
    agent any

    stages {

        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Check Kubernetes') {
            steps {
                sh 'kubectl version --client'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t ai-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t ai-frontend ./frontend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }

    }
}