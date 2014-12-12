if (Meteor.isClient) {
    Template.MongoInspector_documentViewer.helpers({
        currentDocument: function () {
            // var collection = this.instance;
            var    currentDocument = Session.get("MongoInspector");
            return currentDocument;
        },
        totalDocuments: function () {
            var    collection = this.instance;
            return collection.find().count();
        },
        documentJSON: function () {
            var documents   = this.instance.find().fetch(),
                docNumber   = Session.get("MongoInspector") - 1,
                docCurrent  = documents[docNumber],
                json_output = JSON.stringify(docCurrent, null, 2);
            return json_output;
        },
        enableRightArrow: function () {
            var currentDocument = Session.get("MongoInspector"),
                collection      = this.instance, 
                totalDocuments  = collection.find().count();
            
            if (currentDocument < totalDocuments) {
                return "mib_enabled";
            }
        },
        enableLeftArrow: function () {
            var currentDocument = Session.get("MongoInspector");
            if (currentDocument === 1) {
                // do nothing
            } else {
                return "mib_enabled";
            }
        },
        makeRightClickable: function () {
            var currentDocument = Session.get("MongoInspector"),
                collection      = this.instance, 
                totalDocuments  = collection.find().count();
            
            if (currentDocument < totalDocuments) {
                return "MongoInspector_next";
            }
        },
        makeLeftClickable: function () {
            var currentDocument = Session.get("MongoInspector");
            if (currentDocument === 1) {
                // do nothing
            } else {
                return "MongoInspector_prev";
            }
        },
    });

    Template.MongoInspector_documentViewer.events({
        'click #MongoInspector_prev': function () {
            var docNumber = Session.get("MongoInspector");
            Session.set("MongoInspector", docNumber - 1);
            console.log('minus one');
        },
        'click #MongoInspector_next': function () {
            var docNumber = Session.get("MongoInspector");
            Session.set("MongoInspector", docNumber + 1);
            console.log('plus one');
        }
    });
}