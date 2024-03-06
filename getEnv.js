require('./env')

function getAPIKEY() {
    return process.env.API_KEY
}

module.exports = { getAPIKEY };