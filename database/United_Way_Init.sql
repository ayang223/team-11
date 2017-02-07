/* IMPORTANT NOTE: The following file is used to initialize the United Way
Andar information database. Preexisting tables will not be overwritten and
will result in an error. Please use the corresponding United_Way_Deletion.sql
file to clear any database*/

CREATE DATABASE IF NOT EXISTS United_Way_Andar_DB;

USE United_Way_Andar_DB;

CREATE TABLE Agency (
	id integer NOT NULL,UsersTargetPopulationProgramSubElement
	name varchar(128) NOT NULL,
	postal varchar(8) NOT NULL,

	PRIMARY KEY (id)
);

CREATE TABLE Program (
	id integer NOT NULL,
	agency_andar integer NOT NULL,
	name varchar(128) NOT NULL,
	website varchar(128),
	description varchar(512),
	num_locations integer,

	PRIMARY KEY (id),

	FOREIGN KEY (agency_andar) REFERENCES Agency(id)
);

CREATE TABLE Location (
	id integer NOT NULL AUTO_INCREMENT,
	andar_id integer NOT NULL,
	name varchar(128) NOT NULL,
	postal varchar(8) NOT NULL,

	PRIMARY KEY (id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

/* file_name is the unique name given by the person adding the data */
CREATE TABLE AndarDataOutput (
	file_name varchar(32) NOT NULL,
	area varchar(32) NOT NULL,
	funds varchar(16) NOT NULL,
	focus varchar (32) NOT NULL,
	outcome varchar (64) NOT NULL,
	funding varchar (64) NOT NULL,
	program_andar Integer NOT NULL,
	yearly_allocation Integer NOT NULL,
	grant_start Date NOT NULL,
	grant_end Date NOT NULL,
	description varchar(512),
	planner varchar(128) NOT NULL,

	PRIMARY KEY (program_andar),

	FOREIGN KEY (program_andar) REFERENCES Program(id)
);

CREATE TABLE TargetPopulation (
	andar_id integer NOT NULL,
	population varchar(128) NOT NULL,

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

CREATE TABLE ProgramElement (
	andar_id integer NOT NULL,
	element varchar(128) NOT NULL,
	level integer NOT NULL,

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

CREATE TABLE ProgramSubElement (
	andar_id integer NOT NULL,
	subElement varchar(128) NOT NULL,

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

/* Maps Program Element and Program SubElement values */
CREATE TABLE ElementDirectory (
	element varchar(128) NOT NULL,
	subElement varchar(128) NOT NULL,

	PRIMARY KEY (element, subElement)
);

CREATE TABLE GeoArea (
	andar_id integer NOT NULL,
	area varchar(128) NOT NULL,
	level integer NOT NULL,

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

CREATE TABLE Municipality (
	andar_id integer NOT NULL,
	municipality varchar(256) NOT NULL,
	focus_percentage integer NOT NULL,

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

/* Maps Geo Area and Municipality values */
CREATE TABLE AreaDirectory (
	geoArea varchar(128) NOT NULL,
	municipality varchar(256) NOT NULL,

	PRIMARY KEY (geoArea, municipality)
);

CREATE TABLE DonorEngagement (
	andar_id integer NOT NULL,
	engagement varchar(128) NOT NULL,
	description varchar(512),

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

CREATE TABLE Outputs (
	andar_id integer NOT NULL,
	type varchar(128) NOT NULL,
	value integer NOT NULL,

	PRIMARY KEY (andar_id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

/* Attribute AdminPrivileges identifies user
	False: Basic user
	True: Admin user*/
CREATE TABLE Users (
	id integer NOT NULL,
	username varchar(32) NOT NULL,
	password varchar(32) NOT NULL,
	first_name varchar(32),
	last_name varchar(32),
	admin_privileges boolean NOT NULL,
	
	PRIMARY KEY (id)
);

/* Initialization of main administrator account*/
INSERT INTO Users
VALUES (0, 'Main_Admin', 'main', NULL, NULL, TRUE);

