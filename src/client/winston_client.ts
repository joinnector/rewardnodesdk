// system or lib import
import winston from "winston";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import custom_generic_error from "../error/custom_generic_error";

import * as app_type from "../types/app_type";

class WinstonClient {
	ie_winston_instance!: app_type.WinstonLogger;
	db_winston_instance!: app_type.WinstonLogger;
	security_instance!: app_type.SecurityInstance;
	notify_callback!: app_type.CallbackFunction;
	notify_callback_called: boolean;

	constructor(notify_callback?: app_type.CallbackFunction) {
		this.notify_callback_called = false;
		if (collection_helper.validate_is_function(notify_callback) === true) this.notify_callback = notify_callback!;
	}

	init(): void {
		// used to print inside the internal file
		this.prepare_ie_winston_instance();
	}

	// prepare
	prepare_common_instance(): app_type.WinstonLogger {
		/*
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		*/

		return winston.createLogger({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.simple(),
				winston.format.printf((message: winston.LogEntry): string =>
					(message.level, `${message.timestamp} - ${message.level} - ${message.message}`)
				)
			),
			defaultMeta: { service: constant_helper.get_setting_constant().SERVICE_NAME },
			exceptionHandlers: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.simple(),
						winston.format.printf((message: winston.LogEntry): string =>
							winston.format.colorize().colorize(message.level, `${message.timestamp} - ${message.level} - ${message.message}`)
						)
					)
				}),
			]
		});
	}

	prepare_ie_winston_instance(): void {
		this.ie_winston_instance = this.prepare_common_instance()
			.add(new winston.transports.Console({
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.simple(),
					winston.format.printf((message: winston.LogEntry): string =>
						winston.format.colorize().colorize(message.level, `${message.timestamp} - ${message.level} - ${message.message}`)
					)
				)
			}));

		if (collection_helper.validate_is_function(this.notify_callback) === true && this.notify_callback_called === false) {
			this.notify_callback_called = true;
			this.notify_callback(true);
		}
	}

	// process
	process_attach_security(security_instance: app_type.SecurityInstance): void {
		if (collection_helper.validate_is_null_or_undefined(security_instance) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Security instance is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		this.security_instance = security_instance;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	process_ie_log(level: string, title: string, message: app_type.AnyAttributes = "", stack: app_type.AnyAttributes = "", param: app_type.AnyAttributes = ""): void {
		if (collection_helper.validate_is_null_or_undefined(this.ie_winston_instance) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Winston instance is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (collection_helper.validate_is_null_or_undefined(level) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Level is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (collection_helper.validate_is_null_or_undefined(title) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Title is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (collection_helper.validate_is_null_or_undefined(message) === true) message = "";
		if (collection_helper.validate_is_null_or_undefined(stack) === true) stack = "";
		if (collection_helper.validate_is_null_or_undefined(param) === true) param = "";

		// check for type
		if (collection_helper.validate_not_string(level) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Level is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (collection_helper.validate_not_string(title) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Level is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		const winstonopts = collection_helper.process_serialize_data({
			level: level,
			data: {
				title: title,
				message: message,
				param: param,
				stack: stack,
			}
		});

		this.ie_winston_instance.log(level, winstonopts);
	}
}

export default WinstonClient;