package com.team11.backend;

import com.google.gson.JsonObject;
import com.team11.backend.DatabaseHandler;

/**
 * This class manages all users. 
 */
public class UserManager {

	private static final String USER = "user";
	private static final String PASSWORD = "password";
	private static final String OLD_PASSWORD = "old_password";
	private static final String NEW_PASSWORD = "new_password";
	private static final String FIRST_NAME = "first_name";
	private static final String LAST_NAME = "last_name";
	private static final String ADMIN_PRIVILEGES = "admin_privileges";

	public UserManager() {

	}

	public static JsonObject changePassword(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(USER) || !requestJson.has(OLD_PASSWORD) || !requestJson.has(NEW_PASSWORD)) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		String user = requestJson.get(USER).getAsString();
		String newPassword = requestJson.get(NEW_PASSWORD).getAsString();
		
		boolean success = DatabaseHandler.changePassword(user, newPassword);
		responseJson = success ? RequestHandler.getStatusSuccess() : RequestHandler.getStatusFailed();
		return responseJson;
	}

	public static JsonObject createUser(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(USER) || !requestJson.has(PASSWORD) || !requestJson.has(FIRST_NAME) || !requestJson.has(LAST_NAME) || !requestJson.has(ADMIN_PRIVILEGES)) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		String user = requestJson.get(USER).getAsString();
		String password = requestJson.get(PASSWORD).getAsString();
		String firstName = requestJson.get(FIRST_NAME).getAsString();
		String lastName = requestJson.get(LAST_NAME).getAsString();
		boolean adminPrivileges = requestJson.get(ADMIN_PRIVILEGES).getAsBoolean();
		
		boolean success = DatabaseHandler.insertUser(user, password, firstName, lastName, adminPrivileges);
		responseJson = success ? RequestHandler.getStatusSuccess() : RequestHandler.getStatusFailed();
		return responseJson;
	}

	public static JsonObject deleteUser(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(USER)) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		String user = requestJson.get(USER).getAsString();
		if (user.toLowerCase().equals("main_admin")) {
			responseJson = RequestHandler.getStatusFailed();
			responseJson.addProperty("main_admin", true);
			return responseJson;
		}
		boolean success = DatabaseHandler.deleteUser(user);
		responseJson = success ? RequestHandler.getStatusSuccess() : RequestHandler.getStatusFailed();
		return responseJson;
	}

	public static JsonObject listUser(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		responseJson.add("Users", DatabaseHandler.getUsers());
		return responseJson;
	}
}
