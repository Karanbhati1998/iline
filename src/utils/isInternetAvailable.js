export const isInternetAvailable=()=>{
    window.addEventListener("online",()=>{
        console.log("Internet is online");
    })
    window.addEventListener("offline", ()=>{
        console.log("Internet is offline");
    })
}