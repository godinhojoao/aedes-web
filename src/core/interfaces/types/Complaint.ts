import { Location } from "./Location";

export enum StatusesEnum {
  WAITING = 0,
  DOING = 1,
  SOLVED = 2,
  REJECTED = 3,
}

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
  updatedAt?: Date;
  createdAt: Date;
}