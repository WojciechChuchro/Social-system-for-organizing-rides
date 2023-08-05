import express from "express"

export const getHome = async (req: express.Request, res: express.Response) => {
    try {
        return res.status(200).json("hello").end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
