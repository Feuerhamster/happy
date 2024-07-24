import { Insertable, Selectable, Updateable } from "kysely";

export enum EDatabaseBoolean {
	FALSE,
	TRUE,
}

export interface IAgentTable {
	id: string;
	name: string;
	displayName: string;
}

export interface IAgentService {
	id: string;
	name: string;
	displayName: string;
	rules: string;
}

export interface IAgentServiceData {}

export type Agent = Selectable<IAgentTable>;
export type NewAgent = Insertable<IAgentTable>;
export type AgentUpdate = Updateable<IAgentTable>;

export interface IDatabase {
	agents: IAgentTable;
}
