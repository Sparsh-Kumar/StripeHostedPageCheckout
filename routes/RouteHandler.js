

const RouteHandler = require ('express').Router ();
const path = require ('path');
const { home } = require (path.resolve (__dirname, '..', 'controllers', 'home'));
const { createCheckoutSession } = require (path.resolve (__dirname, '..', 'controllers', 'createCheckoutSession'));
const { successCheckout } = require (path.resolve (__dirname, '..', 'controllers', 'successCheckout'));
const { cancelledCheckout } = require (path.resolve (__dirname, '..', 'controllers', 'cancelledCheckout'));

RouteHandler.get ('/', home);

RouteHandler.post ('/create-checkout-session', createCheckoutSession);
RouteHandler.get ('/success', successCheckout);
RouteHandler.get ('/cancelled', cancelledCheckout);

module.exports = {
    RouteHandler
}