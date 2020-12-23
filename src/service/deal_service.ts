import base_sdk_service from "./base_sdk_service";

import * as app_type from "../types/app_type";

class DealService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}

	async reward(payload: app_type.ObjectAnyAttributes): Promise<any> {
		return await super.create(payload, "reward");
	}
}

const deal_service = new DealService("deal");
export default deal_service;