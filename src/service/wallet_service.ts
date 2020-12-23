import base_sdk_service from "./base_sdk_service";

class WalletService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const wallet_service = new WalletService("wallet");
export default wallet_service;