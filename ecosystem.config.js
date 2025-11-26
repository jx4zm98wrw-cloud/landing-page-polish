module.exports = {
  apps: [
    {
      name: 'asl-law-api',
      script: 'api/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/home/cloudpanel/htdocs/api.yourdomain.com/logs/err.log',
      out_file: '/home/cloudpanel/htdocs/api.yourdomain.com/logs/out.log',
      log_file: '/home/cloudpanel/htdocs/api.yourdomain.com/logs/combined.log',
      time: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', 'logs']
    }
  ]
};
