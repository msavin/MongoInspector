# MongoInspector
Gain a visual view of how your application and collections are operating. 

# Main Benefits
 - Watch your collections update in real-time in the browser
 - Click on a collection to run "console.log(Collection.find().fetch())"
 - Click on the title to remove it from the window

# Try It
 - To learn more, go to http://mongoinspector.meteor.com
 - To use, run "meteor add msavin:mongoinspector"

# Important Notes
- The CSS is namespaced, so there should be no clash between your application and this package. The package also uses the "MongoInspector" session variable.
- Currently the package only supports Meteor.Collections. I'm working on support for Mongo.Collections but its causing strange issues. A temporary (no cost) solution is to rename your Mongo.Collection() to Meteor.Collection().