import { ICogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';

export interface ISameCode {
  id?: number;
  sameCode?: string;
  cogBroadcastRights?: ICogBroadcastRights;
}

export class SameCode implements ISameCode {
  constructor(public id?: number, public sameCode?: string, public cogBroadcastRights?: ICogBroadcastRights) {}
}
