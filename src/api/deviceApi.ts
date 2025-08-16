
import { API_URL, API_KEY } from './config';

export const linkDevice = async (deviceInfo: any) => {
  const res = await fetch(`${API_URL}/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(deviceInfo)
  });
  return await res.json();
};

export const getDevices = async () => {
  const res = await fetch(`${API_URL}/devices`, {
    headers: { 'x-api-key': API_KEY }
  });
  return await res.json();
};

export const lockDevice = async (deviceId: string) => {
  const res = await fetch(`${API_URL}/devices/lock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({ deviceId })
  });
  return await res.json();
};

export const unlockDevice = async (deviceId: string) => {
  const res = await fetch(`${API_URL}/devices/unlock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({ deviceId })
  });
  return await res.json();
};

export const followDevice = async (deviceId: string) => {
  const res = await fetch(`${API_URL}/devices/${deviceId}/location`, {
    headers: { 'x-api-key': API_KEY }
  });
  return await res.json();
};

export const controlDevice = async (deviceId: string, action: string) => {
  const res = await fetch(`${API_URL}/devices/control`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({ deviceId, action })
  });
  return await res.json();
};
