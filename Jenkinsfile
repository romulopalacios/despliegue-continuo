pipeline {
    agent any

    tools {
        nodejs "Node24"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Pruebas') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build (placeholder)') {
            steps {
                echo 'No hay build en este ejemplo, solo pruebas'
            }
        }

        stage('Despliegue') {
            when {
                branch 'main'
            }
            steps {
                echo 'Aquí iría tu despliegue real (Docker, SSH, etc.)'
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminado.'
        }
    }
}
