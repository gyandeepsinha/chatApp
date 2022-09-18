const socket            =   io();

const $chatForm         =   document.querySelector('#chatForm');
const $txtMessage       =   document.querySelector('#txtMessage');
const $btnSubmit        =   document.querySelector('#btnSubmit');

const $btnSendLocation  = document.querySelector('#btnSendLocation');
const $divMessage       = document.querySelector('#chatMessages');
const messageTemplate   = document.querySelector('#message-template').innerHTML;
const locationTemplate  = document.querySelector('#location-message-template').innerHTML;
const userListTemplate  = document.querySelector('#user-list-template').innerHTML;
const $userListSideBar  = document.querySelector('#userListSideBar');

const {userName, room} = Qs.parse(location.search, { ignoreQueryPrefix: true });

// Welcome Message Service Listner
socket.on('welcomeMessage', (message) =>{
    const html  =   Mustache.render(messageTemplate,{
        userName   : message.userName,
        message    : message.text, 
        createdAt  : moment(message.createdAt).format('h:mm a')
    });
    $divMessage.insertAdjacentHTML('beforeend', html);
});

// Location Service Listner
socket.on('locationService', (url) =>{
    const html  =   Mustache.render(locationTemplate,{
        userName    : url.userName,
        url         : url.text,
        createdAt   : moment(url.createdAt).format('h:mm a')
    });
    $divMessage.insertAdjacentHTML('beforeend', html);
});

socket.on('userList', ({room , users}) => {
   const html  =   Mustache.render(userListTemplate, {room, users});
   document.querySelector('#userListSideBar').innerHTML = html;
});
// Submit Event 
$chatForm.addEventListener('submit', (e) =>{
    $txtMessage.setAttribute('disabled','disabled');
    e.preventDefault();
    const message   =   e.target.elements.txtMessage.value;

    socket.emit('sendMessage', message, (error) =>{
        $txtMessage.removeAttribute('disabled');
        $txtMessage.value='';
        $txtMessage.focus();
        if(error) return console.log(error);
        console.log('The Message Was Delivered!');
    });
});

// Location Event
$btnSendLocation.addEventListener('click', () =>{
    if(!navigator.geolocation)  return alert('Your browser does not support GeoLocation!');
    $btnSendLocation.setAttribute('disabled','disabled');

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {
            longitude : position.coords.longitude,
                latitude  : position.coords.latitude
        }, (callback) =>{
            $btnSendLocation.removeAttribute('disabled');
            console.log('Location Shared Successfully!');
        })
    });
});
socket.emit('join', {userName, room}, (error) =>{
    if(error){
        location.href= '/';
    }
});