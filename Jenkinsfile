#!groovy

pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-west-1'
    }

    stages {
        stage('Build'){
            steps {
                sh 'npm i'
            }
        }
        stage('Unit Test'){
            steps {
                sh 'npm run unit'
            }
        }
        stage('Dev (Deploy & Test)') {
            environment {
                AWS_STAGE = 'dev'
            }
            steps {
                sh './node_modules/.bin/sls deploy -s dev'
            }
        }
        stage('Test (Deploy & Test)') {
            environment {
                AWS_STAGE = 'test'
            }
            steps {
                sh './node_modules/.bin/sls deploy -s test'
            }
        }
        stage('Prod (Deploy)'){
            environment {
                AWS_STAGE = 'prod'
            }
            when {
                branch 'master'
            }
            steps {
                sh 'echo deploying to prod'
                sh './node_modules/.bin/sls deploy -s prod'
            }
        }
    }
}
