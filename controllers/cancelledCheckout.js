

const cancelledCheckout = async (req, res) => {
    try {

        return res.status (400).send ({
            status: 'failure',
            message: 'your checkout session has been cancelled'
        })
        
    } catch (error) {

        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    cancelledCheckout
}