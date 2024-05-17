
const getChannel = ( req, res ) => {
    try {
        res.status(200).send('')
    } catch (error) {
        res.status(500).send('')
    }
}
const postChannel = ( req, res ) => {
    try {
        res.status(200).send('')
    } catch (error) {
        res.status(500).send('')
    }
}
const checkSubscribers = (req, res) => {
    try {
        res.status(200).send('')
    } catch (error) {
        res.status(500).send('')
    }
}
// const removeChannel = ( req, res ) => {
//     try {
//         res.status(200).send('')
//     } catch (error) {
//         res.status(500).send('')
//     }
// }
// const updateChannel = ( req, res ) => {
//     try {
//         res.status(200).send('')
//     } catch (error) {
//         res.status(500).send('')
//     }
// }

module.exports = {
    getChannel,
    postChannel,
    checkSubscribers
}