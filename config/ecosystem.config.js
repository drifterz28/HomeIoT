module.exports = {
  apps : [{
    name: "app",
    // source_map_support: true,
    script : "./app.js",
    watch: ["./"],
    ignore_watch : ["node_modules", "dist"],
    watch_options: {
      followSymlinks: false
    },
    env: {
      "PORT": 8080,
      "NODE_ENV": "development"
    },
    env_production: {
      "PORT": 80,
      "NODE_ENV": "production",
    }
  }]
}
