if (Meteor.isClient) {

    Template.body.helpers({
        MongoInspector_enabled: function() {

            var url       = Meteor.absoluteUrl(),
                localhost = url.indexOf("http://localhost"),
                disabled  = !Session.get("MongoInspector"),
                cordova   = Meteor.isCordova;

            if        (disabled  === true) {
                return false;
            } else if (localhost === -1) {
                return false;
            } else if (cordova   === true) {
                return false;
            } else {
                return true;
            }

        },
        MongoInspector_collections: function () {
            var    collections = Session.get("MongoInspector");
            return collections;
        }
    });

    Template.body.events({
        'click .MongoInspector_row': function () {
            var thisCollection = window[this];
            console.log(thisCollection.find().fetch());
        },
        'click .MongoInspector_header': function () {
            $("#MongoInspector").hide();
        },
    });

    Template.MongoInspector_collection.helpers({
        collectionName: function() {
            return this;
        },
        collectionCount: function () {
            var thisCollection = window[this];
            return thisCollection.find().count();
        }
    });

}