import styled from 'styled-components'

export type OuterButtonStyles = {
    $outerButtonBgColor?: string
    $outerButtonSize?: string
    $outerButtonBorder?: string
    $outerButtonMarginX?: string
}

type Props = {
    $disabled?: boolean
} & OuterButtonStyles

const OuterButton = styled.button<Props>`
    background-color: ${(props) => props.$outerButtonBgColor};
    opacity: ${(props) => (props.$disabled ? 0.2 : 1)};
    border: ${(props) => props.$outerButtonBorder};
    width: ${(props) => props.$outerButtonSize};
    height: ${(props) => props.$outerButtonSize};
    margin-left: ${(props) => props.$outerButtonMarginX};
    margin-right: ${(props) => props.$outerButtonMarginX};
    border-radius: 50%;
    position: relative;
`

OuterButton.defaultProps = {
    $outerButtonBgColor: 'blue',
    $disabled: false,
    $outerButtonSize: '50px',
    $outerButtonBorder: '2px solid grey',
    $outerButtonMarginX: '5px'
}

export default OuterButton
