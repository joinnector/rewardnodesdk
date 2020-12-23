import base_sdk_service from "./base_sdk_service";

class LeadService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const lead_service = new LeadService("lead");
export default lead_service;