//types 
const GET_USER = "lol/getUser"

//action
const getUser = (user) => ({
    type: GET_USER,
    payload: user,
})

//thunk
export const thunkGetUser = (riotID) => async (dispatch) => {
    riotID = encodeURIComponent(riotID)
    const response = await fetch(`/api/lol/getUser/${riotID}`)
    
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
