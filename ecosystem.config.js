module.exports = {
  apps : [{
    name   : "app",
    script : "./app.js",
    watch: ["./"],
    ignore_watch : ["node_modules", "static"],
    watch_options: {
      followSymlinks: false
    }
  }]
}
