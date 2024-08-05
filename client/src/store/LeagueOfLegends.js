//types 
const GET_USER = "lol/getUser"

//action
const getUser = (user) => ({
    type: GET_USER,
    payload: user,
})

//thunk
export const thunkGetUser = (riotId) => async (dispatch) => {
    const response = await fetch(`/api/lol/getUser/${riotId}`)
    
    if (response.ok){
        const user = await response.json()
        console.log(user)
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        default:
            return state
    }
}
