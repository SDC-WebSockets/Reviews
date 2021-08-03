module.exports = function(grunt) {
  grunt.initConfig({
    awsKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    aws_s3: {
      options: {
        accessKeyId: '<%= awsKey %>',
        secretAccessKey: '<%= awsSecret %>',
        region: 'us-west-2'
      },
      staging: {
        options: {
          bucket: 'rpt27-sdc-websockets',
          differential: true
        },
        files: [
          {expand: true, cwd: 'client/public/', src: ['**/*.js'], dest: 'proxyAssets/', action: 'upload'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.registerTask('default', ['aws_s3']);
}