const socket=io()
let val;
let textarea =document.querySelector('#textarea')
let messagearea=document.querySelector('.message_area')
do{
 val=prompt('Please enter your name!')
}while(!val);

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg={
        user:val,
        message:message.trim()
    }

    appendMessage(msg,'outgoing');
    scroll();
    textarea.value="";

    socket.emit('messagesent',msg)
}

function appendMessage(msg,type){
   let maindiv=document.createElement('div')
   let className=type
   maindiv.classList.add(className,'message')

   let markup=`<h4>${msg.user}</h4>
   <p>${msg.message}</p>`

   maindiv.innerHTML=markup;
   messagearea.appendChild(maindiv);
}
socket.on('messagesent',(msg)=>{
    appendMessage(msg,'incoming');
    scroll();
})

function scroll(){
    messagearea.scrollTop=messagearea.scrollHeight;
}