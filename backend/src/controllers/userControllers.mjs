import client from "../connections/mongodb.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        let data = req.body;
        if (!data) return res.status(400).send({
            status: false,
            message: "No data provided"
        });

        let { name, password, location, email, isDealer } = data;

        // Checking for required fields in the request body
        if (!name || !password || !location || !email) return res.status(400).send({
            status: false,
            message: "Please provide all required fields."
        });

        const usersCollection = isDealer ?
            client.db("nervesparks").collection("dealership") :
            client.db("nervesparks").collection("user");

        // Checking for the uniqueness of the email address
        const isUserExist = await usersCollection.findOne({ email });

        if (isUserExist) return res.status(409).send({
            status: false,
            message: "Email already in use."
        })

        password = await bcrypt.hash(password.trim(), 10);

        const info = {
            name: name.trim(),
            email: email.trim(),
            password: password,
            location: location.trim()
        }

        const userData = isDealer ? genDealer(info) : genUser(info);

        const user = await usersCollection.insertOne(userData);

        res.status(201).send({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}

export const login = async (req, res) => {
    try {
        let data = req.body;
        if (!data) return res.status(400).send({
            status: false,
            message: "No data provided"
        });

        let { email, password, isDealer } = data;

        if (!email || !password) return res.status(400).send({
            status: false,
            message: "Please provide all required fields."
        });

        email = email.trim();
        password = password.trim();

        const usersCollection = isDealer ?
            client.db("nervesparks").collection("dealership") :
            client.db("nervesparks").collection("user");

        const user = await usersCollection.findOne({ email: email });

        if (!user) return res.status(404).send({
            status: false,
            message: "User not found."
        });

        const isPasswordMatch = await bcrypt.compare(password, user.password);


        if (!isPasswordMatch) return res.status(401).send({
            status: false,
            message: "Incorrect Password"
        })

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        return res.status(200).send({
            status: true,
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
};

export const addDeal = async (req, res) => {
    try {
        const data = req.body;

        if (!data) return res.status(400).send({
            status: false,
            message: "No data provided"
        });

        let { carId, dealerId } = data;

        if (!carId || !dealerId) return res.status(400).send({
            status: false,
            message: "Please provide all required fields."
        });

        const dealCollection = client.db("nervesparks").collection("deal");

        const dealInfo = {
            car_id: carId,
            deal_info: {
                status: "pending"
            },
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const deal = await dealCollection.insertOne(dealInfo);

        const dealerCollection = client.db('nervesparks').collection('dealership');

        await dealerCollection.updateOne(
            {
                _id: dealerId
            },
            { 
                $push: {
                    deals: deal._id
                },
                updatedAt: Date.now()
            }
        );

        res.status(201).send({
            status: true,
            message: "Deal added successfully",
            data: deal
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "server-error"
        });
    }
}