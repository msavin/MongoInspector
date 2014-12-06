if (Meteor.isClient) {

    Template.body.helpers({
        MongoInspector_enabled: function() {

            var url       = Meteor.absoluteUrl(),
                localhost = url.indexOf("http://localhost"),
                cordova   = Meteor.isCordova;


            if (localhost === -1) {
                return false;
            } else if (cordova   === true) {
                return false;
            } else {
                return true;
            }

        },
        MongoInspector_collections: function () {
                        
            // Forked from shanedonnelly1 

            var collections = [];

            for (var globalObject in window) { 
                if (globalObject === "webkitStorageInfo") {
                    continue;
                }
                if (window[globalObject] instanceof Meteor.Collection) {
                    collections.push({
                        "name": globalObject,
                        // "collection": window[globalObject]
                    });
                }
            }

            return collections;
            
        }
    });

    Template.body.events({
        'click .MongoInspector_row': function () {
            var collectionName = this.name;
            var thisCollection = window[collectionName];
            console.log(thisCollection.find().fetch());
        },
        'click .MongoInspector_header': function () {
            $("#MongoInspector").hide();
        },
    });

    Template.MongoInspector_collection.helpers({
        collectionCount: function () {
            var collectionName = this.name;
            var thisCollection = window[collectionName];
            return thisCollection.find().count();
        }
    });

}