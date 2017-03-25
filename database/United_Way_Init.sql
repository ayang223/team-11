/* IMPORTANT NOTE: The following file is used to initialize the United Way
Andar information database. Preexisting tables will not be overwritten and
will result in an error. Please use the corresponding United_Way_Deletion.sql
file to clear any database*/

CREATE DATABASE IF NOT EXISTS United_Way_Andar_DB;

USE United_Way_Andar_DB;

/* file_name is the unique name given by the person adding the data */
CREATE TABLE AndarDataOutput (
	funds varchar(16) NOT NULL,
	focus varchar (32) NOT NULL,
	outcome varchar (64) NOT NULL,
	funding varchar (64) NOT NULL,
	program_andar integer NOT NULL,
	yearly_allocation float(14,2) NOT NULL,
	grant_start date NOT NULL,
	grant_end date NOT NULL,
	description varchar(512),
	planner varchar(128) NOT NULL,

	PRIMARY KEY (program_andar)
);

CREATE TABLE TargetPopulation (
	andar_id integer NOT NULL,
	population varchar(128) NOT NULL,

	PRIMARY KEY (andar_id, population),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
);

/* level is 100 = Primary, 200 = Secondary, 300 = N/A */
CREATE TABLE ProgramElement (
	andar_id integer NOT NULL,
	element varchar(128) NOT NULL,
	level integer NOT NULL,

	PRIMARY KEY (andar_id, element),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
);

CREATE TABLE ProgramSubElement (
	andar_id integer NOT NULL,
	element varchar(128) NOT NULL,
	subElement varchar(128) NOT NULL,

	PRIMARY KEY (andar_id, element, subElement),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
);


/* level is 100 = Yes/True, 200 = No/False */
CREATE TABLE GeoArea (
	andar_id integer NOT NULL,
	area varchar(128) NOT NULL,
	level integer NOT NULL,

	PRIMARY KEY (andar_id, area),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
);

CREATE TABLE Municipality (
	andar_id integer NOT NULL,
	municipality varchar(256) NOT NULL,
	focus_percentage integer NOT NULL,

	PRIMARY KEY (andar_id, municipality),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
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

	PRIMARY KEY (andar_id, engagement),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
);

CREATE TABLE Outputs (
	andar_id integer NOT NULL,
	type varchar(128) NOT NULL,
	value integer NOT NULL,

	PRIMARY KEY (andar_id, type),

	FOREIGN KEY (andar_id) REFERENCES AndarDataOutput(program_andar)
);

CREATE TABLE Agency (
	id integer NOT NULL,
	name varchar(128) NOT NULL,

	PRIMARY KEY (id)
);

CREATE TABLE Program (
	id integer NOT NULL,
	agency_andar integer NOT NULL,
	name varchar(128) NOT NULL,
	website varchar(128),
	description varchar(4096),
	num_locations integer,

	PRIMARY KEY (id),

	FOREIGN KEY (id) REFERENCES AndarDataOutput(program_andar),
	FOREIGN KEY (agency_andar) REFERENCES Agency(id)
);

CREATE TABLE Location (
	id integer NOT NULL AUTO_INCREMENT,
	andar_id integer NOT NULL,
	name varchar(128),
	postal varchar(8), 
	lat double,
	lon double,

	PRIMARY KEY (id),

	FOREIGN KEY (andar_id) REFERENCES Program(id)
);

/* Attribute AdminPrivileges identifies user
	False: Basic user
	True: Admin user*/
CREATE TABLE Users (
	id integer NOT NULL AUTO_INCREMENT,
	username varchar(32) NOT NULL UNIQUE,
	password varchar(64) NOT NULL,
	first_name varchar(32),
	last_name varchar(32),
	admin_privileges boolean NOT NULL,
	
	PRIMARY KEY (id)
);

CREATE TABLE Log (
	id integer NOT NULL AUTO_INCREMENT,
	username varchar(32) NOT NULL,
	action varchar(128) NOT NULL,
	date_time varchar(128) NOT NULL,

	PRIMARY KEY (id)
);

/* Initialization of main administrator account*/
INSERT INTO Users
VALUES (0, 'Main_Admin', '0d6e4079e36703ebd37c00722f5891d28b0e2811dc114b129215123adcce3605', NULL, NULL, TRUE);

