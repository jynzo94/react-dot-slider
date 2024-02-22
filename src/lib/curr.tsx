import Ref from '../Ref'

export default function curr(ref: Ref) {
    if (ref === null) {
        throw new Error(`Param ref:Ref cannot be null`)
    }

    return ref.current as HTMLDivElement
}
