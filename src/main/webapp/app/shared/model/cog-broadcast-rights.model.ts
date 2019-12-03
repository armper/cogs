import { ISameCode } from 'app/shared/model/same-code.model';

export interface ICogBroadcastRights {
  id?: number;
  cogId?: string;
  sameCodes?: ISameCode[];
  sameCodes?: ISameCode[];
}

export class CogBroadcastRights implements ICogBroadcastRights {
  constructor(public id?: number, public cogId?: string, public sameCodes?: ISameCode[], public sameCodes?: ISameCode[]) {}
}
