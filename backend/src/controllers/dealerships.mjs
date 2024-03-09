import { ObjectId } from "mongodb";
import client from "../connections/mongodb.mjs";

export const getAllDealers = async (req, res) => {
    try {
        const dealerCollection = client.db(process.env.DB_NAME).collection("dealership");
        const dealers = await dealerCollection.find({}).toArray();

        res.status(200).send({
            status: true,
            data: dealers
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}

export const getDealerWithCarId = async (req, res) => {
    try {
        const carId = req.params.carId;

        const carsCollection = client.db(process.env.DB_NAME).collection("cars");

        const car = await carsCollection.aggregate([
            {
                $match: {
                    _id: carId
                }
            },
            {
                $lookup: {
                    from: "dealership",
                    localField: "car_info.dealerId",
                    foreignField: "_id",
                    as: "info"
                }
            }
        ]).toArray();

        res.status(200).send({
            status: true,
            data: car
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}

export const getAllDeals = async (req, res) => {
    try {
        const dealerId = new ObjectId(req.decoded._id);

        const dealCollection = client.db(process.env.DB_NAME).collection("deal");

        const deals = await dealCollection.find({
            deal_info: {
                dealerId: dealerId
            }
        }).toArray();

        res.status(200).send({
            status: true,
            data: deals
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

        const soldCollection = client.db(process.env.DB_NAME).collection("sold_vehicles");

        const soldInfo = {
            car_id: carId,
            vehicle_info: {},
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const soldVehicle = await soldCollection.insertOne(soldInfo);

        const userCollection = client.db(process.env.DB_NAME).collection("user");
        const dealCollection = client.db(process.env.DB_NAME).collection("deal");

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