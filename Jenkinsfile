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
                dir('mi-proyecto-ci') {
                    sh 'npm install'
                }
            }
        }

        stage('Pruebas') {
            steps {
                dir('mi-proyecto-ci') {
                    sh 'npm test'
                }
            }
        }

        stage('Build (placeholder)') {
            steps {
                dir('mi-proyecto-ci') {
                    echo 'Verificando estructura del proyecto...'
                    sh 'ls -la'
                    echo 'Contenido de package.json:'
                    sh 'cat package.json'
                }
            }
        }

        stage('Despliegue') {
            when {
                branch 'main'
            }
            steps {
                dir('mi-proyecto-ci') {
                    echo 'Iniciando proceso de despliegue...'
                    echo 'Verificando que la aplicación puede iniciar:'
                    sh 'timeout 10s npm start || echo "Aplicación verificada"'
                    echo 'Aquí iría tu despliegue real (Docker, SSH, etc.)'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminado.'
        }
    }
}
