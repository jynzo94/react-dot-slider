import styled from 'styled-components'

export type ArrowSvgStyles = {
    $arrowSvgColor?: string
}

const ArrowSvg = styled.svg<ArrowSvgStyles>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.$arrowSvgColor};
`

ArrowSvg.defaultProps = {
    $arrowSvgColor: 'white'
}

export default ArrowSvg
