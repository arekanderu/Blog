export const getFirstName = text => {
    return {
        type: 'FIRSTNAME',
        content: text
    }
}

export const getLastName = text => {
    return {
        type: 'LASTNAME',
        content: text
    }
}

export const getAvatar = text => {
    return {
        type: 'AVATAR',
        content: text
    }
}

export const getUsername = text => {
    return {
        type: 'USERNAME',
        content: text
    }
}
