package com.team11.backend;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.team11.backend.DatabaseHandler;
import com.team11.backend.RequestHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DatabaseServlet
 */
@WebServlet("/DatabaseServlet")
public class DatabaseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Gson gson = new Gson();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DatabaseServlet() {
		super();
	}

	// TODO: Delete the doGet method
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");

		PrintWriter out = response.getWriter();

		out.println("Testing Backend Server...\n");
		out.println(DatabaseHandler.getUsers());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//Read Request body
		StringBuilder buffer = new StringBuilder();
		BufferedReader reader = request.getReader();
		String line;
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		String data = buffer.toString();
		
		JsonObject requestJson = gson.fromJson(data, JsonObject.class);
		JsonObject responseJson = RequestHandler.handleRequest(requestJson);
		
		//Write Response body
		response.setContentType("text/json");

		PrintWriter out = response.getWriter();
		
		out.println(responseJson);
	}

}
