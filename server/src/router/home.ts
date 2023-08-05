import express from "express"
import {getHome} from "../controllers/home";


export default (router: express.Router) => {
    router.get("/", getHome())
}
