let ws = require('ws')

const lib = module.exports = {

    sessions: {},
    wsServer: null,
    
    sendJson: function(res, obj) {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.write(JSON.stringify(obj))
        res.end()
    },

    sendError: function(res, errno, message = '') {
        res.writeHead(errno, {'Content-type': 'application/json'})
        res.write(JSON.stringify({ message: message }))
        res.end()
    },

    isAdmin: function(client) {
        return lib.sessions[client.session] && lib.sessions[client.session].role == 'admin'
    },
    isLogged: function(client) {
        return lib.sessions[client.session] && lib.sessions[client.session].role
    },

    broadcast: function(message, selector = lib.isLogged) {
        let n = 0, m = 0
        lib.wsServer.clients.forEach(function(client) {
            m++
            if(client.readyState == ws.OPEN && selector(client)) {
                client.send(JSON.stringify(message))
                n++
            }
        })
    }
}