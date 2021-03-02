import React from 'react'

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



const Store = (props) => {


const reducerHook = React.useReducer(reducer,initState);

    return (
       <CTX.Provider value ={reducerHook}>
           {props.children}
       </CTX.Provider>
    )
}

export default Store
