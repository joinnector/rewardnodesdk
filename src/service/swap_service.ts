import base_sdk_service from "./base_sdk_service";

class SwapService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const swap_service = new SwapService("swap");
export default swap_service;