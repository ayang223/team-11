package com.team11.backend;

import java.text.SimpleDateFormat;

import com.google.gson.JsonObject;
import com.team11.backend.DatabaseHandler;

/**
 * This class handles all the logging for monitoring
 */
public class LogEventHandler {

	public LogEventHandler() {

	}

	public static boolean logLogin(String username, String status) {
		boolean logSuccess = true;

		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
		if (status.equals("success")) {
			logSuccess = DatabaseHandler.insertLogEvent(username, "Login User Success", timeStamp);
		} else if (status.equals("failed")) {
			logSuccess = DatabaseHandler.insertLogEvent(username, "Login User Failed", timeStamp);
		}
		return logSuccess;
	}
	
	public static boolean logChangePassword(String username, boolean success) {
		boolean logSuccess = true;

		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
		if (success) {
			logSuccess = DatabaseHandler.insertLogEvent(username, "Change Password Success", timeStamp);
		} else {
			logSuccess = DatabaseHandler.insertLogEvent(username, "Change Password Failed", timeStamp);
		}
		return logSuccess;
	}

	public static JsonObject logFilter(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has("user") || !requestJson.has("filters")) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		String user = requestJson.get("user").getAsString();
		String filters = requestJson.get("filters").getAsString();

		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
		boolean success = DatabaseHandler.insertLogEvent(user, "Filter: " + filters, timeStamp);
		responseJson = success ? RequestHandler.getStatusSuccess() : RequestHandler.getStatusFailed();
		return responseJson;
	}
}
