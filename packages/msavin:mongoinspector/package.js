Package.describe({
  name:    'msavin:mongoinspector',
  summary: 'A real-time window into how your application and collections are operating.',
  version: '2.0.0',
  git:     'https://github.com/msavin/MongoInspector.git',
  debugOnly: true
});

Package.onUse(function(api) {

  var clientFiles = [
    "mongoinspector.css",
    "mongoinspector_body.html",
    "mongoinspector_documentViewer.html",
    "mongoinspector_documentViewer.js",
    "mongoinspector_collection.html",
    "mongoinspector_collection.js",
  	"mongoinspector_body.js"
  ];

  api.versionsFrom('1.0');
  api.use(['templating','tracker','mongo'], 'client');
  api.add_files(clientFiles);

});