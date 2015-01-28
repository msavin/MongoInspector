Vendor        = new Mongo.Collection('Vendor');
Product       = new Mongo.Collection('Product');
Cart		  = new Mongo.Collection('Cart');
Orders		  = new Mongo.Collection('Orders');


if (Meteor.isClient) {
	console.log("# MongoInspector");
	console.log("- Autopublish and insecure are on by default for you to test it out.");
	console.log("- Please use it responsibly.");
}
