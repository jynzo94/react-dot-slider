import styled from 'styled-components'

export type SlidesWrapperStyles = {
    width: string
}

const SlidesWrapper = styled.div<SlidesWrapperStyles>`
    margin: auto;
    position: relative;
    display: flex;
    overflow: hidden;
    user-select: none;
    width: ${(props) => props.width};
`

export default SlidesWrapper
