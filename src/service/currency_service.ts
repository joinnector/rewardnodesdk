import base_sdk_service from "./base_sdk_service";

class CurrencyService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const currency_service = new CurrencyService("currency");
export default currency_service;