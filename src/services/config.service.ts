import dotenv from "dotenv";

export let config = {
	port: 7000,
	agent_access_key: "",
};

export function loadConfig() {
	dotenv.config();

	if (process.env.PORT) {
		config.port = parseInt(process.env.PORT);
	}

	if (process.env.AGENT_ACCESS_KEY) {
		config.port = parseInt(process.env.AGENT_ACCESS_KEY);
	}
}
