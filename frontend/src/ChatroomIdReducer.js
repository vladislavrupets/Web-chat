export default function ChatroomIdReducer (state, action){
    switch (action.type) {
        case 'updateChatroomId':
            return action.payload
        default:
            return state
    }
}
