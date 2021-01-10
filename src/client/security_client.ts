// system import
import crypto from "crypto";
import querystring from "querystring";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import custom_generic_error from "../error/custom_generic_error";

import * as app_type from "../types/app_type";

class SecurityClient {
	notify_callback!: app_type.CallbackFunction;
	notify_callback_called: boolean;

	constructor(notify_callback?: app_type.CallbackFunction) {
		this.notify_callback_called = false;
		if (collection_helper.validate_is_function(notify_callback) === true) this.notify_callback = notify_callback!;
	}

	init(): void {
		this.prepare_common_instance();
	}

	prepare_common_instance(): void {
		if (collection_helper.validate_is_function(this.notify_callback) === true && this.notify_callback_called === false) {
			this.notify_callback_called = true;
			this.notify_callback(true);
		}
	}

	process_hmac_signature(value: app_type.ObjectAnyAttributes, password: string): string {
		if (collection_helper.validate_is_null_or_undefined(value) === true) {
			throw new custom_generic_error("Value is not valid");
		}

		if (collection_helper.validate_is_null_or_undefined(password) === true) {
			throw new custom_generic_error("Password is not valid");
		}

		// check for type
		if (collection_helper.validate_not_string(value) === true) {
			throw new custom_generic_error("Value is not valid");
		}

		if (collection_helper.validate_not_string(password) === true) {
			throw new custom_generic_error("Password is not valid");
		}

		const hmac_alog = constant_helper.get_setting_constant().HMAC_ALGO as string;

		// eslint-disable-next-line no-useless-escape
		return crypto.createHmac(hmac_alog, password).update(querystring.stringify(value).split("").sort().join("")).digest("hex");
	}
}

export default SecurityClient;