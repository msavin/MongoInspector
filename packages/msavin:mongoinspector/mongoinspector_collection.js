if (Meteor.isClient) {

    Template.MongoInspector_collection.helpers({
        collectionCount: function () {
            var collectionName = this.name,
                thisCollection = this.instance;
            return thisCollection.find().count();
        },
        currentPosition: function () {
            var thisCollection = this.instance;
            
            if (thisCollection.find().count() === 0) {
                // don't display anything
            } else {
                var current = Session.get("MongoInspector");
                return current + "/"
            }
        }
    });

}