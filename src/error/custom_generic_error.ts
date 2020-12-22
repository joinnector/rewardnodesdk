import custom_error from "./custom_error";

class CustomGenericError extends custom_error {
	constructor(message: string) {
		super(message);

		this.name = this.constructor.name;
		this.message = message;
	}

	// getters
	get_name(): string {
		return this.name;
	}

	get_message(): string {
		return this.message;
	}
}

export default CustomGenericError;