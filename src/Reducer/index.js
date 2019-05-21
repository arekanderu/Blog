const intialState = {
    firstName: ''
};

const loggedInUser = (state = intialState, action) => {
    switch(action.type){
        case 'FIRSTNAME':
        return Object.assign({}, state, { firstName: action.content } )
    
        default:
        return state;
    }
}

export default loggedInUser;