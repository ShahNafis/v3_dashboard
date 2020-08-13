const date = new Date()
const timestamp = 
`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
const root = '../../../'

module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'production',
      },
      error_file: `${root}${timestamp}_err.log`,
      out_file: `${root}${timestamp}_out.log`,
      log_file: `${root}${timestamp}_combined.log`,
      time: true,
    },
  ],
}
