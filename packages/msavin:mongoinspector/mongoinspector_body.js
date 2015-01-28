if (Meteor.isClient) {

    // Detect Collections
    // Special thanks to Krawalli & JonJamz from GitHub

    var MongoInspector_origCollection = Mongo.Collection,
        MongoInspector_activeCollections = [],
        MongoInspector_activeCollectionDep = new Tracker.Dependency;

    Mongo.Collection = Meteor.Collection = function () {
        MongoInspector_origCollection.apply(this, arguments);
        var label, name;
        if (arguments.length === 2 && arguments[1]) {
            label = arguments[1].label;
        }
        label = label || 'local_';
        name = arguments[0] || '_' + label;
        MongoInspector_activeCollections.push({
            name: name,
            instance: this
        });
        MongoInspector_activeCollectionDep.changed();

        return this;
    };

    Mongo.Collection.prototype = Meteor.Collection.prototype = Object.create(MongoInspector_origCollection.prototype);

    for (var func in MongoInspector_origCollection) {
      if (MongoInspector_origCollection.hasOwnProperty(func)) {
        Mongo.Collection[func] = Meteor.Collection[func] = MongoInspector_origCollection[func];
      }
    }

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

            // I'm sure we can use one less selector here ..

                var rowID = "#MongoInspector_" + collectionName;

                if ($(rowID).hasClass("MongoInspector_row_current")) {
                    // Do nothing
                } else {
                    $(".MongoInspector_row").removeClass("MongoInspector_row_current");
                    $("#MongoInspector_" + this.name).addClass("MongoInspector_row_current");
                    Session.set("MongoInspector", 1);
                }
                
            $(".MongoInspector_row").removeClass("MongoInspector_row_expand");
            $("#MongoInspector_" + this.name).addClass("MongoInspector_row_expand");
            $("#MongoInspector").addClass("MongoInspector_expand");

            // End

        }
    });

    Template.MongoInspector_header.events({
        'click': function () {
            $("#MongoInspector").hide();
        }
    });


}