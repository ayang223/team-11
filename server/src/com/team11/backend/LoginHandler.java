package com.team11.backend;

import com.google.gson.JsonObject;
import com.team11.backend.DatabaseHandler;
import com.team11.backend.RequestHandler;
import com.team11.backend.LogEventHandler;

/**
 * This class handles all the logins
 */
public class LoginHandler {
	private static final String USER = "user";
	private static final String PASSWORD = "password";

	public LoginHandler() {

	}

	public static JsonObject loginUser(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(USER) || !requestJson.has(PASSWORD)) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		String user = requestJson.get(USER).getAsString();
		String password = requestJson.get(PASSWORD).getAsString();
		
		responseJson = DatabaseHandler.verifyUser(user, password);
		LogEventHandler.logLogin(user, responseJson.get("status").getAsString());
		return responseJson;
	}
}
