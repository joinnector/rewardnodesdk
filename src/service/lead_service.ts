import base_sdk_service from "./base_sdk_service";

class LeadService extends base_sdk_service {
	constructor(name: string) {
		super(name);
	}

	async get_by_email(email: string, swap_id: string = null as unknown as string): Promise<any> {
		return await super.get_by("email", email, swap_id);
	}

	async get_by_mobile(mobile: string, swap_id: string = null as unknown as string): Promise<any> {
		return await super.get_by("mobile", mobile, swap_id);
	}
}

const lead_service = new LeadService("lead");
export default lead_service;