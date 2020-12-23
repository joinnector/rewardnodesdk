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
			throw new custom_generic_error("Unable to get security wrapper instance");
		}
		return this.security_wrapper;
	}
}

const security_wrapper = new SecurityWrapper();
export default security_wrapper;