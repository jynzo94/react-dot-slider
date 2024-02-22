import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Slider from './Slider'
import Slide from './Slide'

describe('Slider', () => {
    test('renders Slider', () => {
        render(
            <Slider width='500px'>
                <Slide></Slide>
            </Slider>
        )
    })
})
