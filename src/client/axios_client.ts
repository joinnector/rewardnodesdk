// system import
import axios from "axios";
import querystring from "querystring";

// app import
import collection_helper from "../helper/collection_helper";

import http_method_type_enum from "../enum/http_method_type_enum";

import custom_generic_error from "../error/custom_generic_error";

import * as app_type from "../types/app_type";

class AxiosClient {
	axios_instance!: app_type.AxiosClientInstance;
	winston_instance!: app_type.WinstonInstance;
	key!: string;
	secret!: string;
	notify_callback!: app_type.CallbackFunction;
	notify_callback_called: boolean;

	constructor(key: string, secret: string, notify_callback?: app_type.CallbackFunction) {
		this.key = key;
		this.secret = secret;
		this.notify_callback_called = false;
		if (collection_helper.validate_is_function(notify_callback) === true) this.notify_callback = notify_callback!;
	}

	init(): void {
		this.prepare_common_instance();
	}

	prepare_common_instance(): void {
		this.axios_instance = axios.create();
		this.axios_instance.defaults.timeout = 10000;

		if (collection_helper.validate_is_function(this.notify_callback) === true && this.notify_callback_called === false) {
			this.notify_callback_called = true;
			this.notify_callback(true);
		}
	}

	// process
	process_attach_winston(winston_instance: app_type.WinstonInstance): void {
		if (collection_helper.validate_is_null_or_undefined(winston_instance) === true) {
			throw new custom_generic_error("Unable to get logger instance");
		}

		this.winston_instance = winston_instance;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async process_axios_get(url: string, headers: app_type.AxiosHeader, params: app_type.ObjectAnyAttributes): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(this.axios_instance) === true) {
			throw new custom_generic_error("Unable to get http client instance");
		}

		if (collection_helper.validate_is_null_or_undefined(url) === true) {
			throw new custom_generic_error("Unable to get request url");
		}

		if (collection_helper.validate_is_null_or_undefined(headers) === true) {
			throw new custom_generic_error("Unable to get request headers");
		}

		// check for type
		if (collection_helper.validate_not_string(url) === true) {
			throw new custom_generic_error("Request url is not valid");
		}

		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else {
			throw new custom_generic_error("Request headers are not valid");
		}

		const axiosopts: app_type.AxiosClientRequestConfig = {
			method: http_method_type_enum.GET,
			url: url,
			headers: headers
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		return await this.axios_instance.request(axiosopts);
	}

	// TODO required as data can be anything
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async process_axios_put(url: string, headers: app_type.AxiosHeader, params: app_type.ObjectAnyAttributes, data: app_type.ObjectAnyAttributes): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(this.axios_instance) === true) {
			throw new custom_generic_error("Unable to get http client instance");
		}

		if (collection_helper.validate_is_null_or_undefined(url) === true) {
			throw new custom_generic_error("Unable to get request url");
		}

		if (collection_helper.validate_is_null_or_undefined(headers) === true) {
			throw new custom_generic_error("Unable to get request headers");
		}

		if (collection_helper.validate_is_null_or_undefined(data) === true) {
			throw new custom_generic_error("Unable to get request body");
		}

		// check for type
		if (collection_helper.validate_not_string(url) === true) {
			throw new custom_generic_error("Request url is not valid");
		}

		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else if (headers["content-type"] === "application/x-www-form-urlencoded") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/x-www-form-urlencoded" };
			data = querystring.stringify(data) as unknown as app_type.ObjectAnyAttributes;
		} else {
			throw new custom_generic_error("Request headers are not valid");
		}

		const axiosopts: app_type.AxiosClientRequestConfig = {
			method: http_method_type_enum.PUT,
			url: url,
			headers: headers,
			data: data
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		return await this.axios_instance.request(axiosopts);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async process_axios_delete(url: string, headers: app_type.AxiosHeader, params: app_type.ObjectAnyAttributes): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(this.axios_instance) === true) {
			throw new custom_generic_error("Unable to get http client instance");
		}

		if (collection_helper.validate_is_null_or_undefined(url) === true) {
			throw new custom_generic_error("Unable to get request url");
		}

		if (collection_helper.validate_is_null_or_undefined(headers) === true) {
			throw new custom_generic_error("Unable to get request headers");
		}

		// check for type
		if (collection_helper.validate_not_string(url) === true) {
			throw new custom_generic_error("Request url is not valid");
		}

		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else {
			throw new custom_generic_error("Request headers are not valid");
		}

		const axiosopts: app_type.AxiosClientRequestConfig = {
			method: http_method_type_enum.DELETE,
			url: url,
			headers: headers,
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		return await this.axios_instance.request(axiosopts);
	}

	// TODO required as data can be anything
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async process_axios_post(url: string, headers: app_type.AxiosHeader, params: app_type.ObjectAnyAttributes, data: app_type.ObjectAnyAttributes): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(this.axios_instance) === true) {
			throw new custom_generic_error("Unable to get http client instance");
		}

		if (collection_helper.validate_is_null_or_undefined(url) === true) {
			throw new custom_generic_error("Unable to get request url");
		}

		if (collection_helper.validate_is_null_or_undefined(headers) === true) {
			throw new custom_generic_error("Unable to get request headers");
		}

		if (collection_helper.validate_is_null_or_undefined(data) === true) {
			throw new custom_generic_error("Unable to get request body");
		}

		// check for type
		if (collection_helper.validate_not_string(url) === true) {
			throw new custom_generic_error("Request url is not valid");
		}

		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else if (headers["content-type"] === "application/x-www-form-urlencoded") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/x-www-form-urlencoded" };
			data = querystring.stringify(data) as unknown as app_type.ObjectAnyAttributes;
		} else {
			throw new custom_generic_error("Request headers are not valid");
		}

		const axiosopts: app_type.AxiosClientRequestConfig = {
			method: http_method_type_enum.POST,
			url: url,
			headers: headers,
			data: data
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		return await this.axios_instance.request(axiosopts);
	}
}

export default AxiosClient;