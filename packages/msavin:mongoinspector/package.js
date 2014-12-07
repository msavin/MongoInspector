Package.describe({
  name:    'msavin:mongoinspector',
  summary: 'A real-time window into how your application and collections are operating.',
  version: '1.1.1',
  git:     'https://github.com/msavin/MongoInspector.git',
  debugOnly: true
});

Package.onUse(function(api) {

  var clientFiles = [
  	"mongoinspector.html",
  	"mongoinspector.css",
  	"mongoinspector.js"
  ];

  api.versionsFrom('1.0');
  api.use(['templating','tracker'], 'client');
  api.add_files(clientFiles);

});