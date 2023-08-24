import { getButtonElBySelector } from './elements'
import { CAMERA_LABEL } from './selectors'

export const registerCameraButtonEvent = () => {
    const button = getButtonElBySelector(CAMERA_LABEL);
    if (button) {
        button.addEventListener('click', (e) => {
            console.log('Camera turned off!!!!')
        })
    }
}
