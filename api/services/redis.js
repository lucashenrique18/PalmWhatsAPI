const redis_client = require('../../config/redis')

module.exports = {

    checkCache: (req, res, next) => {

        const { id } = req.params;

        //get data value for key =id
        redis_client.get(id, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            //if no match found
            if (data != null) {
                res.send(data);
            }
            else {
                //proceed to next middleware function
                next();
            }
        });

    }

    //
}