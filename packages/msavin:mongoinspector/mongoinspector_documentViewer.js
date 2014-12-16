if (Meteor.isClient) {

    // Start JSON Colorization
    
    var MongoInspector_Colorize = function (json) {
        if (typeof json != 'string') {
             json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'MongoInspector_number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'MongoInspector_key';
                } else {
                    cls = 'MongoInspector_string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'MongoInspector_boolean';
            } else if (/null/.test(match)) {
                cls = 'MongoInspector_null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    
    // End 

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
                if (! (typeof json_output === "undefined")) {
                    colorize    = MongoInspector_Colorize(json_output);
                }
                return colorize;
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
        },
        'click #MongoInspector_next': function () {
            var docNumber = Session.get("MongoInspector");
            Session.set("MongoInspector", docNumber + 1);
        }
    });
}