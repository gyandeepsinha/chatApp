const users = [];

// addUser, removeUser, getUser, getUsersInRoom
const addUser   = ({id, userName, room}) => {
    // Clean The Data
    userName    =   userName.trim().toLowerCase();
    room        =   room.trim().toLowerCase();

    if(!userName || !room){
        return {
            'error' : 'userName and room are required'
        }
    }
    // Existing userName check
    const existingUser  =   users.find((user) => {
        return user.room === room && user.userName === userName
    });

    // Existing userName 
    if(existingUser){
        return {
            'error' : 'UserName is in use!'
        }
    }

    const user = {id, userName, room};
    users.push(user);
    return {user}
}

// addUser({
//     id          : 12,
//     userName    : 'Gyandeep ',
//     room        : 'Surat'
// });
// Remove User By Id
const removeUser    =   (id) =>{
    const index =   users.findIndex((user) => user.id === id);
    if(index!==-1){
        return users.splice(index, 1);
    }
    return 'No User Found!'
}

// Get User By Id
const getUserById    =   (id) => {
    return users.find((user) => user.id===id);
}

// Get All Users By room name
const getUsersByRoom    =   (roomName) =>{
    return users.filter((user) => user.room === roomName.trim().toLowerCase());
}

module.exports = { addUser, removeUser , getUserById, getUsersByRoom };

