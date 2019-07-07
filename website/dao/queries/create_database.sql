
-- DROP TABLES
drop table IF EXISTS  types;
drop table IF EXISTS abilities;

-- CREATE TABLES
CREATE TABLE types (
    id TINYINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE abilities (
    id INT AUTO_INCREMENT,
    type TINYINT NOT NULL,
    title VARCHAR(120) NOT NULL,
    stars TINYINT NOT NULL,
    start_date DATE,
    extra VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (type) REFERENCES types(id),
    UNIQUE KEY `no_duplicates` (`type`,`title`)
)  ENGINE=INNODB;
ALTER TABLE abilities AUTO_INCREMENT = 0;

CREATE TABLE project (
    id INT AUTO_INCREMENT,
    title VARCHAR(120) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    PRIMARY KEY (id),
    UNIQUE KEY `no_duplicates` (`title`)
) ENGINE=INNODB;
ALTER TABLE project AUTO_INCREMENT = 0;

CREATE TABLE project_ability (
    project_id INT NOT NULL,
    ability_id INT NOT NULL,
    PRIMARY KEY (project_id, ability_id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (ability_id) REFERENCES abilities(id)
) ENGINE=INNODB;

CREATE TABLE contact (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(200),
    email VARCHAR(320) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE education (
    id INT AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    type VARCHAR(400) NOT NULL,
    title VARCHAR(400) NOT NULL,
    icon VARCHAR(200) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    link varchar(200),
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE experience (
    id INT AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    title VARCHAR(400) NOT NULL,
    icon VARCHAR(200) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    link varchar(200),
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- INITIAL VALUES
DELETE FROM types WHERE 1=1;
insert into types
  (id, name)
values
  (0, 'Skills'),
  (1, 'Languages'),
  (2, 'Tools'),
  (3, 'Styles');

DELETE FROM abilities WHERE 1=1;
insert into abilities
  (id, type, title, stars, start_date, extra)
values
  (1, 0, 'GML', 5, DATE('2008-01-01'), null),
  (2, 0, 'Java', 5, DATE('2009-01-01'), null),
  (3, 0, 'HTML(5) / CSS', 5, DATE('2015-01-01'), null),
  (4, 0, 'JavaScript', 4, DATE('2015-01-01'), null),
  (5, 0, 'Assembly x86', 4, DATE('2016-09-01'), null),
  (6, 0, 'SQL', 4, DATE('2017-01-01'), null),
  (7, 0, 'p5js', 5, DATE('2018-11-01'), null),
  (8, 0, 'GOAL', 3, DATE('2017-02-01'), null),
  (9, 0, 'Prolog', 3, DATE('2017-04-01'), null),
  (10, 0, 'C++', 4, DATE('2017-04-01'), null),
  (11, 0, 'Matlab', 4, DATE('2017-09-01'), null),
  (12, 0, 'Scala', 4, DATE('2018-02-01'), null),
  (13, 0, 'Python', 5, DATE('2017-04-01'), null),
  (14, 0, 'C', 4, DATE('2017-04-01'), null),
  (15, 0, 'Typescript', 4, DATE('2017-09-01'), null),
  (16, 0, 'SASS / SCSS', 5, DATE('2017-09-01'), null),
  (17, 0, 'LibGDX', 5, DATE('2011-01-01'), null),
  (18, 0, 'Swing', 5, DATE('2015-01-01'), null),
  (50, 1, 'Dutch', 5, DATE('1998-01-11'),  'native'),
  (51, 1, 'English', 5, DATE('2007-01-11'), 'proficient'),
  (55, 2, 'Eclipse', 5, DATE('2009-01-01'), null),
  (80, 3, 'SCRUM', 5, null, null),
  (81, 3, 'Object Oriented Programming', 5, null, null);
  (82, 3, 'CLI', 5, null, null);
  (83, 3, 'Networking', 5, null, null);

insert into project
  (id, title, date_start, date_end, description)
values
  (1,'Noteworthy', DATE('2019-04-22'), DATE('2019-07-05'), 'Relive classical music'),
  (2,'Uptovet', DATE('2017-09-05'), DATE('2019-01-01'), 'Cloud veterinary service'),
  (3,'An Outpost', DATE('2015-12-11'), DATE('2015-12-14'), 'Ludum Dare 34 entry.'),
  (4,'F1 Racing Manager', DATE('2016-11-17'), DATE('2017-01-30'), 'Formula-1 Racing Manager is a managing game, in which the player controls a racing team that takes part in Formula-1 races. The player is able to race amongst other players online, or versus bots in a single player match. The manager decides which strategies to use for his racing season. This include which equipment, driving techniques and drivers! <br> This project was the result of a course given by the Technical University of Delft. The product is created by a total of five students. In order to successfully cooperate with each other, weekly scrum meetings were conducted.');

insert into education
  (id, icon, name, type, title, description, date_start, date_end, link)
values
  (1,'fas fa-university', 'Technical University of Delft', 'University education', 'BSc: Computer Science', 'Self-driving cars, smartphone navigation, personalized offers based on surfing behavior, healthcare robots, and searching through films and pictures. During the Computer Science and Engineering degree program, one learns how to develop software and implement data processing for the intelligent systems of today and the future. This could include medical systems, security and perhaps even the new YouTube. Mathematical analysis and modeling, logical reasoning, programming algorithms and working with concepts of programming languages are all important subjects of this study, and so is collaboration. This is why, every half a year, one will work on a project with a group of fellow students, designing systems like an intelligent bot in a computer game.', DATE('2016-09-05'), null, 'https://www.tudelft.nl/en/education/programmes/bachelors/cse/bachelor-of-computer-science-and-engineering/'),
  (2,'fas fa-school', 'De Goudse Waarden', 'Pre-university education', 'Grammar school','A pre-university located in Gouda',DATE('2011-09-05'), DATE('2015-07-05'), 'https://www.degoudsewaarden.nl/');



insert into experience
  (id, icon, name, title, description, date_start, date_end, link)
values
  (0, 'fas fa-hands-helping', 'De Heemtuin', 'Volunteer gardener', 'Volunteer work as a gardener at a nature preserve located in Gouda. This work consisted of every mundane task that can be done in a volunteer nature preserve. The most important aspect of this work was teamwork and coordination.', DATE('2013-11-01'), DATE('2014-05-28'), 'http://www.heemtuingoudsehout.nl/'),
  (1, 'fas fa-chalkboard-teacher','De Bijles Student', 'Assistent teacher', 'Teaching the basics of programming in p5js to a pre-vocational secondary education class. This class had no prior experiences in programming at all, hence the key aspect of this task was to explain everything as effectively as possible.', DATE('2018-11-01'), DATE('2018-11-30'), 'https://www.debijlesstudent.nl/');



DELETE FROM project_ability WHERE 1=1;
insert into project_ability
  (project_id, ability_id)
values
  (4, 2),
  (4, 55),
  (4, 80),
  (4, 81);

-- TESTING VALUES
insert into types
  (id, name)
values
  (0, 't0'), (0, 't1');

insert into abilities
  (type, title, stars, start_date, extra)
values
  (0, 'a0', 1, DATE('2008-01-01'), null),
  (0, 'a1', 2, DATE('2009-01-01'), 'extra'),
  (1, 'a2', 3, null, 'extra'),
  (1, 'a3', 5 ,null, null);
