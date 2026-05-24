pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/tanvimac/ai_career_copilot.git'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t tanvishar/ai-career-frontend:latest ./frontend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t tanvishar/ai-career-backend:latest ./backend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/backend-service.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-service.yaml'
            }
        }

        stage('Restart Kubernetes Pods') {
            steps {
                sh 'kubectl rollout restart deployment backend-deployment'
                sh 'kubectl rollout restart deployment frontend-deployment'
            }
        }

    }
}