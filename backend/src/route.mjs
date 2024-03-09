import express from "express";
import {addDeal, login, register} from "./controllers/userControllers.mjs";
import {authentication, authorisationDealer, authorisationUser} from "./middlewares/auth.mjs";
import { confirmDeal, getAllDealers, getDealerWithCarId } from "./controllers/dealerships.mjs";
import { addCar, getAllCar, getAllCarsWithDealerId } from "./controllers/carControllers.mjs";

const router = express.Router();

router.get("/test", (req, res)=>res.send("working fine"));

router.post("/register", register);
router.post("/login", login);

router.get("/dealerships", authentication, getAllDealers); // only authenticated users can access this route
router.get("/dealership/:carId", authentication, getDealerWithCarId);

router.post("/add-car", authentication, authorisationDealer, addCar); // dealership only route
router.post("/confirm-deal", authentication, authorisationDealer, confirmDeal); // dealership only route

router.post("/add-deal", authentication, authorisationUser, addDeal); // user only route

router.get("/get-cars", authentication, getAllCar);
router.get("/get-cars/:dealerId", authentication, getAllCarsWithDealerId);

router.all('*', (req, res) => res.status(404).send({status: false, message: "page not found"}));

export default router;
