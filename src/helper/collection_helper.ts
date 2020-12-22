// system or lib import
import uuid_validate from "uuid-validate";
import stack_trace from "stack-trace";
import net from "net";
import lodash from "lodash";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// app import
import constant_helper from "./constant_helper";

import custom_generic_error from "../error/custom_generic_error";

import status_code_enum from "../enum/status_code_enum";
import status_message_enum from "../enum/status_message_enum";

import * as app_type from "../types/app_type";

class CollectionHelper {

	// validators
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_null_or_undefined(value: any): boolean {
		return (lodash.isNull(value) === true || lodash.isUndefined(value) === true);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_null_or_undefined(value: any): boolean {
		return !CollectionHelper.validate_is_null_or_undefined(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_number(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isNumber(value) === true;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_number(value: any): boolean {
		return !CollectionHelper.validate_is_number(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_boolean(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isBoolean(value) === true;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_boolean(value: any): boolean {
		return !CollectionHelper.validate_is_boolean(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_string(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isString(value) === true;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_string(value: any): boolean {
		return !CollectionHelper.validate_is_string(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_array(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isArray(value) === true;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_array(value: any): boolean {
		return !CollectionHelper.validate_is_array(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_object(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return (lodash.isObject(value) === true && lodash.isArray(value) === false);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_object(value: any): boolean {
		return !CollectionHelper.validate_is_object(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_function(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isFunction(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_function(value: any): boolean {
		return !CollectionHelper.validate_is_function(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_uuid_v4(value: any): boolean {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return uuid_validate(value, 4);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_uuid_v4(value: any): boolean {
		return !CollectionHelper.validate_is_uuid_v4(value);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_is_ip(value: string): boolean {
		if (CollectionHelper.validate_not_string(value) === true) return false;

		const version = net.isIP(value);
		if (version === 4 || version === 6) return true;
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static validate_not_ip(value: string): boolean {
		return !CollectionHelper.validate_is_ip(value);
	}

	// convertors
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static convert_to_isodatetime_utc_from_datetime(datetime: any): string {
		if (CollectionHelper.validate_is_null_or_undefined(datetime) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Datetime is not valid`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// custom
		if (moment.isDate(datetime) === false) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Datetime is not valid`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// get the offset
		if (moment(datetime).utcOffset() === 0) return moment.utc(datetime).toISOString();  // already in UTC, dont convert
		else return moment(datetime).utc().toISOString(); // not in UTC, convert
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static convert_to_moment_utc_from_datetime(datetime: any): app_type.MomentInstance {
		if (CollectionHelper.validate_is_null_or_undefined(datetime) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Datetime is not valid`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// custom
		if (moment.isDate(datetime) === false) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Datetime is not valid`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// safe convert to utc if not in utc
		const isodatetime_utc = CollectionHelper.convert_to_isodatetime_utc_from_datetime(datetime);
		return moment.utc(isodatetime_utc);
	}

	static convert_to_string_first_capital_from_any_string(value: string): string {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// check for type
		if (CollectionHelper.validate_not_string(value) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		return `${value[0].toUpperCase()}${value.substr(1)}`;
	}

	// TODO required as values can be anything
	// basically json.dumps or json.strigify
	// serialization (convert object -> string)
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_serialize_data(data: any, silent: boolean = false): string {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(data) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Data is not valid`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_is_null_or_undefined(silent) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			// custom
			if (CollectionHelper.validate_is_string(data) === true) return data;

			// check for type
			if (CollectionHelper.validate_not_boolean(silent) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_not_array(data) === true && CollectionHelper.validate_not_object(data) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Data is not valid`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			// TODO required as values can be anything
			// protecting from circular deps
			// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
			let cache: any = [];
			const strigified = JSON.stringify(data, (key, value) => {
				if (typeof value === "object" && value !== null && cache.indexOf(value) !== -1) return;
				else if (typeof value === "object" && value !== null) cache.push(value);
				return value;
			});

			// garbage collector
			cache = null;
			return strigified;
		} catch (error) {
			if (silent === true) return data;
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid operation, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack, status_code_enum.DATABASE_FAILURE));
		}
	}

	// TODO required as values can be anything
	// basically json.loads or json.parse
	// deserialization (convert string -> object)
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_deserialize_data(data: any, silent: boolean = false): app_type.ObjectAnyAttributes | app_type.ObjectAnyAttributes[] {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(data) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_is_null_or_undefined(silent) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			// custom
			if (CollectionHelper.validate_is_array(data) === true) return data;
			if (CollectionHelper.validate_is_object(data) === true) return data;

			// check for type
			if (CollectionHelper.validate_not_boolean(silent) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_not_string(data) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			return JSON.parse(data);
		} catch (error) {
			if (silent === true) return data;
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid operation, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack, status_code_enum.DATABASE_FAILURE));
		}
	}

	static process_key_join(value: string[], separator: string = "_"): string {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (CollectionHelper.validate_is_null_or_undefined(separator) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}


		// check for type
		if (CollectionHelper.validate_not_array(value) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (CollectionHelper.validate_not_string(separator) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		return value.join(separator);
	}

	static process_new_uuid(): string {
		return uuidv4();
	}

	static process_new_moment(): app_type.MomentInstance {
		return moment.utc();
	}

	static process_new_random(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static process_slugify(value: string): string {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// check for type
		if (CollectionHelper.validate_not_string(value) === true) {
			const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
			throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
		const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
		const p = new RegExp(a.split("").join("|"), "g");

		return value
			.toString()
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with -
			.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, "-and-") // Replace & with 'and'
			// eslint-disable-next-line no-useless-escape
			.replace(/[^\w\-]+/g, "") // Remove all non-word characters
			// eslint-disable-next-line no-useless-escape
			.replace(/\-\-+/g, "-") // Replace multiple - with single -
			.replace(/^-+/, "") // Trim - from start of text
			.replace(/-+$/, ""); // Trim - from end of text
	}

	// getters
	static get_lodash(): app_type.LodashInstance {
		return lodash;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_error_title(error: any): string {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(error) === true) return "";

			// custom
			if (CollectionHelper.validate_is_string(error)) return error;
			if ((error instanceof Error) === false) return String(error);

			const call_site = stack_trace.parse(error)[0];
			return `${(error as Error).name} : ${call_site.getFileName()} : ${call_site.getFunctionName()} : ${call_site.getLineNumber()}`;
		} catch (error) {
			return "";
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_error_message(error: any): string {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(error) === true) return "";

			// custom
			if (CollectionHelper.validate_is_string(error)) return error;
			if ((error instanceof Error) === false) return String(error);

			return (error as Error).message;
		} catch (error) {
			return "";
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_error_stack(error: any): string {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(error) === true) return "";

			// custom
			if (CollectionHelper.validate_is_string(error)) return error;
			if ((error instanceof Error) === false) return String(error);

			return (error as Error).stack || "";
		} catch (error) {
			return "";
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_error_info(artificial_error: any, actual_error: any = null): app_type.ErrorInfo {
		return {
			title: CollectionHelper.process_error_title(artificial_error),
			message: CollectionHelper.process_error_message(actual_error || artificial_error),
			stack: CollectionHelper.process_error_stack(actual_error || artificial_error)
		};
	}

	// helps in building the response and error passing around the app
	static process_pack_error(title: string = constant_helper.get_app_constant().APP_TITLE_INVALID_PAYLOAD, message: string = `${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`, stack: string = "", code: number = status_code_enum.BAD_REQUEST): string {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(title) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_is_null_or_undefined(message) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_is_null_or_undefined(stack) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_is_null_or_undefined(code) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			// check for type
			if (CollectionHelper.validate_not_string(title) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_not_string(message) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			if (CollectionHelper.validate_not_number(code) === true) {
				const error_info = CollectionHelper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Something went wrong`));
				throw new custom_generic_error(CollectionHelper.process_pack_error(error_info.title, error_info.message, error_info.stack));
			}

			// title is basically the file name along with line number
			return `${title} % ${message} % ${stack} % ${code}`;
		} catch (error) {
			return "";
		}
	}

}

export default CollectionHelper;