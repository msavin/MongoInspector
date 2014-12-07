Vendor        = new Meteor.Collection('vendor');
Product       = new Meteor.Collection('product');
Cart		  = new Meteor.Collection('cart');

if (Meteor.isClient) {
	console.log("# MongoInspector");
	console.log("- Autopublish and insecure are on by default for you to test it out.");
	console.log("- Please use it responsibly.");
}