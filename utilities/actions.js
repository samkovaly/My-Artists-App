
export const makeAction = (type, payload = null) => {
    return {
        type,
        payload
    }
}