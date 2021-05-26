

const path = require ('path');
const publicKey = process.env.STRIPE_PUBLIC_API_KEY

const home = async (req, res) => {

    try {

        return res.status (200).render ('layouts/home', {
            api: publicKey
        })

    } catch (error) {
        return res.status (401).render ('layouts/error', {
            errorMessage: error.message
        });
    }

}

module.exports = {
    home
}