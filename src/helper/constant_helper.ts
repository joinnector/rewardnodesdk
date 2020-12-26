// app import
import * as setting_constant_helper from "./sub_constant_helper/setting_constant_helper";

class ConstantHelper {
	// getters
	static get_setting_constant(): typeof setting_constant_helper {
		return setting_constant_helper;
	}
}

export default ConstantHelper;
