// app import
import axios_client from "../client/axios_client";

import winston_wrapper from "./winston_wrapper";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import custom_generic_error from "../error/custom_generic_error";

class AxiosWrapper {
	axios_wrapper!: axios_client;

	init(): void {
		this.prepare_common_wrapper();
	}

	prepare_common_wrapper(): void {
		this.axios_wrapper = new axios_client();
		this.axios_wrapper.process_attach_winston(winston_wrapper.get_wrapper());

		// init
		this.axios_wrapper.init();
	}

	// getter
	get_wrapper(): axios_client {
		if (collection_helper.validate_is_null_or_undefined(this.axios_wrapper) === true) {
			const error_info = collection_helper.process_error_info(new Error(`${constant_helper.get_app_constant().APP_CUSTOM_TEXT_IDENTIFIER} Invalid payload, Wrapper is not valid`));
			throw new custom_generic_error(collection_helper.process_pack_error(error_info.title, error_info.message, error_info.stack));
		}

		return this.axios_wrapper;
	}
}

const axios_wrapper = new AxiosWrapper();
export default axios_wrapper;