

import * as Device from 'expo-device';

export const fetchDeviceType = async () => {
    const deviceType = await Device.getDeviceTypeAsync();
    return deviceType;
};