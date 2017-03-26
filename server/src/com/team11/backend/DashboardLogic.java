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
		dashboardJson.add("AndarDataOutput", DatabaseHandler.getInventoryOutput());
		dashboardJson.add("TargetPopulation", DatabaseHandler.getTargetPopulation());
		dashboardJson.add("ProgramElement", DatabaseHandler.getProgramElement());
		dashboardJson.add("ProgramSubElement", DatabaseHandler.getProgramSubElement());
		dashboardJson.add("GeoArea", DatabaseHandler.getGeoArea());
		dashboardJson.add("Municipality", DatabaseHandler.getMunicipality());
		dashboardJson.add("AreaDirectory", DatabaseHandler.getAreaDirectory());
		dashboardJson.add("DonorEngagement", DatabaseHandler.getDonorEngagement());
		dashboardJson.add("Outputs", DatabaseHandler.getOutputs());
		return dashboardJson;
	}

	public static JsonObject importOutput(JsonObject requestJson) {
		boolean success = true;
		JsonArray arrayJson = requestJson.get("data").getAsJsonArray();
		JsonArray itemJson = new JsonArray();
				
		// Store column headers into an array list
		// JSON range for InventoryOutput array elements: FIELD 1-158
		ArrayList<String> headers = new ArrayList<String>();
		itemJson = arrayJson.get(0).getAsJsonArray();
		
		for (int column = 0; column < itemJson.size(); column++) {
			String fieldHeader = itemJson.get(column).getAsString();
			headers.add(fieldHeader);
		}
		
		// Data extraction and query insertion
		// Data starts at index 1 of arrayJson
		for (int i = 1; i < arrayJson.size()-1; i++) {
			itemJson = arrayJson.get(i).getAsJsonArray();
			
			// Get InventoryOutput table data
			String funds = itemJson.get(0).getAsString();
			String focus = itemJson.get(1).getAsString();
			String outcome = itemJson.get(2).getAsString();
			String funding = itemJson.get(3).getAsString();
			int programAndar = itemJson.get(6).getAsInt();
			float yearlyAllocation = itemJson.get(8).getAsFloat();
			String grantStart = itemJson.get(9).getAsString(); 
			String grantEnd = itemJson.get(10).getAsString();
			String description = itemJson.get(11).getAsString();
			String planner = itemJson.get(12).getAsString();
			
			// Fixes any formatting for InventoryOutput variables
			grantStart = grantStart.substring(0,4) + "-" + grantStart.substring(4,6) + "-" + grantStart.substring(6,8);
			grantEnd = grantEnd.substring(0,4) + "-" + grantEnd.substring(4,6) + "-" + grantEnd.substring(6,8);
			
			success = DatabaseHandler.insertInventoryOutput(funds, focus, outcome, funding, programAndar,yearlyAllocation, grantStart, grantEnd, description, planner);
			if (!success) {
				return RequestHandler.getStatusFailed();
			}
			
			// Variable to help check what data we're looking at
			// First data category starts at index 13
			String dataCategory = "";
			String temp;
			int fieldNum = 13;
			
			dataCategory = checkCategory(headers, fieldNum, dataCategory);
			fieldNum++;
			
			// NOTE: This procedure must match the csv column ordering
			// Get variables and inserts into "Target Population" table
			while (dataCategory.equals("Target Population")) {
				temp = itemJson.get(fieldNum).getAsString();

				if (temp.equals("1")) {
					String populationItem = headers.get(fieldNum);
					success = DatabaseHandler.insertTargetPopulation(programAndar, populationItem);
					if (!success) {
						return RequestHandler.getStatusFailed();
					}
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

				int level = itemJson.get(fieldNum).getAsInt();
				
				success = DatabaseHandler.insertProgramElement(programAndar, programCategory, level);
				if (!success) {
					return RequestHandler.getStatusFailed();
				}
				fieldNum++;
				
				// Stores subelement values
				temp = itemJson.get(fieldNum).getAsString();
				
				String header = headers.get(fieldNum);
				dataCategory = checkCategory(headers, fieldNum, dataCategory);
				if (dataCategory.equals("Program Elements")) {
					
					while (!temp.equals("100") && !temp.equals("200") && !temp.equals("300") && dataCategory.equals("Program Elements")){
						if (!temp.isEmpty()) {
							success = DatabaseHandler.insertProgramSubElement(programAndar, programCategory, header);
						}
						if (!success) {
							return RequestHandler.getStatusFailed();
						}
						
						fieldNum++;
						
						temp = itemJson.get(fieldNum).getAsString();
						header = headers.get(fieldNum);
						
						dataCategory = checkCategory(headers, fieldNum, dataCategory);
					} 
				} else {
					break;
				}	
			}
			fieldNum++;
			
			// Get variables and inserts into "Geo Area" and "Muncipality" tables
			while (dataCategory.equals("Geographic Focus Area")) {
				String geoArea = "";
				geoArea = checkGeoArea(headers, fieldNum, geoArea);
				String currArea = geoArea;
				
				int level;
				String levelString = itemJson.get(fieldNum).getAsString();
				
				if (!levelString.equals("")){
					level = Integer.parseInt(levelString);
					success = DatabaseHandler.insertGeoArea(programAndar, geoArea, level);
				} else {
					// Do nothing
				}
					fieldNum++;
					
					while (currArea.equals(geoArea) && dataCategory.equals("Geographic Focus Area")){
						String municipality = headers.get(fieldNum);
						int focusPercent;
						String percentString = itemJson.get(fieldNum).getAsString(); 
						
						if (!percentString.equals("")){
							focusPercent = Integer.parseInt(percentString);
							success = DatabaseHandler.insertMunicipality(programAndar, municipality, focusPercent);
							if (!success) {
								return RequestHandler.getStatusFailed();
							}
						} else {
							// Do nothing
						}
						
						success = DatabaseHandler.insertAreaDirectory(geoArea, municipality);
						if (!success) {
							return RequestHandler.getStatusFailed();
						}
						
						fieldNum++;
						geoArea = checkGeoArea(headers, fieldNum, currArea);
						dataCategory = checkCategory(headers, fieldNum, dataCategory);
					} 
				}

			fieldNum++;
			
			// Get variables and inserts into "Donor Engagement" table
			while (dataCategory.equals("Donor Engagement")) {
				temp = itemJson.get(fieldNum).getAsString();
				
				if (temp.equals("1")) {
					String donorEngagement = headers.get(fieldNum);
					success = DatabaseHandler.insertDonorEngagement(programAndar, donorEngagement, temp);
					if (!success) {
						return RequestHandler.getStatusFailed();
					}
				}
				
				fieldNum++;
				dataCategory = checkCategory(headers, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Outputs" table
			while (dataCategory.equals("Outputs") && fieldNum < headers.size()) {
				String value = itemJson.get(fieldNum).getAsString();
				
				if (!value.equals("")) {
					String output = headers.get(fieldNum);
					success = DatabaseHandler.insertOutput(programAndar, output, Integer.parseInt(value));
					if (!success) {
						return RequestHandler.getStatusFailed();
					}
				}
				
				fieldNum++;
			}
		}
		
		return RequestHandler.getStatusSuccess();
	}

	public static JsonObject importPrograms(JsonObject requestJson) {

		// Parse the request JSON data and insert into database with
		// queries in DatabaseHandler
		// JSON range for Postal codes: FIELD 1-?
		boolean success = true;
		JsonArray arrayJson = requestJson.get("data").getAsJsonArray();
		JsonArray itemJson = new JsonArray();

		for (int row = 1; row < arrayJson.size()-1; row++) {
			itemJson = arrayJson.get(row).getAsJsonArray();

			int agencyAndar = itemJson.get(0).getAsInt();
			String agencyName = itemJson.get(1).getAsString();
			int programAndar = itemJson.get(2).getAsInt();
			String programName = itemJson.get(3).getAsString();
			String website = itemJson.get(4).getAsString();
			String description = itemJson.get(5).getAsString();

			int numLocations = 0;

			for (int column = 7; column < itemJson.size(); column = column + 2) {
				String locationName = itemJson.get(column).getAsString();
				String locationPostal = itemJson.get(column+1).getAsString();

				if (!locationName.equals("") || !locationPostal.equals("")) {
					numLocations++;
				}
			}

			// These query has to happen before the location queries
			
			success = DatabaseHandler.insertAgency(agencyAndar, agencyName);
			if (!success) {
				return RequestHandler.getStatusFailed();
			}
			
			success = DatabaseHandler.insertProgram(programAndar, agencyAndar, programName, website, description, numLocations);
			if (!success) {
				return RequestHandler.getStatusFailed();
			}

			for (int column = 7; column < itemJson.size(); column = column + 2) {
				String locationName = itemJson.get(column).getAsString();
				String locationPostal = itemJson.get(column+1).getAsString();

				if (!locationName.equals("") || !locationPostal.equals("")) {
					success = DatabaseHandler.insertLocation(programAndar, locationName, locationPostal);
					if (!success) {
						return RequestHandler.getStatusFailed();
					}
				}
			}
		}
		
		return RequestHandler.getStatusSuccess();
	}

	// Checks categories
	private static String checkCategory(ArrayList<String> headers, int fieldNum, String currCategory) {

		String newCategory = headers.get(fieldNum);
		
		if (currCategory.equals(newCategory)) {
			return currCategory;
		} else {
			switch (newCategory) {
			case "Target Population":
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

		String newArea = headers.get(fieldNum);
		
		if (currArea.equals(newArea)) {
			return currArea;
		} else {
			switch (newArea) {
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

		String newElement = headers.get(fieldNum);
		
		if (currElement.equals(newElement)) {
			return currElement;
		} else {
			switch (newElement) {
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
