

import * as Permissions from 'expo-permissions';

    // https://docs.expo.io/versions/latest/sdk/permissions/



export const userAllowsLocation = async () => {
    // prompts the user
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    return status;
  }
export const askLocationPermission = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    return status
}