$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net/api/reguser' + options.url
})