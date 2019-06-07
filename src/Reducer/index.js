const intialState = {
    firstName: '',
    lastName: '',
    avatar: '',
    userName: ''
};

const loggedInUser = (state = intialState, action) => {
    switch(action.type){
        case 'FIRSTNAME':
        return Object.assign({}, state, { firstName: action.content })

        case 'LASTNAME':
        return Object.assign({}, state, { lastName: action.content })

        case 'AVATAR':
        return Object.assign({}, state, { avatar: action.content })

        case 'USERNAME':
        return Object.assign({}, state, { userName: action.content })
    
        default:
        return state;
    }
}

export default loggedInUser;