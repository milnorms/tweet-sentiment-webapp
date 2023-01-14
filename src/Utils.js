// This function calculates the hue (HSL) string of the colors based on value
const getColor  = (value) => {
    // Color styling constants (HSL). Going for a blue -> violet theme
    // Starting hue (value of 0 will yield this hue. every higher value changes color)
    const BASE_HUE = 175;
    const BASE_LIGHT = 40;
    // Higher means more dramatic change
    const COLOR_MULT = 5
    // Maximum hue the colors will reach
    const COLOR_MAX = 360

    const calcHue = BASE_HUE + (value * COLOR_MULT)
    const color = `hsl(${calcHue > COLOR_MAX ? COLOR_MAX : calcHue}, 100%, ${BASE_LIGHT}%)`
    // console.log(`BASE HUE: ${BASE_HUE}, calc hue: ${calcHue}`)
    return (color)
}

export {getColor}