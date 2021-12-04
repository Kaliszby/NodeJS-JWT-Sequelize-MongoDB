module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
        {
            msgID: String,
            msgBody: String,
            ID: String,
            Series: String,
            AlmFlag: String,
            StatusDe: String,
            Lat: Number,
            Lng: Number,
            Alti: String,
            Speed: String,
            Direc: String,
            tDate: String,
            gTime: String,
            GSM: String,
            Sat: String,
            Batt: String,
            InBatt: String,
            lockStatus: Number,
            moStatus: Number,
            coStatus: Number,
            Sented: String,
            emTime: Number,
            eTime: Date,
            ServTime: Date,
        },
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(mongoosePaginate);

    const Log = mongoose.model("dev_00001", schema);
    return Log;
};