import react from "react";

import UserList from "../components/UserList";

const Users = () =>{

    const users = [{
        id:'12',
        name:'Lucas',
        image:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        places:3
    },
    {
        id:'13',
        name:'Lucas Cardozo',
        image:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        places:5
    }];
    
    return <UserList items={users} />;
};

export default Users;