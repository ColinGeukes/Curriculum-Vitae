
-- DROP TABLES
drop table IF EXISTS  types;
drop table IF EXISTS abilities;

-- CREATE TABLES
create TABLE types (
    id TINYINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

create TABLE abilities (
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
alter table abilities AUTO_INCREMENT = 0;

drop table if exists project;
create TABLE project (
    id INT AUTO_INCREMENT,
    title VARCHAR(120) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    link VARCHAR(200),
    PRIMARY KEY (id),
    UNIQUE KEY `no_duplicates` (`title`)
) ENGINE=INNODB;
alter table project AUTO_INCREMENT = 0;

create TABLE project_ability (
    project_id INT NOT NULL,
    ability_id INT NOT NULL,
    PRIMARY KEY (project_id, ability_id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (ability_id) REFERENCES abilities(id)
) ENGINE=INNODB;

create TABLE contact (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(200),
    email VARCHAR(320) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

create TABLE education (
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

create TABLE experience (
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
delete from types where 1=1;
insert into types
  (id, name)
values
  (0, 'Skills'),
  (1, 'Languages'),
  (2, 'Tools'),
  (3, 'Styles');


delete from project_ability where 1=1;
delete from abilities where 1=1;
insert into abilities
  (id, type, title, stars, start_date, extra)
values
  (1, 0, 'GML', 5, date('2008-01-01'), null),
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
  (19, 0, 'Angular', 5, DATE('2017-09-05'), null),
  (20, 0, 'Express', 4, DATE('2015-01-01'), null),
  (50, 1, 'Dutch', 5, DATE('1998-01-11'),  'native'),
  (51, 1, 'English', 5, DATE('2007-01-11'), 'proficient'),
  (55, 2, 'Eclipse', 5, DATE('2009-01-01'), null),
  (56, 2, 'IntelliJ', 5, DATE('2017-01-01'), null),
  (57, 2, 'Webstorm', 5, DATE('2017-01-01'), null),
  (58, 2, 'PyCharm', 5, DATE('2017-01-01'), null),
  (59, 2, 'CLion', 5, DATE('2017-01-01'), null),
  (80, 3, 'SCRUM', -1, null, null),
  (81, 3, 'Object Oriented Programming', -1, null, null),
  (82, 3, 'CLI', -1, null, null),
  (83, 3, 'Networking', -1, null, null),
  (84, 3, 'API', -1, null, null),
  (85, 3, 'Databases', -1, null, null),
  (86, 3, 'Continuous Integration', -1, null, null),
  (87, 3, 'Static Analysis', -1, null, null),
  (88, 3, 'Linux', -1, null, null),
  (89, 3, 'Windows', -1, null, null),
  (90, 3, 'Datamining', -1, null, null);

delete from project where 1=1;
insert into project
  (id, title, date_start, date_end, link, description)
values
  (1,'Noteworthy', DATE('2019-04-22'), DATE('2019-07-05'),'http://noteworthy.ancomi.nl/', 'An application created for the Royal Library of the Netherlands in combination with MuziekWeb. <br> Noteworthy is an application to relive the popular classical music over time. This is done by audio, listening to snippets, and visually, reading about popular artists. <br> With this application, one can also observe different connections between different artists. These connections explain what caused certain artists to develop a certain style. <br> Noteworthy provides a summary of all information about classical artists from the year 1600 up to the year 1950.'),
  (2,'Uptovet', DATE('2017-09-05'), DATE('2019-01-01'), null, 'Cloud veterinary service'),
  (3,'An Outpost', DATE('2015-12-11'), DATE('2015-12-14'), 'http://ludumdare.com/compo/ludum-dare-34/?action=preview&uid=62758', 'Programming a game for Ludum Dare. Ludum Dare is an online community best known for “Ludum Dare”, the Accelerated Game Development Event of the same name (also called a “Game Jam”). During a Ludum Dare, developers from around the world spend a weekend creating games based on a theme suggested by the community.  <br> An Outpost is created for Ludum Dare 34, with the tied theme of Two Button Controls and Growing.'),
  (4,'F1 Racing Manager', DATE('2016-11-17'), DATE('2017-01-30'), null, 'Formula-1 Racing Manager is a managing game, in which the player controls a racing team that takes part in Formula-1 races. The player is able to race amongst other players online, or versus bots in a single player match. The manager decides which strategies to use for his racing season. This include which equipment, driving techniques and drivers! <br> This project was the result of a course given by the Technical University of Delft. The product is created by a total of five students. In order to successfully cooperate with each other, weekly scrum meetings were conducted.'),
  (5,'Curriculum Vitae', DATE('2019-06-22'), null, null, 'The website that is currently displayed on your screen. The entire website is overengineer to show what I am capable of. Containing several features; fully tested, Application Programming Interface, Database, Continuous Integration, and more.');

insert into education
  (id, icon, name, type, title, description, date_start, date_end, link)
values
  (1,'fas fa-university', 'Technical University of Delft', 'University education', 'BSc: Computer Science', 'Self-driving cars, smartphone navigation, personalized offers based on surfing behavior, healthcare robots, and searching through films and pictures. During the Computer Science and Engineering degree program, one learns how to develop software and implement data processing for the intelligent systems of today and the future. This could include medical systems, security and perhaps even the new YouTube. Mathematical analysis and modeling, logical reasoning, programming algorithms and working with concepts of programming languages are all important subjects of this study, and so is collaboration. This is why, every half a year, one will work on a project with a group of fellow students, designing systems like an intelligent bot in a computer game.', date('2016-09-05'), null, 'https://www.tudelft.nl/en/education/programmes/bachelors/cse/bachelor-of-computer-science-and-engineering/'),
  (2,'fas fa-school', 'De Goudse Waarden', 'Pre-university education', 'Grammar school','A pre-university located in Gouda',DATE('2011-09-05'), DATE('2015-07-05'), 'https://www.degoudsewaarden.nl/');


insert into experience
  (id, icon, name, title, description, date_start, date_end, link)
values
  (0, 'fas fa-hands-helping', 'De Heemtuin', 'Volunteer gardener', 'Volunteer work as a gardener at a nature preserve located in Gouda. This work consisted of every mundane task that can be done in a volunteer nature preserve. The most important aspect of this work was teamwork and coordination.', date('2013-11-01'), date('2014-05-28'), 'http://www.heemtuingoudsehout.nl/'),
  (1, 'fas fa-chalkboard-teacher','De Bijles Student', 'Assistent teacher', 'Teaching the basics of programming in p5js to a pre-vocational secondary education class. This class had no prior experiences in programming at all, hence the key aspect of this task was to explain everything as effectively as possible.', DATE('2018-11-01'), DATE('2018-11-30'), 'https://www.debijlesstudent.nl/');


insert into project_ability
  (project_id, ability_id)
values
--  Noteworthy
  (1, 3),
  (1, 4),
  (1, 6),
  (1, 13),
  (1, 16),
  (1, 20),
  (1, 57),
  (1, 58),
  (1, 80),
  (1, 81),
  (1, 83),
  (1, 84),
  (1, 85),
  (1, 86),
  (1, 87),
  (1, 88),
  (1, 90),
-- Uptovet
  (2, 15),
  (2, 6),
  (2, 16),
  (2, 57),
  (2, 80),
  (2, 82),
  (2, 83),
  (2, 84),
  (2, 85),
  (2, 88),
  (2, 89),
--  An Outpost
  (3, 2),
  (3, 17),
  (3, 55),
  (3, 81),
  (3, 89),
--  F1 Racing Manager
  (4, 2),
  (4, 55),
  (4, 80),
  (4, 81),
  (4, 18),
  (4, 86),
  (4, 83),
  (4, 89),
--  Curriculum Vitae
  (5, 3),
  (5, 4),
  (5, 6),
  (5, 56),
  (5, 57),
  (5, 16),
  (5, 81),
  (5, 82),
  (5, 83),
  (5, 84),
  (5, 85),
  (5, 86),
  (5, 87),
  (5, 88);

-- TESTING VALUES
insert into types
  (id, name)
values
  (0, 't0'), (0, 't1');

insert into abilities
  (type, title, stars, start_date, extra)
values
  (0, 'a0', 1, date('2008-01-01'), null),
  (0, 'a1', 2, DATE('2009-01-01'), 'extra'),
  (1, 'a2', 3, null, 'extra'),
  (1, 'a3', 5 ,null, null);
