import { sbTransport } from './domains/transport.service';

export const transportApi = {
  getBuses: (schoolId?: string) => sbTransport.list(schoolId),
  getBus: (id: string) => sbTransport.get(id),
  getTrackingHistory: (busId: string) => sbTransport.getTracking(busId),
  createBus: (data: any) => sbTransport.create(data),
  updateBus: (id: string, data: any) => sbTransport.update(id, data),
  deleteBus: (id: string) => sbTransport.remove(id),
};