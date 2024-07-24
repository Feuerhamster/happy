import {
	ETargetStatus,
	IDatabase,
	ITargetTable,
	NewTemplate,
	TargetUpdate,
	TemplateUpdate,
} from "$models/database.js";

import SQLite from "better-sqlite3";
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from "kysely";
import { config } from "./config.service.js";
import path from "path";
import { TargetAdd } from "$models/request/target.request.js";
import { generateKey, generateUniqueId } from "$utils/id.util.js";
import { InsertExpression } from "kysely/dist/cjs/parser/insert-values-parser.js";
import { UpdateObjectExpression } from "kysely/dist/cjs/parser/update-set-parser.js";
import { TemplateAdd } from "$models/request/template.request.js";

export let db: Kysely<IDatabase>;

export async function initDatabase() {
	const dialect = new SqliteDialect({
		database: new SQLite("database.db"),
	});

	db = new Kysely<IDatabase>({ dialect, plugins: [new ParseJSONResultsPlugin()] });

	await db.schema
		.createTable("targets")
		.ifNotExists()
		.addColumn("id", "varchar(16)", (cb) => cb.primaryKey().notNull())
		.addColumn("name", "varchar(128)", (cb) => cb.notNull())
		.addColumn("status", "integer", (cb) => cb.notNull())
		.addColumn("smtp", "text", (cb) => cb.notNull())
		.addColumn("recipients", "text", (cb) => cb.notNull())
		.addColumn("origin", "text")
		.addColumn("from", "text", (cb) => cb.notNull())
		.addColumn("subject_prefix", "text")
		.addColumn("allow_files", "integer")
		.addColumn("allow_templates", "integer")
		.addColumn("allow_custom_recipients", "integer")
		.addColumn("ratelimit_timespan", "integer")
		.addColumn("ratelimit_requests", "integer")
		.addColumn("api_key", "text")
		.addColumn("success_redirect", "text")
		.addColumn("error_redirect", "text")
		.addColumn("captcha_provider", "integer")
		.addColumn("captcha_secret", "text")
		.execute();

	await db.schema
		.createTable("templates")
		.addColumn("id", "varchar(16)", (cb) => cb.primaryKey().notNull())
		.addColumn("name", "varchar(128)", (cb) => cb.notNull())
		.addColumn("template", "text", (cb) => cb.notNull())
		.ifNotExists()
		.execute();

	console.log("[SQLite] Database loaded");
}
