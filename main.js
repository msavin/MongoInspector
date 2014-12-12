Vendor        = new Meteor.Collection('Vendor');
Product       = new Meteor.Collection('Product');
Cart		  = new Meteor.Collection('Cart');
Orders		  = new Meteor.Collection('Orders');


if (Meteor.isClient) {
	console.log("# MongoInspector");
	console.log("- Autopublish and insecure are on by default for you to test it out.");
	console.log("- Please use it responsibly.");
}
