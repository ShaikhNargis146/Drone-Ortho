var cron = require('node-cron');
var schema = new Schema({
    missionId: String,
    DFMSubscription: {
        type: Schema.Types.ObjectId,
        ref: 'DFMSubscription',
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    description: String,
    files: [{
        type: String
    }],
    status: String,
    others: [{
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: 'ServiceList',
            index: true
        },
        name: String, //orthomosaic,mapViewer,DVI,DSM,threedMode,KMZ
        file: String,
        data: Schema.Types.Mixed,
        status: {
            type: String
        }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Mission', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
// cron.schedule('1 * * * * *', function () {
//     Mission.find({}, function (err, found) {
//         if (err) {
//             callback(err, null);
//         } else {
//             _.forEach(found, function (value) {
//             // write their api to update status if changed
//             value.status="checked";
//             value.save(function(){})
//             });
//             console.log("m in found");
//         }
//     });
// });

module.exports = _.assign(module.exports, exports, model);