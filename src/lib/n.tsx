export default function n(val:number|undefined){
    if(val===undefined){
        throw new Error()
    }

    return val as number
}