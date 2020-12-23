import base_sdk_service from "./base_sdk_service";

class WalletTransactionService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const wallettransaction_service = new WalletTransactionService("wallettransaction");
export default wallettransaction_service;