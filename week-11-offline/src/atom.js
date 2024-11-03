import {atom,selector} from "recoil"

export const networkAtom=atom({
    key:"networkAtom",
    default:102
 })
 export const jobsAtom=atom({
    key:"jobsAtom",
    default:0
 })
 export const messagingAtom=atom({
    key:"messagingAtom",
    default:0
 })
export const NotificationAtom=atom({
    key:"notificationAtom",
    default:12
 })

 export const Totalpings=selector({
    key:"Totalpings",
    get:({get}) =>{
        const networkpings=get(networkAtom);
        const jobspings=get(jobsAtom);
        const messagingpings=get(messagingAtom);
        const notificationpings=get(NotificationAtom)
        return networkpings+jobspings+messagingpings+notificationpings
    }
    
 })