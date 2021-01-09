// system or lib import
import winston from "winston";
import custom_generic_error from "../error/custom_generic_error";
// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";
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
			throw new custom_generic_error("Unable to get security client instance");
		}

		this.security_instance = security_instance;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	process_ie_log(level: string, title: string = "", message: app_type.AnyAttributes = "", stack: app_type.AnyAttributes = "", param: app_type.AnyAttributes = ""): void {
		if (collection_helper.validate_is_null_or_undefined(this.ie_winston_instance) === true) {
			throw new custom_generic_error("Unable to get logger instance");
		}

		if (collection_helper.validate_is_null_or_undefined(level) === true) {
			throw new custom_generic_error("Level is not valid");
		}

		if (collection_helper.validate_is_null_or_undefined(title) === true) title = "";
		if (collection_helper.validate_is_null_or_undefined(message) === true) message = "";
		if (collection_helper.validate_is_null_or_undefined(stack) === true) stack = "";
		if (collection_helper.validate_is_null_or_undefined(param) === true) param = "";

		// check for type
		if (collection_helper.validate_not_string(level) === true) {
			throw new custom_generic_error("Level is not valid");
		}

		if (collection_helper.validate_not_string(title) === true) {
			throw new custom_generic_error("Title is not valid");
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