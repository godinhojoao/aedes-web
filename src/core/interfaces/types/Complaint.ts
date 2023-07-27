import { Location } from "./Location";

export type StatusesEnum = 'WAITING' | 'REJECTED' | 'SOLVED' | 'DOING'

export interface Complaint {
  id: string;
  status: StatusesEnum;
  location: Location;
  denunciatorId: string;
  description: string;
  formattedAddress: string;
  solver: {
    id: string;
    name: string;
  };
  solverDescription?: string;
  updatedAt?: string;
  createdAt: string;
}