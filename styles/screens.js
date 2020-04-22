
import * as Colors from './colors'


export const screenContainer = {
    flex: 1,
    backgroundColor: Colors.SPOTIFY_BLACK,
}

export const screenContainerFlexEnd = {
    ...screenContainer,
    justifyContent: 'flex-end',
}

export const screenContainerFlexStart = {
    ...screenContainer,
    justifyContent: 'flex-start',
}

export const screenContainerCenter = {
    ...screenContainer,
    justifyContent: 'center',
}