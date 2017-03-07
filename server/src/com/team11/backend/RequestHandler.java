package com.team11.backend;

import com.google.gson.JsonObject;
import com.team11.backend.DashboardLogic;
import com.team11.backend.LoginHandler;
import com.team11.backend.UserManager;

/**
 * This class takes a request and does the required actions
 */
public class RequestHandler {

	private static final String ACTION = "action";
	private static final String CHANGE_PASSWORD = "Change Password";
	private static final String CREATE_USER = "Create User";
	private static final String DELETE_USER = "Delete User";
	private static final String GET_DASHBOARD = "Get Dashboard";
	private static final String IMPORT_DATA = "Import Data";
	private static final String LIST_USER = "List User";
	private static final String LOGIN_USER = "Login User";

	public RequestHandler() {

	}

	public static JsonObject handleRequest(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(ACTION)) {
			responseJson = getStatusFailed();
			return responseJson;
		}
		String action = requestJson.get(ACTION).getAsString();
		switch (action) {
		case CHANGE_PASSWORD:
			responseJson = UserManager.changePassword(requestJson);
			break;
		case CREATE_USER:
			responseJson = UserManager.createUser(requestJson);
			break;
		case DELETE_USER:
			responseJson = UserManager.deleteUser(requestJson);
			break;
		case GET_DASHBOARD:
			responseJson = DashboardLogic.getDashboard(requestJson);
			break;
		case IMPORT_DATA:
			responseJson = DashboardLogic.importOutput(requestJson);
			break;
		case LIST_USER:
			responseJson = UserManager.listUser(requestJson);
			break;
		case LOGIN_USER:
			responseJson = LoginHandler.loginUser(requestJson);
			break;
		default:
			responseJson = getStatusFailed();
			break;
		}

		return responseJson;
	}

	public static JsonObject getStatusSuccess() {
		JsonObject statusSuccess = new JsonObject();
		statusSuccess.addProperty("status", "success");
		return statusSuccess;
	}

	public static JsonObject getStatusFailed() {
		JsonObject statusFailed = new JsonObject();
		statusFailed.addProperty("status", "failed");
		return statusFailed;
	}

}
