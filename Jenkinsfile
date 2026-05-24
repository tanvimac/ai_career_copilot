pipeline {
    agent any

    environment {
        KUBECONFIG = "/var/jenkins_home/.kube/config"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tanvimac/ai_career_copilot.git'
            }
        }

        stage('Install kubectl') {
            steps {
                sh '''
                if ! command -v kubectl; then
                    curl -LO "https://dl.k8s.io/release/v1.36.1/bin/linux/amd64/kubectl"
                    chmod +x kubectl
                    mv kubectl /usr/local/bin/
                fi
                kubectl version --client
                '''
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
                sh '''
                kubectl get nodes
                kubectl apply -f k8s/backend-deployment.yaml
                kubectl apply -f k8s/backend-service.yaml
                kubectl apply -f k8s/frontend-deployment.yaml
                kubectl apply -f k8s/frontend-service.yaml
                '''
            }
        }

        stage('Restart Kubernetes Pods') {
            steps {
                sh '''
                kubectl rollout restart deployment backend-deployment
                kubectl rollout restart deployment frontend-deployment
                '''
            }
        }
    }
}