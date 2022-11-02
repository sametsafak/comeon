@NonCPS
def getChangeString() {
  MAX_MSG_LEN = 100
  def changeString = ""
  echo "Gathering SCM changes"
  def changeLogSets = currentBuild.rawBuild.changeSets
  for (int i = 0; i < changeLogSets.size(); i++) {
    def entries = changeLogSets[i].items
    for (int j = 0; j < entries.length; j++) {
      def entry = entries[j]
      truncated_msg = entry.msg.take(MAX_MSG_LEN)
      changeString += " - `[${entry.author}]` ${truncated_msg} \n"
    }
  }
  if (!changeString) {
    changeString = " - No new changes"
  }
  return changeString
}


def sendBuildStatusOverSlack() {
  def colorCode = '#848484' // Gray

  switch (currentBuild.result) {
    case 'SUCCESS':
      colorCode = '#00FF00' // Green
      break
    case 'UNSTABLE':
      colorCode = '#FFFF00' // Yellow
      break
    case 'FAILURE':
      colorCode = '#FF0000' // Red
      break;
  }
  String message = """
        *Jenkins* job: `${env.JOB_NAME}` `${params.DEPLOYMENT_CHOICE}` has status `${currentBuild.currentResult}` with build number: `#${env.BUILD_NUMBER}`\n
        Changes:\n
        $changeString\n
        Build details: <${env.BUILD_URL}/console|See in web console>
    """.stripIndent()

  return slackSend(color: colorCode, message: message, channel: '#ci-server')
}

pipeline {
  agent any
  options {
    timeout(time: 10, unit: 'MINUTES')   // timeout on whole pipeline job
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  stages {
    stage('remove node_modules directory') {
      when {
        anyOf {
          changeset "yarn.lock"
          changeset "package.lock"
        }
      }
      steps {
        sh 'rm -rf node_modules'
      }
    }
    stage('Parameter for master') {
      when {
        branch 'master'
      }
      steps {
        script {
          properties([parameters([choice(choices: ['build', 'build-deploy'], name: 'DEPLOYMENT_CHOICE')])])
        }
      }
    }
    stage('Parameter for testing') {
      when {
        branch 'testing'
      }
      steps {
        script {
          properties([parameters([choice(choices: ['build-deploy', 'build'], name: 'DEPLOYMENT_CHOICE')])])
        }
      }
    }
    stage('Parameter for branches') {
      when {
        anyOf {
          branch 'feature/*'
          branch 'bugfix/*'
          branch 'hotfix/*'
        }
      }
      steps {
        script {
          properties([parameters([choice(choices: ['build'], name: 'DEPLOYMENT_CHOICE')])])
        }
      }
    }
    stage('Npm install') {
      when {
        anyOf {
          not {
            expression { return fileExists('node_modules') }
          }
          changeset "yarn.lock"
          changeset "package.lock"
        }
      }
      steps {
        echo 'building project...'
        sh 'npm install @vue/cli-service'
        sh 'npm install'
      }
    }
    stage('building testing branch') {
      when {
        branch 'testing'
      }
      steps {
        sh 'npm run build-testing'
      }
    }
    stage('building for all branch') {
      when {
        not {
          branch 'testing'
        }
      }
      steps {
        sh 'npm run build'
      }
    }
    // Deploying image
    stage('Deploying to the test environment') {
      when {
        allOf {
          expression { params.DEPLOYMENT_CHOICE == 'build-deploy' }
          branch 'testing'
        }
      }
      steps {
        withAWS(region: 'eu-west-1', credentials: 'aws.credentials') {
          sh 'echo "Uploading content with AWS creds"'
          s3Upload(file: 'dist', bucket: 'mm-agency-fe')
          cfInvalidate(distribution: 'E3CKD5B0IP3JFB', paths: ['/*'], waitForCompletion: 'true')
        }
      }
    }
    stage('Deploying to the prod environment') {
      when {
        allOf {
          expression { params.DEPLOYMENT_CHOICE == 'build-deploy' }
          branch 'master'
        }
      }
      steps {
        withAWS(region: 'eu-west-1', credentials: 'aws.credentials') {
          sh 'echo "Uploading content with AWS creds"'
          s3Upload(file: 'dist', bucket: 'mm-agency-fe-prod')
          cfInvalidate(distribution: 'E16S44U86PCLBP', paths: ['/*'], waitForCompletion: 'true')
        }
      }
    }
  }
  post {
    success {
      echo 'Sending success slack notification'
      script {
        sendBuildStatusOverSlack()
      }
    }
    failure {
      echo 'Sending failure slack notification'
      script {
        sendBuildStatusOverSlack()
      }
    }
  }
}
