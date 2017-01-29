#Backend client for Team 11

<Development Requirements>

You will need to download Eclipse Neon (http://www.eclipse.org/neon/) and install with the Java EE development package (will get prompted when installing). We will be using Tomcat 9, and Eclipse already has this bundled with it.

You will also need Java 8 Dev Kit (Latest jdk1.8.0_121 downloaded from the Oracle website http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). You will also need Java 8 Runtime Environment (Latest http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

You will also need Tomcat 9 (Latest from http://tomcat.apache.org/download-90.cgi Get the 32-bit/64-bit Windows Service Installer if you're on Windows).

<How to start server>

1. Open Eclipse Neon and go to File -> Import -> General -> Existing Projects into Workspace. Then, browse and select <git directory>/team-11/server as the root directory. Tick the BackendServer project and finish. 

2. Now we have to set up the Tomcat server. Find the Servers tab at the bottom (or use the "Quick Access" search bar) and create a new Server. Select Apache -> Tomcat v9.0 Server as the server type. For the Server runtime environment, choose Apache Tomcat v9.0. If that option is not available, you will have to "Add..."" it. The Tomcat v9.0 should be using Java 8 Runtime Environment. 

3. Run the server by right clicking the project root folder -> Run as -> Run on Server and select the server created in step 2. If you're localhost port default is 8080, then you can see if it ran at http://localhost:8080/BackendServer/DatabaseServlet/

