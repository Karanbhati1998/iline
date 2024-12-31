export function getToken(userType,key){
    let session=getObject(userType)||{};
    session=Object.keys(session).length && JSON.parse(session)
    let accessToken=session?.[key]||"";
    return accessToken;
}
export function getObject(key){
    if(window && window.localStorage){
        return window.localStorage.getItem(key)
    }
}