import React from 'react'
import io from 'socket.io-client';


export const CTX = React.createContext();


const initState = {
    general:[
        {from:'Ahmet Suhan',msg:'Hi!'},
        {from:'Jack',msg:'Heeeyy!'},
        {from:'Samer',msg:'Hello!'},
    ],
    topic2:[
        {from:'Ahmet Suhan',msg:'Hi!'},
        {from:'Ahmet Suhan',msg:'Hi!'},
        {from:'Ahmet Suhan',msg:'Hi!'},
    ]
}

function reducer(state,action){

const {from,msg,topic} = action.payload.topic;

    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return{
                ...state,
                [topic]:[
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]   
            }
        default:
             return state
            }
           
       
    }

 
let socket;

function sendChatAction(value){
    socket.emit('chat message',value);
}

const Store = (props) => {

    const {allChats,dispatch} = React.useReducer(reducer,initState);


    if(!socket){
        socket = io(':3001');
        socket.on('chat message',function(msg){
            dispatch({type:'RECEIVE_MESSAGE',payload:msg});
        })
    }

const user = 'ahmetSuhan'+Math.random(100).toFixed(2);


    return (
       <CTX.Provider value ={{allChats,sendChatAction,user}}>
           {props.children}
       </CTX.Provider>
    )
}

export default Store
