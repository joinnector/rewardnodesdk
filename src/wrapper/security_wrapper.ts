// app import
import security_client from "../client/security_client";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import custom_generic_error from "../error/custom_generic_error";

class SecurityWrapper {
	security_wrapper!: security_client;

	init(): void {
		this.prepare_common_wrapper();
	}

	prepare_common_wrapper(): void {
		this.security_wrapper = new security_client();

		// init
		this.security_wrapper.init();
	}

	// getter
	get_wrapper(): security_client {
		if (collection_helper.validate_is_null_or_undefined(this.security_wrapper) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Wrapper is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}
		return this.security_wrapper;
	}
}

const security_wrapper = new SecurityWrapper();
export default security_wrapper;