

const path = require ('path');
const Stripe = require ('stripe');
const stripe = Stripe (process.env.STRIPE_SECRET_KEY);
const _ = require ('lodash');
const { Product } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Product'));
const port = process.env.PORT || 80;

// create json data in backend for security purposes
// as if we create data for checkout on frontend 
// then it can be manipulated, so we just take productID and Quantity from frontend
// and in backend we would maintain a product database to store all details regarding product

const createCheckoutSession = async (req, res) => {

    try {

        const { productID, quantity } = _.pick (req.body, ['productID', 'quantity']);
        if (!productID || !quantity) {
            throw new Error ('please enter the productID and quantity')
        }

        // finding if there is any product with the given ID
        Product.findOne ({
            _id: productID
        }).then ((foundProduct) => {

            // if no product found throw error
            if (!foundProduct) {
                throw new Error ('no product found with the given ID');
            }

            // creating a session
            return stripe.checkout.sessions.create ({

                payment_method_types: ['card'],
                line_items: [ // here we have only 1 product so we are hardcoding this array to 1 element, but in real scenerio we have a 'cart' and thus we make line_items array from that
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: foundProduct.name,
                                images: foundProduct.images,
                            },
                            unit_amount: foundProduct.unitPrice * 100 // stripe uses cents as measure so 1$ = 100cents
                        },
                        quantity
                    }
                ],
                mode: 'payment',
                success_url: `http://localhost:${port}/api/success`,
                cancel_url: `http://localhost:${port}/api/cancelled`

            })

        }).then ((createdSession) => {

            // returning the created Session id only to the user [due to secuity purposes]
            return res.status (200).send ({
                status: 'success',
                sessionID: createdSession.id
            })

        }).catch ((error) => {

            // catching and returning the error
            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })
        })

    } catch (error) {
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }

}

module.exports = {
    createCheckoutSession
}