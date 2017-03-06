package com.team11.backend;

import java.util.ArrayList;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.team11.backend.DatabaseHandler;
/**
 * This class contains all dashboard logic
 */
public class DashboardLogic {
	public DashboardLogic() {

	}

	public static JsonObject getDashboard(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		responseJson = generateDashboardData();
		return responseJson;
	}

	private static JsonObject generateDashboardData() {
		JsonObject dashboardJson = new JsonObject();
		dashboardJson.add("Program", DatabaseHandler.getProgram());
		dashboardJson.add("Location", DatabaseHandler.getLocation());
		dashboardJson.add("Agency", DatabaseHandler.getAgency());
		dashboardJson.add("InventoryOutput", DatabaseHandler.getInventoryOutput());
		dashboardJson.add("Target Population", DatabaseHandler.getTargetPopulation());
		dashboardJson.add("Program Element", DatabaseHandler.getProgramElement());
		dashboardJson.add("Program SubElement", DatabaseHandler.getProgramSubElement());
		dashboardJson.add("Element Directory", DatabaseHandler.getElementDirectory());
		dashboardJson.add("Geo Area", DatabaseHandler.getGeoArea());
		dashboardJson.add("Municipality", DatabaseHandler.getMunicipality());
		dashboardJson.add("Area Directory", DatabaseHandler.getAreaDirectory());
		dashboardJson.add("Donor Engagement", DatabaseHandler.getDonorEngagement());
		dashboardJson.add("Outputs", DatabaseHandler.getOutputs());
		return dashboardJson;
	}

	public static JsonObject importOutput(JsonObject requestJson) {
		
		JsonArray arrayJson = requestJson.getAsJsonArray();
		JsonObject itemJson = new JsonObject();
				
		// Store column headers into an array list
		// JSON range for InventoryOutput array elements: FIELD 1-158
		ArrayList<String> headers = new ArrayList<String>();
		itemJson = arrayJson.get(0).getAsJsonObject();
		
		for (int column = 1; column <= arrayJson.get(0).getAsJsonArray().size(); column++) {
			String field = "FIELD" + Integer.toString(column);
			String fieldHeader = itemJson.get(field).getAsString();
			headers.add(fieldHeader);
		}
		
		// Data extraction and query insertion
		// Data starts at index 1 of arrayJson
		for (int i = 1; i < arrayJson.size(); i++) {
			itemJson = arrayJson.get(i).getAsJsonObject();
			
			// Get InventoryOutput table data
			String funds = itemJson.get("FIELD1").getAsString();
			String focus = itemJson.get("FIELD2").getAsString();
			String outcome = itemJson.get("FIELD3").getAsString();
			String funding = itemJson.get("FIELD4").getAsString();
			int programAndar = itemJson.get("FIELD7").getAsInt();
			int yearlyAllocation = itemJson.get("FIELD9").getAsInt();
			String grantStart = itemJson.get("FIELD10").getAsString(); 
			String grantEnd = itemJson.get("FIELD11").getAsString();
			String description = itemJson.get("FIELD12").getAsString();
			String planner = itemJson.get("FIELD13").getAsString();
			
			// Fixes any formatting for InventoryOutput variables
			grantStart = grantStart.substring(0,4) + "-" + grantStart.substring(4,6) + "-" + grantStart.substring(6,8);
			grantEnd = grantEnd.substring(0,4) + "-" + grantEnd.substring(4,6) + "-" + grantEnd.substring(6,8);
			
			DatabaseHandler.insertInventoryOutput(funds, focus, outcome, funding, programAndar,yearlyAllocation, grantStart, grantEnd, description, planner);
			
			// Variable to help check what data we're looking at
			// First data category starts at FIELD14
			String dataCategory = "";
			String fieldName;
			String temp;
			int fieldNum = 14;
			
			dataCategory = checkCategory(headers, fieldNum, dataCategory);
			fieldNum++;
			
			// NOTE: This procedure must match the csv column ordering
			// Get variables and inserts into "Target Population" table
			while (dataCategory.equals("Target Population")) {
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsString();
				
				if (temp.equals("1")) {
					String populationItem = headers.get(fieldNum);
					DatabaseHandler.insertTargetPopulation(programAndar, populationItem);
				}
				
				fieldNum++;
				dataCategory = checkCategory(headers, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Program Element" and "Program SubElement" tables
			while (dataCategory.equals("Program Elements")) {
				// Stores program element
				String programCategory = "";
				programCategory = checkProgram(headers, fieldNum, programCategory);
				fieldName = "FIELD" + Integer.toString(fieldNum);
				int level = itemJson.get(fieldName).getAsInt();
				
				DatabaseHandler.insertProgramElement(programAndar, programCategory, level);
				fieldNum++;
				
				// Stores subelement values
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsString();
				
				while (!temp.equals("100") && !temp.equals("200") && !temp.equals("300") && dataCategory.equals("Program Elements")){
					DatabaseHandler.insertProgramSubElement(programAndar, temp);
					
					fieldNum++;
					
					fieldName = "FIELD" + Integer.toString(fieldNum);
					temp = itemJson.get(fieldName).getAsString();
					
					dataCategory = checkCategory(headers, fieldNum, dataCategory);
				}
			}
			fieldNum++;
			
			// Get variables and inserts into "Geo Area" and "Muncipality" tables
			while (dataCategory.equals("Geographic Focus Area")) {
				String geoArea = "";
				geoArea = checkGeoArea(headers, fieldNum, geoArea);
				String currArea = geoArea;
				
				fieldName = "FIELD" + Integer.toString(fieldNum);
				int level = itemJson.get(fieldName).getAsInt();
				
				fieldNum++;
				
				DatabaseHandler.insertGeoArea(programAndar, geoArea, level);
				
				while (currArea.equals(geoArea) && dataCategory.equals("Geographic Focus Area")){
					String muncipality = headers.get(fieldNum-1);
					int focusPercent = itemJson.get(fieldName).getAsInt();
					
					DatabaseHandler.insertMuncipality(programAndar, muncipality, focusPercent);
					
					fieldNum++;
					geoArea = checkGeoArea(headers, fieldNum, currArea);
					dataCategory = checkCategory(headers, fieldNum, dataCategory);
				} 
			}
			fieldNum++;
			
			// Get variables and inserts into "Donor Engagement" table
			while (dataCategory.equals("Donor Engagement")) {
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsString();
				
				if (temp.equals("1")) {
					String donorEngagement = headers.get(fieldNum);
					DatabaseHandler.insertDonorEngagement(programAndar, donorEngagement, temp);
				}
				
				fieldNum++;
				dataCategory = checkCategory(headers, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Outputs" table
			while (dataCategory.equals("Outputs") && fieldNum <= headers.size()) {
				fieldName = "FIELD" + Integer.toString(fieldNum);
				String value = itemJson.get(fieldName).getAsString();
				
				if (!value.equals("")) {
					String donorEngagement = headers.get(fieldNum);
					DatabaseHandler.insertOutput(programAndar, donorEngagement, Integer.parseInt(value));
				}
				
				dataCategory = checkCategory(headers, fieldNum, dataCategory);
			}
		}
		
		JsonObject responseJson = RequestHandler.getStatusSuccess();
		return responseJson;
	}

	public static JsonObject importPrograms(JsonObject requestJson) {

		// Parse the request JSON data and insert into database with
		// queries in DatabaseHandler
		// JSON range for Postal codes: FIELD 1-?

		JsonArray arrayJson = requestJson.getAsJsonArray();
		JsonObject itemJson = new JsonObject();

		String fieldName;

		for (int row = 1; row <= arrayJson.size(); row++) {
			itemJson = arrayJson.get(row).getAsJsonObject();

			int agencyAndar = itemJson.get("FIELD1").getAsInt();
			String agencyName = itemJson.get("FIELD2").getAsString();
			int programAndar = itemJson.get("FIELD3").getAsInt();
			String programName = itemJson.get("FIELD4").getAsString();
			String website = itemJson.get("FIELD5").getAsString();
			String description = itemJson.get("FIELD6").getAsString();

			int numLocations = 0;

			for (int column = 7; column <= arrayJson.get(row).getAsJsonArray().size(); column = column + 2) {
				fieldName = "FIELD" + Integer.toString(column);
				String locationName = itemJson.get(fieldName).getAsString();
				fieldName = "FIELD" + Integer.toString(column + 1);
				String locationPostal = itemJson.get(fieldName).getAsString();

				if (!locationName.equals("") || !locationPostal.equals("")) {
					numLocations++;
				}
			}

			// These query have to happen before the location queries
			DatabaseHandler.insertProgram(programAndar, agencyAndar, programName, website, description, numLocations);
			// Why do we need a main postal???
			DatabaseHandler.insertAgency(agencyAndar, agencyName);

			for (int column = 7; column <= arrayJson.get(row).getAsJsonArray().size(); column = column + 2) {
				fieldName = "FIELD" + Integer.toString(column);
				String locationName = itemJson.get(fieldName).getAsString();
				fieldName = "FIELD" + Integer.toString(column + 1);
				String locationPostal = itemJson.get(fieldName).getAsString();

				if (!locationName.equals("") || !locationPostal.equals("")) {
					DatabaseHandler.insertLocation(programAndar, locationName, locationPostal);
				}
			}
		}
		
		JsonObject responseJson = RequestHandler.getStatusSuccess();
		return responseJson;
	}

	// Checks categories
	private static String checkCategory(ArrayList<String> headers, int fieldNum, String currCategory) {

		String newCategory = headers.get(fieldNum-1);
		
		if (currCategory.equals(newCategory)) {
			return currCategory;
		} else {
			switch (newCategory) {
			case "Target Population":
			case "Information and Referral":
			case "Program Elements":
			case "Geographic Focus Area":
			case "Donor Engagement":
			case "Outputs":
				return newCategory;
			default:
				return currCategory;
			}
		}
	}

	private static String checkProgram(ArrayList<String> headers, int fieldNum, String currArea) {

		String newArea = headers.get(fieldNum-1);
		if (currArea.equals(newArea)) {
			return currArea;
		} else {
			switch (currArea) {
			case "Learning Support ":
			case "Social and Emotional Health ":
			case "Connections/Healthy Relationships":
			case "Physical Health and Recreational Activities":
			case "Life Skills":
			case "System Change":
			case "Address Program Barriers/Access":
			case "Food Redistribution":
			case "Information and Referral":
				return newArea;
			default:
				return currArea;
			}
		}
	}

	private static String checkGeoArea(ArrayList<String> headers, int fieldNum, String currElement) {

		String newElement = headers.get(fieldNum-1);
		
		if (currElement.equals(newElement)) {
			return currElement;
		} else {
			switch (currElement) {
			case "First Nation Territories":
			case "Fraser Valley Regional District":
			case "Metro Vancouver Regional District":
			case "Squamish-Lillooet Regional District":
			case "Sunshine Coast Regional District":
			case "Other Areas":
				return newElement;
			default:
				return currElement;
			}
		}
	}
}
