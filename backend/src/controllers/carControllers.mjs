import { ObjectId } from "mongodb";
import client from "../connections/mongodb.mjs";

export const addCar = async (req, res) => {
    try {
        const data = req.body;

        if (!data) return res.status(400).send({
            status: false,
            message: "No data provided"
        });

        let { name, type, model } = data;

        const dealerId = new ObjectId(req.decoded._id);

        if (!name || !type || !model) return res.status(400).send({
            status: false,
            message: "Please provide all required fields."
        });

        const carsCollection = client.db(process.env.DB_NAME).collection("cars");
        const dealerCollection = client.db(process.env.DB_NAME).collection("dealership");

        const carInfo = {
            name: name,
            type: type,
            model: model,
            car_info: {
                dealerId: dealerId
            },
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const car = await carsCollection.insertOne(carInfo);

        await dealerCollection.updateOne(
            {
                _id: dealerId
            },
            {
                $push: {
                     cars: car.insertedId
                }
            }
        )

        res.status(201).send({
            status: true,
            message: "Successfully added a new car.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}

export const getAllCar = async (req, res) => {
    try {
        const carsCollection = client.db(process.env.DB_NAME).collection("cars");

        const cars = await carsCollection.find().toArray();

        return res.status(200).send({
            status: true,
            data: cars
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}

export const getAllCarsWithDealerId = async (req, res) => {
    try {
        const dealerID = new ObjectId(req.params.dealerId);

        const dealerCollection = client.db(process.env.DB_NAME).collection("dealership");

        if(!dealerID) return res.status(400).send({
            status: false,
            message: "Invalid Request!"
        });

        const dealer = await dealerCollection.aggregate([
            {
                $match: {
                    _id: dealerID
                }
            }, 
            {
                $lookup: {
                    from: "cars",
                    localField: "cars",
                    foreignField: "_id",
                    as: "carList"
                }
            },
            {
                $project: {
                    _id: 0,
                    carList: 1
                }
            }
        ]).toArray();

        res.status(200).send({
            status: true,
            data: dealer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}