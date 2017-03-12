CREATE TABLE STUDENT (
  	student_id VARCHAR(10) key,
  	first_name VARCHAR(20),
	last_name VARCHAR(20),
	dob DATE,
	major VARCHAR(10));

CREATE TABLE COURSE (
  	course_id VARCHAR(10) key,
  	description TEXT(300));

CREATE TABLE GRADES (
  	student_id VARCHAR(10),
	course_id VARCHAR(10),
  	term VARCHAR(15),
	grade VARCHAR(3));

ALTER TABLE GRADES ADD UNIQUE(courseid, studentid, term);''

INSERT INTO STUDENT
( student_id, first_name, last_name, dob, major)
VALUES
( 'mmd474', 'Dagi', 'Jegnaw', '1995-12-19', 'CS'),
( 'mmd475', 'Dagi', 'Boi', '1995-12-19', 'CS'),
( 'mmd476', 'Dagi', 'who', '1995-12-19', 'CS'),
( 'dmm476', 'DJ', 'Mesfin', '1995-12-19', 'Fin' ),
( 'dmm474', 'DAGMAWI', 'MULUGETA', '1995-12-19', 'CE'),
( 'dmm475', 'Dagi', 'Aradaw', '1995-12-19', 'CS');


INSERT INTO COURSE
( course_id, description)
VALUES
( 'CS171', 'Introduction to Programming'),
( 'CS260', 'Data structures'),
( 'CS275', 'Web Design');


INSERT INTO GRADES
( student_id, course_id, term, grade)
VALUES
( 'mmd474', 'CS260', 'Fall16', 'A'),
( 'mmd474', 'CS275', 'Fall16', 'A'),
( 'mmd474', 'CS275', 'Winter17', 'B'),
( 'mmd475', 'CS260', 'Spring17', 'D'),
( 'mmd476', 'CS260', 'Winter17', 'F'),
( 'mmd476', 'CS171', 'Fall16', 'A');


SELECT grades.student_id, student.first_name, student.last_name, grades.term, grades.course_id, course.description, 
grades.grade from GRADES, STUDENT, COURSE where course.course_id = grades.course_id && grades.student_id = student.student_id 
&& grades.student_id = 'dmm474' && grades.term = 'Fall16';