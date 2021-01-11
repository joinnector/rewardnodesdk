import custom_generic_error from "../error/custom_generic_error";
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";
import * as app_type from "../types/app_type";
import axios_wrapper from "../wrapper/axios_wrapper";
import security_wrapper from "../wrapper/security_wrapper";




class BaseSDKService {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	async create(payload: app_type.ObjectAnyAttributes, action: string = "create"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(payload) === true) {
			throw new custom_generic_error("Payload is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "");
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = {};
		const attributes = payload;

		headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		headers["x-apikey"] = axios_wrapper.get_wrapper().key;
		// if (apimapopts[action].has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(attributes, axios_wrapper.get_wrapper().secret);

		return await axios_wrapper.get_wrapper().process_axios_post(url, headers as app_type.AxiosHeader, params, attributes);
	}

	async get(id: string, action: string = "get"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(id) === true) {
			throw new custom_generic_error("Id is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "").replace("{id}", id);
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;

		headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		headers["x-apikey"] = axios_wrapper.get_wrapper().key;

		return await axios_wrapper.get_wrapper().process_axios_get(url, headers as app_type.AxiosHeader, {});
	}

	async get_by(by_key: string, by_value: string, swap_id: string = null as unknown as string, action: string = "get"): Promise<any> {
		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "").replace("{id}", collection_helper.process_new_uuid());
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = { [by_key]: by_value};

		if (swap_id) params.swap_id = swap_id;

		headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		headers["x-apikey"] = axios_wrapper.get_wrapper().key;
		headers["content-type"] = "application/x-www-form-urlencoded";

		return await axios_wrapper.get_wrapper().process_axios_get(url, headers as app_type.AxiosHeader, params);
	}

	async save(id: string, payload: app_type.ObjectAnyAttributes, action: string = "save"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(id) === true) {
			throw new custom_generic_error("Id is not valid");
		}

		if (collection_helper.validate_is_null_or_undefined(payload) === true) {
			throw new custom_generic_error("Payload is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "").replace("{id}", id);
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const attributes = payload;

		headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		headers["x-apikey"] = axios_wrapper.get_wrapper().key;
		// if (apimapopts[action].has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(attributes, axios_wrapper.get_wrapper().secret);

		return await axios_wrapper.get_wrapper().process_axios_put(url, headers as app_type.AxiosHeader, {}, attributes);
	}

	async delete(id: string, action: string = "delete"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(id) === true) {
			throw new custom_generic_error("Id is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "").replace("{id}", id);
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		
		headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		headers["x-apikey"] = axios_wrapper.get_wrapper().key;

		return await axios_wrapper.get_wrapper().process_axios_delete(url, headers as app_type.AxiosHeader, {});
	}

	async fetch(filter: app_type.ObjectAnyAttributes = {}, paging: app_type.PagingAttributes = { page: 1, limit: 20 }, action: string = "fetch"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(filter) === true) {
			throw new custom_generic_error("Filter is not valid");
		}

		if (collection_helper.validate_is_null_or_undefined(paging) === true) {
			throw new custom_generic_error("Paging is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "");
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = { ...filter, ...paging };

		headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		headers["x-apikey"] = axios_wrapper.get_wrapper().key;

		return await axios_wrapper.get_wrapper().process_axios_get(url, headers as app_type.AxiosHeader, params);
	}
}

export default BaseSDKService;