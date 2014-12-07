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
            var thisCollection = getPropByString(window, collectionName);
            console.log(thisCollection.find().fetch());
        },
        'click .MongoInspector_header': function () {
            $("#MongoInspector").hide();
        },
    });

    Template.MongoInspector_collection.helpers({
        collectionCount: function () {
            var collectionName = this.name;
            var thisCollection = getPropByString(window, collectionName);
            return thisCollection.find().count();
        }
    });

    /* Thanks to Richard Smith (rjsmith)

    /**
     * @rsbatech: Recursively access sub-properties from a dotted property path
     * From: http://stackoverflow.com/a/6906859
     **/
    function getPropByString(obj, propString) {
        if (!propString)
            return obj;

        var prop, props = propString.split('.');

        for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
            prop = props[i];

            var candidate = obj[prop];
            if (candidate !== undefined) {
                obj = candidate;
            } else {
                break;
            }
        }
        return obj[props[i]];
    }

}