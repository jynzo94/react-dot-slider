import { RefObject } from 'react';
type Ref<T extends HTMLDivElement = HTMLDivElement> = RefObject<T>;
export default Ref;
