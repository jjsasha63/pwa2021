app.controller('ChatCtrl', [ '$http', '$scope', 'lib', 'ws', function($http, $scope, lib, ws) {
    console.log('ChatCtrl started')
    let ctrl = this

    ctrl.chats = []

    ctrl.chat = {
        sender_id: '',
        group_id: '',
        content: ''
    }

    ctrl.group_id = null
    
    // retrieve chats list on start
    $http.get('/chat').then(function(res) {
        ctrl.chats = res.data
    }, function(err) {
        console.error(err.data)
    })

    $http.get('/group').then(function(res) {
        ctrl.groups = res.data   
        ctrl.group_id = ctrl.groups[0]._id
        ctrl.refreshChats()   
    }, function(err) {
        console.error(err.data)
    })

    $http.get('/person').then(function(res) {
        ctrl.persons = res.data
        group_id = ctrl.persons[0].group_id
        ctrl.refreshChats()
    }, function(err) {
        console.error(err.data)
    })

    ctrl.new = function() {
        $http.post('/chat', ctrl.chat).then(function(res) {
            ctrl.chats = res.data
        }, function(err) {
            console.error(err.data)
        })
    }

    ctrl.isChatDataCorrect = function(){
        return ctrl.chat.content && ctrl.chat.sender_id && ctrl.chat.group_id
    }
    
    ctrl.refreshChats = function() {
        $http.get('/chat?_id=' + ctrl.group_id).then(function(res) {
            ctrl.chats = res.data
        }, function(err) {
            console.error(err.data)
        })
    }

    $scope.$on('change', function(event, arg) {
        if(arg.collection == 'persons' || arg.collection == 'chats') {
            ctrl.refreshChats()
        }
    })

    ctrl.refreshChats()
}])