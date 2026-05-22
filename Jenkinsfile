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
                sh 'docker build -t ai-career-backend:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t ai-career-frontend:latest ./frontend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    set -e
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/backend-service.yaml
                    kubectl apply -f k8s/frontend-nginx-configmap.yaml
                    kubectl apply -f k8s/frontend-deployment.yaml
                    kubectl apply -f k8s/frontend-service.yaml
                '''
                sh 'kubectl rollout status deployment/backend-deployment --timeout=180s'
                sh 'kubectl rollout status deployment/frontend-deployment --timeout=180s'
            }
        }

    }
}
