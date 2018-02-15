(()=> {
    const socket = io();
    let messageList = document.querySelector('ul'),
        chatForm = document.querySelector('form'),
        nameInput = document.querySelector('.nickname'),
        chatMessage = chatForm.querySelector('.message'),
        nickName = null,
        typing = document.querySelector('#popmsg');

    function setNickname(){
        nickName = this.value;
    }

    function handleSendMessage(e){
        // debugger;
        e.preventDefault();// block default event(refresh page)
        nickName = (nickName && nickName.length > 0) ? nickName : 'user';
        msg = `${nickName} says ${chatMessage.value}`;

        socket.emit('chat message', msg);
        chatMessage.value= "";
        typing.innerHTML="";
        return false;
    }


    function appendMessage(msg) {

        //debugger;
        let newMsg = `<li>${msg.message}</li>`;
        messageList.innerHTML += newMsg;
    }

    function appendDiscMessage(msg){
        //debugger;
        let newMsg = `<li>${msg}</li>`;
        messageList.innerHTML += newMsg;
    }

    chatMessage.addEventListener('keypress', function(){
       // debugger;
       // e.preventDefault();// block default event(refresh page)
       nickName = (nickName && nickName.length > 0) ? nickName : 'user';

      socket.emit('typing', `${nickName}` );
   });

   socket.on('typing', function(data){
      typing.innerHTML =   data + '\nis typing' ;
   });




    nameInput.addEventListener('change', setNickname, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat message', appendMessage, false);
    socket.addEventListener('disconnect message', appendDiscMessage, false);
    // socket.addEventListener('typing', ,false);

})();
