module.exports = {
    apps : [{
        name: "app",
        script: "./dist/index.js",
        env: {
          NODE_ENV: "production",
        },
        error_file: 'err.log',
        out_file: 'out.log',
        log_file: 'combined.log',
        time: true
    }]
};
