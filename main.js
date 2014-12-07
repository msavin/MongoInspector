Vendor        = new Meteor.Collection('vendor');
Product       = new Meteor.Collection('product');
Cart		   = new Meteor.Collection('cart');

// var MyApp;
// var myCollection = new Mongo.Collection('mycollection');
// MyApp.myCollection = myCollection;

if (Meteor.isClient) {

	// Print Console Messages
		console.log("# MongoInspector");
		console.log("- Autopublish and insecure are on by default for you to test it out.");
		console.log("- Please use it responsibly.");

	// Normally, mongoinspector wouldn't show in production.
	// Let's overwrite the function to have it run in production this time,
	// so it would show up on the demo website
		Template.body.helpers({
		    MongoInspector_enabled: function() {
		    	return true;
		    }
		});
}

