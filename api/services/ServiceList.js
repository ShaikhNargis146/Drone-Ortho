var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    thumbnail: String,
    status: {
        type: String,
        default: ""
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ServiceList', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getByMission: function (data, callback) {
        console.log("data", data);
        ServiceList.find().lean().exec(function (err, data2) {

            Mission.findOne({
                "_id": data._id
            }).lean().exec(function (err, data3) {
                // console.log("data3", data3);

                var missionArr = data3.others;
                var returnVal = _.map(data2, function (n) {
                    if (!_.isEmpty(missionArr)) {
                        console.log("n._id", n._id);
                        var missionObj = _.filter(missionArr, function (m) {
                            console.log("m", _.isEqual(m.serviceId, n._id))
                            return _.isEqual(m.serviceId, n._id)
                        });
                        if (!_.isEmpty(missionObj)) {
                            console.log("missionObj----", missionObj[0].status);
                            n.status = missionObj[0].status;
                        }
                    }
                    console.log("missionObj", missionObj)
                    return n;

                });
                console.log(returnVal);
                callback(err, returnVal);
            })
        });


        // Mission.findOne({
        //         "_id": data.missionId
        //     }, function (err, data) {
        //         if (err) {
        //             callback(err, null);
        //         } else {
        //             ServiceList.find({},function (err, data2) {
        //                     if (err) {
        //                         callback(err, null);
        //                     } else {

        //                         //callback(null, deleted);
        //                     }
        //                 })
        //                 //callback(null, deleted);
        //             }
        //         });
    },
};
module.exports = _.assign(module.exports, exports, model);