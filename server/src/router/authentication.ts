import {  register } from "../controllers/authentication"
import express from "express"
import { check } from "express-validator"

export default (router: express.Router) => {
  router.post(
    "/auth/register",
    [
      check("email")
        .notEmpty()
        .withMessage("Your email address cannot be empty.")
        .isEmail()
        .withMessage("Your address email is invalid."),
      check("password")
        .notEmpty()
        .withMessage("Your password address cannot be empty.")
        .isLength({ min: 6 })
        .withMessage("Your password must have at least 6 characters."),
      check("username")
        .notEmpty()
        .withMessage("Your username address cannot be empty.")
    ],
    register
  )
  // router.post(
  //   "/auth/login",
  //   [
  //     check("email")
  //       .notEmpty()
  //       .withMessage("Your email address cannot be empty.")
  //       .isEmail()
  //       .withMessage("Your address email is invalid.")
  //       .custom(checkUserExistsByEmailForLogin),
  //     check("password")
  //       .notEmpty()
  //       .withMessage("Your password address cannot be empty.")
  //       .isLength({ min: 6 })
  //       .withMessage("Your password must have at least 6 characters."),
  //   ],
  //   login
  // )
}
