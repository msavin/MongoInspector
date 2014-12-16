if (Meteor.isClient) {

    // Detect Collections

    var MongoInspector_origCollection = Mongo.Collection,
        MongoInspector_activeCollections = [],
        MongoInspector_activeCollectionDep = new Tracker.Dependency;

    Meteor.Collection = function (name, options) {
        var instance = new MongoInspector_origCollection(name, options);
    
        MongoInspector_activeCollections.push({
            name: name,
            instance: instance
        });
        MongoInspector_activeCollectionDep.changed();
    
        return instance;
    };

    Template.body.helpers({
        MongoInspector_collections: function () {
            MongoInspector_activeCollectionDep.depend();
            return MongoInspector_activeCollections;
        }
    });

    Template.body.events({
        'click': function () {
            $(".MongoInspector_row").removeClass("MongoInspector_row_expand");
            $("#MongoInspector").removeClass("MongoInspector_expand");
        },
        'click .MongoInspector_row': function () {
            
            var collectionName = this.name;
            var thisCollection = this.instance;
            
            // Start Hacky Code

                var rowID = "#MongoInspector_" + collectionName;

                if ($(rowID).hasClass("MongoInspector_row_current")) {
                    // Do nothing
                } else {
                    $(".MongoInspector_row").removeClass("MongoInspector_row_current");
                    $("#MongoInspector_" + this.name).addClass("MongoInspector_row_current");
                    Session.set("MongoInspector", 1);
                }
                // .. I'm sure we can use one less selector here

            $(".MongoInspector_row").removeClass("MongoInspector_row_expand");
            $("#MongoInspector_" + this.name).addClass("MongoInspector_row_expand");
            $("#MongoInspector").addClass("MongoInspector_expand");
            
            // End, Refactor Later

        }
    });

    Template.MongoInspector_header.events({
        'click': function () {
            $("#MongoInspector").hide();
        }
    });


}