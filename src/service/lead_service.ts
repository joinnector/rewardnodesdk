import base_sdk_service from "./base_sdk_service";

class LeadService extends base_sdk_service {
	constructor(name: string) {
		super(name);
	}

	async get_by_email(value: string): Promise<any> {
		return await super.get_by("email", value);
	}

	async get_by_mobile(value: string): Promise<any> {
		return await super.get_by("mobile", value);
	}
}

const lead_service = new LeadService("lead");
export default lead_service;