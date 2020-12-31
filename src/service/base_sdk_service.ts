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

		if (apimapopts[action].has_authorization) headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		if (apimapopts[action].has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(collection_helper.process_serialize_data(attributes), axios_wrapper.get_wrapper().secret);

		return await axios_wrapper.get_wrapper().process_axios_post(url, headers as app_type.AxiosHeader, params, attributes);
	}

	async get(id: string | null = null, action: string = "get"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(id) === true) {
			throw new custom_generic_error("Id is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "");
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = { id: id };

		if (apimapopts[action].has_authorization) headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");

		return await axios_wrapper.get_wrapper().process_axios_get(url, headers as app_type.AxiosHeader, params);
	}

	async get_by(by_key: string, by_value: string, action: string = "get"): Promise<any> {
		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		let url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "");
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = { id: collection_helper.process_new_uuid() };

		url = `${url}?${by_key}=${by_value}`;

		if (apimapopts[action].has_authorization) headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
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

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "");
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = { id: id };
		const attributes = payload;

		if (apimapopts[action].has_authorization) headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");
		if (apimapopts[action].has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(collection_helper.process_serialize_data(attributes), axios_wrapper.get_wrapper().secret);

		return await axios_wrapper.get_wrapper().process_axios_put(url, headers as app_type.AxiosHeader, params, attributes);
	}

	async delete(id: string | null = null, action: string = "delete"): Promise<any> {
		if (collection_helper.validate_is_null_or_undefined(id) === true) {
			throw new custom_generic_error("Id is not valid");
		}

		const apimapopts = constant_helper.get_setting_constant().API_MAP[this.name] as app_type.ObjectAnyAttributes;
		if (collection_helper.validate_is_null_or_undefined(apimapopts[action]) === true) {
			throw new custom_generic_error("Unable to find method name");
		}

		const url = collection_helper.process_key_join([constant_helper.get_setting_constant().API_BASE_URL, apimapopts[action].prefix, apimapopts[action].endpoint], "");
		const headers = constant_helper.get_setting_constant().API_BASE_HEADER;
		const params = { id: id };

		if (apimapopts[action].has_authorization) headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");

		return await axios_wrapper.get_wrapper().process_axios_delete(url, headers as app_type.AxiosHeader, params);
	}

	async list(filter: app_type.ObjectAnyAttributes, paging: app_type.PagingAttributes = { page: 1, limit: 20 }, action: string = "list"): Promise<any> {
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

		if (apimapopts[action].has_authorization) headers.authorization = "Basic " + Buffer.from(axios_wrapper.get_wrapper().key + ":" + axios_wrapper.get_wrapper().secret, "utf8").toString("base64");

		return await axios_wrapper.get_wrapper().process_axios_get(url, headers as app_type.AxiosHeader, params);
	}
}

export default BaseSDKService;