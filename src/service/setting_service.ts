import base_sdk_service from "./base_sdk_service";

class SettingService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const setting_service = new SettingService("setting");
export default setting_service;