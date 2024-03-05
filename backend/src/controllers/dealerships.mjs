import client from "../connections/mongodb.mjs";

export const addCar = async (req, res) => {
    try {
        const data = req.body;

        if (!data) return res.status(400).send({
            status: false,
            message: "No data provided"
        });

        let { name, type, model } = data;

        if (!name || !type || !model) return res.status(400).send({
            status: false,
            message: "Please provide all required fields."
        });

        const carsCollection = client.db("nervesparks").collection("cars");

        const carInfo = {
            name: name,
            type: type,
            model: model,
            car_info: {},
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const car = await carsCollection.insertOne(carInfo);

        res.status(201).send({
            status: true,
            message: "Successfully added a new car.",
            data: car
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}

export const confirmDeal = async (req, res) => {
    try {
        const data = req.body;

        if (!data) return res.status(400).send({
            status: false,
            message: "No data provided"
        });

        let { carId, userId, dealId } = data;

        if (!carId || userId) return res.status(400).send({
            status: false,
            message: "Please provide all required fields."
        });

        const soldCollection = client.db("nervesparks").collection("sold_vehicles");

        const soldInfo = {
            car_id: carId,
            vehicle_info: {},
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const soldVehicle = await soldCollection.insertOne(soldInfo);

        const userCollection = client.db("nervesparks").collection("user");
        const dealCollection = client.db("nervesparks").collection("deal");

        await userCollection.updateOne(
            {
                _id: userId
            },
            {
                $push: {
                    vehicle_info: carId
                },
                updatedAt: Date.now()
            }
        );

        await dealCollection.updateOne(
            {
                _id: dealId
            },
            {
                deal_info: {
                    status: "done"
                },
                updatedAt: Date.now()
            },
        );

        res.status(201).send({
            status: true,
            message: "Deal has been successfully made.",
            data: soldVehicle
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}