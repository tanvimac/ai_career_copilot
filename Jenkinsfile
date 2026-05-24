pipeline {
    agent any

    stages {

        stage('Build Frontend Docker Image') {
            steps {
                echo 'Building Frontend Image...'
                sh 'docker build -t tanvishar/ai-career-frontend ./frontend'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo 'Building Backend Image...'
                sh 'docker build -t tanvishar/ai-career-backend ./backend'
            }
        }

        stage('Show Docker Images') {
            steps {
                sh 'docker images'
            }
        }

    }
}