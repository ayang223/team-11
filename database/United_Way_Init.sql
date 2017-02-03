/* IMPORTANT NOTE: The following file is used to initialize the United Way
Andar information database. Preexisting tables will not be overwritten and
will result in an error. Please use the corresponding United_Way_Deletion.sql
file to clear any database*/

CREATE DATABASE IF NOT EXISTS United_Way_Andar_DB;

<<<<<<< HEAD
USE United_Way_Andar_DB;

=======
>>>>>>> e559ceb6056c85d80edea56c28de5d31532cdd9a
CREATE TABLE Agencies (
	id integer NOT NULL,
	name varchar(128) NOT NULL,
	description varchar(512) NOT NULL,
	city varchar(128) NOT NULL,
	longitude decimal(10,6) NOT NULL,
	latitude decimal(10,6) NOT NULL,
	PRIMARY KEY (id)
);

/*file_name is the unique name given by the person adding the data*/
/* tp: Target population
   pe: Program event
   mu: Municipality
   de: Donor Engagement */
CREATE TABLE AndarDataOutput (
	file_name varchar(32) NOT NULL UNIQUE,
	area varchar(32) NOT NULL,
	funds varchar(16) NOT NULL,
	focus varchar (32) NOT NULL,
	outcome varchar (64) NOT NULL,
	funding varchar (64) NOT NULL,
<<<<<<< HEAD
	agency_andar Integer NOT NULL,
=======
	agency_andar Integer,
>>>>>>> e559ceb6056c85d80edea56c28de5d31532cdd9a
	program_andar Integer NOT NULL,
	program_name varchar(512) NOT NULL,
	yearly_allocation Integer NOT NULL,
	grant_start Date NOT NULL,
	grant_end Date NOT NULL,
	description  varchar(512),
	planner varchar(128) NOT NULL,
	
	tp_early_childhood boolean,
	tp_middle_years boolean,
	tp_families boolean,
	tp_youth boolean,
	tp_seniors boolean,
	tp_immigrants boolean,
	tp_women boolean,
	tp_aboriginal boolean,
	tp_other_population boolean,
	
	pe_art boolean,
	pe_caregiver boolean,
	pe_provision boolean,
	pe_security boolean,
	pe_housing boolean,
	pe_information boolean,
	pe_intergenerational boolean,
	pe_life_skills boolean,
	pe_mental_wellness boolean,
	pe_physical_activity boolean,
	pe_physical_wellness boolean,
	pe_policy boolean,
	pe_research boolean,
	pe_scholastic boolean,
	pe_connections boolean,
	pe_violence_prevention boolean,
	
	mu_anmore boolean,
	mu_belcarra boolean,
	mu_bowen_island boolean,
	mu_burnaby boolean,
	mu_coquitlam boolean,
	mu_delta boolean,
	mu_gibsons boolean,
	mu_langley_city boolean,
	mu_langley_district boolean,
	mu_lions_bay boolean,
	mu_maple_ridge boolean,
	mu_new_westminster boolean,
	mu_north_vancouver_city boolean,
	mu_north_vancouver_district boolean,
	mu_pemberton boolean,
	mu_pitt_meadows boolean,
	mu_port_coquitlam boolean,
	mu_port_moody boolean,
	mu_richmond boolean,
	mu_sunshine_coast boolean,
	mu_surrey boolean,
	mu_squamish boolean,
	mu_vancouver boolean,
	mu_west_vancouver boolean,
	mu_whistler boolean,
	mu_white_rock boolean,
	
	de_UW boolean,
	de_day_of_caring boolean,
	de_volunteer boolean,
	de_tour boolean,
	de_fair boolean,
	de_impact_stories boolean,
	de_other boolean,

	out_clients integer,
	out_child_from_zero_to_six integer,
	out_child_from_six_to_twelve integer,
	out_children integer,
	out_seniors integer,
	out_guardian integer,
	out_families integer,
	out_contacts integer,
	out_meals integer,
	out_counselling integer,
	out_mentors integer,
	out_workshops integer,
	out_volunteers integer,
	out_locations integer,

<<<<<<< HEAD
	PRIMARY KEY(program_andar),

	FOREIGN KEY (agency_andar) REFERENCES Agencies(id)
=======
	PRIMARY KEY(program_andar)
>>>>>>> e559ceb6056c85d80edea56c28de5d31532cdd9a
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
<<<<<<< HEAD
	PRIMARY KEY (id)
=======
	PRIMARY KEY (id)Users
>>>>>>> e559ceb6056c85d80edea56c28de5d31532cdd9a
);

/* Initialization of main administer account*/
INSERT INTO Users
<<<<<<< HEAD
VALUES (0, 'Main_Admin', 'main', NULL, NULL, TRUE);
=======
VALUES (0,  "Main_Admin", "main", NULL, NULL, TRUE);
>>>>>>> e559ceb6056c85d80edea56c28de5d31532cdd9a
