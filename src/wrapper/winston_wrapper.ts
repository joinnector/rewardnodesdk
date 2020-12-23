// app import
import winston_client from "../client/winston_client";

import security_wrapper from "./security_wrapper";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import custom_generic_error from "../error/custom_generic_error";

class WinstonWrapper {
	winston_wrapper!: winston_client;

	init(): void {
		this.prepare_common_wrapper();
	}

	prepare_common_wrapper(): void {
		this.winston_wrapper = new winston_client();
		this.winston_wrapper.process_attach_security(security_wrapper.get_wrapper());

		// init
		this.winston_wrapper.init();
	}

	// getter
	get_wrapper(): winston_client {
		if (collection_helper.validate_is_null_or_undefined(this.winston_wrapper) === true) {
			throw new custom_generic_error("Unable to get logger wrapper instance");
		}
		
		return this.winston_wrapper;
	}
}

const winston_wrapper = new WinstonWrapper();
export default winston_wrapper;