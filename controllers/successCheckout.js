

const successCheckout = async (req, res) => {
    try {

        return res.status (200).send ({
            status: 'success',
            message: `Successfully Done Checkout of Checkout Session ID`
        })

    } catch (error) {

        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    successCheckout
}