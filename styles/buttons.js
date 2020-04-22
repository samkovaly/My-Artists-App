

import * as Colors from './colors'


export const mediumButton = {
    padding: 16,
    borderRadius: 10,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
}

export const mediumButtonGreen = {
    ...mediumButton,
    backgroundColor: Colors.SPOTIFY_GREEN,
}

export const mediumButtonCoolGrey = {
    ...mediumButton,
    backgroundColor: Colors.COOL_GREY,
}

export const mediumButtonRed = {
    ...mediumButton,
    backgroundColor: Colors.LOGOUT_BUTTON_RED,
}

export const mediumButtonDisabled = {
    ...mediumButton,
    backgroundColor: Colors.DISABLED_GREY,
}

export const whiteButtonText = {
    color: Colors.WHITE,
}
export const mediumButtonWhiteText = {
    ...whiteButtonText,
    fontSize: 20,
}
export const largeButtonWhiteText = {
    ...whiteButtonText,
    fontSize: 26,
}