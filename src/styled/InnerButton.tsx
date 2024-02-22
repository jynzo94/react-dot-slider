import styled from 'styled-components'

export type InnerButtonStyles = {
    $innerButtonBorder?: string
    $innerButtonSize?: string
    $innerButtonMarginX?: string
    $innerButtonInactiveBgColor?: string
    $innerButtonActiveBgColor?: string
}

type Props = {
    $active: boolean
} & InnerButtonStyles

const InnerButton = styled.button<Props>`
    background-color: ${(props) =>
        props.$active
            ? props.$innerButtonActiveBgColor
            : props.$innerButtonInactiveBgColor};
    border: ${(props) => props.$innerButtonBorder};
    width: ${(props) => props.$innerButtonSize};
    height: ${(props) => props.$innerButtonSize};
    margin-left: ${(props) => props.$innerButtonMarginX};
    margin-right: ${(props) => props.$innerButtonMarginX};
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

InnerButton.defaultProps = {
    $innerButtonActiveBgColor: 'blue',
    $innerButtonInactiveBgColor: 'transparent',
    $innerButtonBorder: '2px solid grey',
    $innerButtonSize: '20px',
    $innerButtonMarginX: '5px'
}

export default InnerButton
