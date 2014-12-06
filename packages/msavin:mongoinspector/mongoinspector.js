if (Meteor.isClient) {

    Template.body.helpers({
        MongoInspector_enabled: function() {

            var cordova   = Meteor.isCordova;
            
            if (cordova   === true) {
                return false;
            } else {
                return true;
            }

        },
        MongoInspector_collections: function () {
              
            // Detecting Collections automatically 
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