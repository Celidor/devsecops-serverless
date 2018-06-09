#!groovy

pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-west-1'
    }

    stages {
        stage('Build'){
            steps {
              withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'aws-key',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
              ]]) {
                sh 'npm i'
                ]
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
                sh 'npm run integration'
            }
        }
        stage('Test (Deploy & Test)') {
            environment {
                AWS_STAGE = 'test'
            }
            steps {
                sh './node_modules/.bin/sls deploy -s test'
                sh 'npm run integration'
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
