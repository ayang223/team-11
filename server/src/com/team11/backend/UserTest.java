package com.team11.backend;

import com.google.gson.JsonObject;

import junit.framework.TestCase;

public class UserTest extends TestCase {
	private JsonObject ProtectedUserJson = new JsonObject();
	private JsonObject DeleteProtectedUserJson = new JsonObject();
	
	private JsonObject NewUserJson = new JsonObject();
	private JsonObject LoginJson = new JsonObject();
	private JsonObject UpdateUserJson = new JsonObject();
	private JsonObject NewLoginJson = new JsonObject();
	private JsonObject DeleteUserJson = new JsonObject();
	
	private JsonObject ListUserJson = new JsonObject();
	
	private JsonObject Success = new JsonObject();
	private static final String SUCCESS = "status";
	
   
   // assigning the values
   protected void setUp(){
		String USER = "GENERIC_TEST";
		String NEW_USER = "GENERIC_TEST_NEW";
		String PASSWORD = "GENERIC_PASS";
		String NEW_PASSWORD = "GENERIC_PASS_NEW";
		String FIRST_NAME = "TEST_NAME";
		String LAST_NAME = "TEST_LAST_NAME";
		boolean ADMIN_PRIVILEGES = false;
		
		ProtectedUserJson.addProperty("action", "Create User");
		ProtectedUserJson.addProperty("user", USER);
		ProtectedUserJson.addProperty("password", PASSWORD);
		ProtectedUserJson.addProperty("first_name", FIRST_NAME);
		ProtectedUserJson.addProperty("last_name", LAST_NAME);
		ProtectedUserJson.addProperty("admin_privileges", ADMIN_PRIVILEGES);
		
		DeleteProtectedUserJson.addProperty("action", "Delete User");
		DeleteProtectedUserJson.addProperty("action", USER);
		
		NewUserJson.addProperty("action", "Create User");
		NewUserJson.addProperty("user", NEW_USER);
		NewUserJson.addProperty("password", PASSWORD);
		NewUserJson.addProperty("first_name", FIRST_NAME);
		NewUserJson.addProperty("last_name", LAST_NAME);
		NewUserJson.addProperty("admin_privileges", ADMIN_PRIVILEGES);
		
		LoginJson.addProperty("action", "Login User");
		LoginJson.addProperty("user", NEW_USER);
		LoginJson.addProperty("password", PASSWORD);

		UpdateUserJson.addProperty("action", "Change Password");
		UpdateUserJson.addProperty("user", NEW_USER);
		UpdateUserJson.addProperty("old_password", PASSWORD);
		UpdateUserJson.addProperty("new_password", NEW_PASSWORD);
		
		NewLoginJson.addProperty("action", "Login User");
		NewLoginJson.addProperty("user", NEW_USER);
		NewLoginJson.addProperty("password", NEW_PASSWORD);
		
		DeleteUserJson.addProperty("action", "Delete User");
		DeleteUserJson.addProperty("action", NEW_USER);
		
		ListUserJson.addProperty("action", "List User");
		

   }

   // Testing protected account
   public void ProtectedUserTest(){
	   
	  // Already created
      Success = UserManager.createUser(ProtectedUserJson);
      assertFalse(Success.get(SUCCESS).getAsBoolean());
      
      // Failing to delete protected account
      Success = UserManager.deleteUser(DeleteProtectedUserJson);
      assertFalse(Success.get(SUCCESS).getAsBoolean());
      
   }
   
   // Testing regular account
   public void RegularUserTest(){
	
	  // User Creation
	  Success = UserManager.createUser(NewUserJson);
	  assertTrue(Success.get(SUCCESS).getAsBoolean());

	  // Good and Bad Login
	  Success = LoginHandler.loginUser(LoginJson);
	  assertTrue(Success.get(SUCCESS).getAsBoolean());
	  
	  Success = LoginHandler.loginUser(NewLoginJson);
	  assertFalse(Success.get(SUCCESS).getAsBoolean());
	  
	  // Update password
	  Success = UserManager.changePassword(UpdateUserJson);
	  assertTrue(Success.get(SUCCESS).getAsBoolean());
	  
	  Success = UserManager.changePassword(UpdateUserJson);
	  assertFalse(Success.get(SUCCESS).getAsBoolean());
	  	  
	  Success = LoginHandler.loginUser(NewLoginJson);
	  assertTrue(Success.get(SUCCESS).getAsBoolean());
	  
	  // Delete
	  Success = UserManager.deleteUser(DeleteUserJson);
	  assertTrue(Success.get(SUCCESS).getAsBoolean());
	  	  
   }
   
   public void UserListTest() {
	   JsonObject UserList = UserManager.listUser(ListUserJson);
	   assertTrue(UserList.has("Users"));
   }
}