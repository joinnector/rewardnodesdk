// system or lib import
import uuid_validate from "uuid-validate";
import net from "net";
import lodash from "lodash";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// app import
import custom_generic_error from "../error/custom_generic_error";

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
			throw new custom_generic_error("Datetime is not valid");
		}

		// custom
		if (moment.isDate(datetime) === false) {
			throw new custom_generic_error("Datetime is not valid");
		}

		// get the offset
		if (moment(datetime).utcOffset() === 0) return moment.utc(datetime).toISOString();  // already in UTC, dont convert
		else return moment(datetime).utc().toISOString(); // not in UTC, convert
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static convert_to_moment_utc_from_datetime(datetime: any): app_type.MomentInstance {
		if (CollectionHelper.validate_is_null_or_undefined(datetime) === true) {
			throw new custom_generic_error("Datetime is not valid");
		}

		// custom
		if (moment.isDate(datetime) === false) {
			throw new custom_generic_error("Datetime is not valid");
		}

		// safe convert to utc if not in utc
		const isodatetime_utc = CollectionHelper.convert_to_isodatetime_utc_from_datetime(datetime);
		return moment.utc(isodatetime_utc);
	}

	static convert_to_string_first_capital_from_any_string(value: string): string {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) {
			throw new custom_generic_error("Value is not valid");
		}

		// check for type
		if (CollectionHelper.validate_not_string(value) === true) {
			throw new custom_generic_error("Value is not valid");
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
				throw new custom_generic_error("Data is not valid");
			}

			if (CollectionHelper.validate_is_null_or_undefined(silent) === true) {
				throw new custom_generic_error("Silent is not valid");
			}

			// custom
			if (CollectionHelper.validate_is_string(data) === true) return data;

			// check for type
			if (CollectionHelper.validate_not_boolean(silent) === true) {
				throw new custom_generic_error("Silent is not valid");
			}

			if (CollectionHelper.validate_not_array(data) === true && CollectionHelper.validate_not_object(data) === true) {
				throw new custom_generic_error("Data is not valid");
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
			throw new custom_generic_error("Data serialization failed");
		}
	}

	// TODO required as values can be anything
	// basically json.loads or json.parse
	// deserialization (convert string -> object)
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static process_deserialize_data(data: any, silent: boolean = false): app_type.ObjectAnyAttributes | app_type.ObjectAnyAttributes[] {
		try {
			if (CollectionHelper.validate_is_null_or_undefined(data) === true) {
				throw new custom_generic_error("Data is not valid");
			}

			if (CollectionHelper.validate_is_null_or_undefined(silent) === true) {
				throw new custom_generic_error("Silent is not valid");
			}

			// custom
			if (CollectionHelper.validate_is_array(data) === true) return data;
			if (CollectionHelper.validate_is_object(data) === true) return data;

			// check for type
			if (CollectionHelper.validate_not_boolean(silent) === true) {
				throw new custom_generic_error("Silent is not valid");
			}

			if (CollectionHelper.validate_not_string(data) === true) {
				throw new custom_generic_error("Data is not valid");
			}

			return JSON.parse(data);
		} catch (error) {
			if (silent === true) return data;
			throw new custom_generic_error("Data deserialization failed");
		}
	}

	static process_key_join(value: string[], separator: string = "_"): string {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) {
			throw new custom_generic_error("Value is not valid");
		}

		if (CollectionHelper.validate_is_null_or_undefined(separator) === true) {
			throw new custom_generic_error("Seperator is not valid");
		}


		// check for type
		if (CollectionHelper.validate_not_array(value) === true) {
			throw new custom_generic_error("Value is not valid");
		}

		if (CollectionHelper.validate_not_string(separator) === true) {
			throw new custom_generic_error("Seperator is not valid");
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
			throw new custom_generic_error("Seperator is not valid");
		}

		// check for type
		if (CollectionHelper.validate_not_string(value) === true) {
			throw new custom_generic_error("Seperator is not valid");
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
}

export default CollectionHelper;