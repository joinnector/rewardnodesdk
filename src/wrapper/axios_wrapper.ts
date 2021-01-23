// app import
import axios_client from "../client/axios_client";

import winston_wrapper from "./winston_wrapper";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import custom_generic_error from "../error/custom_generic_error";

class AxiosWrapper {
	axios_wrapper!: axios_client;

	init(key:string, secret: string, mode: string): void {
		this.prepare_common_wrapper(key, secret, mode);
	}

	prepare_common_wrapper(key:string, secret: string, mode: string): void {
		this.axios_wrapper = new axios_client(key, secret, mode);
		this.axios_wrapper.process_attach_winston(winston_wrapper.get_wrapper());

		// init
		this.axios_wrapper.init();
	}

	// getter
	get_wrapper(): axios_client {
		if (collection_helper.validate_is_null_or_undefined(this.axios_wrapper) === true) {
			throw new custom_generic_error("Unable to get http wrapper instance");
		}

		return this.axios_wrapper;
	}
}

const axios_wrapper = new AxiosWrapper();
export default axios_wrapper;