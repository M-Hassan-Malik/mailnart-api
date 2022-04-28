const express = require('express');

const router = express.Router();

const { body, validationResult } = require("express-validator");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

router.post(
  "/checkout", 
  body("items").isArray().notEmpty().withMessage("Items must not be an empty list"),
  body("items.*.name").isString().withMessage("Each item must contain a valid string property 'name'"),
  body("items.*.priceInCents").isInt().withMessage("Each item must contain a valid int property 'priceInCents'"),
  body("items.*.quantity").isInt().withMessage("Each item must contain a valid int property 'quantity'"),
  // Validator
  (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const body = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: body.items.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      })
      res.json({
        status: true,
        url: session.url
      })
    } catch (e) {
      res.status(500).json({
        status: false,
        error: e.message
      })
    }
  }
)

module.exports = router;
