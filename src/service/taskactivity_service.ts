import base_sdk_service from "./base_sdk_service";

class TaskActivityService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const taskactivity_service = new TaskActivityService("taskactivity");
export default taskactivity_service;