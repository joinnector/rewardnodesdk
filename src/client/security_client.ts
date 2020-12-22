// system import
import basic_auth from "basic-auth";
import crypto from "crypto";

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

	process_basic_auth_unpack(value: string): app_type.SecurityBasicAuthObject {
		if (collection_helper.validate_is_null_or_undefined(value) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// check for type
		if (collection_helper.validate_not_string(value) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		return basic_auth.parse(value) as app_type.SecurityBasicAuthObject;
	}

	process_hmac_signature(value: string, password: string): string {
		if (collection_helper.validate_is_null_or_undefined(value) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (collection_helper.validate_is_null_or_undefined(password) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Salt is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// check for type
		if (collection_helper.validate_not_string(value) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		if (collection_helper.validate_not_string(password) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Salt is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		const hmac_alog = constant_helper.get_setting_constant().HMAC_ALGO as string;

		return crypto.createHmac(hmac_alog, password).update(value).digest("hex");
	}

	process_sha256_hash(value: string): string {
		if (collection_helper.validate_is_null_or_undefined(value) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		// check for type
		if (collection_helper.validate_not_string(value) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Value is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		const hash_alog = constant_helper.get_setting_constant().HASH_ALGO as string;

		return crypto.createHash(hash_alog).update(value).digest("hex");
	}
}

export default SecurityClient;