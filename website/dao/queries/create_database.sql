
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

CREATE TABLE contact (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(200),
    email VARCHAR(320) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- INITIAL VALUES
insert into types
  (id, name)
values
  (0, 'Skills'),
  (1, 'Languages'),
  (2, 'Tools');
  (3, 'Styles'),

insert into abilities
  (type, title, stars, start_date, extra)
values
  (0, 'GML', 5, DATE('2008-01-01'), null),
  (0, 'Java', 5, DATE('2009-01-01'), null),
  (0, 'HTML(5) / CSS', 5, DATE('2015-01-01'), null),
  (0, 'JavaScript', 4, DATE('2015-01-01'), null),
  (0, 'Assembly x86', 4, DATE('2016-09-01'), null),
  (0, 'SQL', 4, DATE('2017-01-01'), null),
  (0, 'p5js', 5, DATE('2018-11-01'), null),
  (0, 'GOAL', 3, DATE('2017-02-01'), null),
  (0, 'Prolog', 3, DATE('2017-04-01'), null),
  (0, 'C++', 4, DATE('2017-04-01'), null),
  (0, 'Matlab', 4, DATE('2017-09-01'), null),
  (0, 'Scala', 4, DATE('2018-02-01'), null),
  (0, 'Python', 5, DATE('2017-04-01'), null),
  (0, 'C', 4, DATE('2017-04-01'), null),
  (0, 'Typescript', 4, DATE('2017-09-01'), null),
  (0, 'SASS / SCSS', 5, DATE('2017-09-01'), null),
  (1, 'Dutch', 5, DATE('1998-01-11'),  'native'),
  (1, 'English', 5, DATE('2007-01-11'), 'proficient');

insert into project
  (id, title, date_start, date_end, description)
values
  (1,'Noteworthy', DATE('2019-04-22'), DATE('2019-07-05'), 'Relive classical music'),
  (2,'Uptovet', DATE('2017-09-05'), DATE('2019-01-01'), 'Cloud veterinary service'),
  (3,'An Outpost', DATE('2015-12-11'), DATE('2015-12-14'), 'Ludum Dare 34 entry.'),
  (4,'F1 Racing Manager', DATE('2016-11-17'), DATE('2017-01-30'), 'An Formula-1 Racing Manager, where one can control a team participating in Formula-1 races');

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
