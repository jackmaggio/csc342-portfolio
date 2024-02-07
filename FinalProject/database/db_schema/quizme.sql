CREATE TABLE users (
	user_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL,
    password varchar(128) NOT NULL,
    salt varchar(64) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE courses (
	course_id int(10) unsigned NOT NULL AUTO_INCREMENT,
	course_title varchar(100) UNIQUE,
    PRIMARY KEY(course_id)
);

CREATE TABLE studysets(
	studyset_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    course_id int(10) unsigned NOT NULL,
    user_id int(10) unsigned NOT NULL,
    studyset_title varchar(100) NOT NULL,
    PRIMARY KEY (studyset_id),
	CONSTRAINT FK_CRSS_COURSE FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_CRSS_USER FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE flashcards(
	flashcard_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    studyset_id int(10) unsigned NOT NULL,
	user_id int(10) unsigned NOT NULL,
    question varchar(250) NOT NULL,
    answer varchar(250) NOT NULL,
    PRIMARY KEY (flashcard_id),
	CONSTRAINT FK_SSFC_STUDYSET FOREIGN KEY (studyset_id) REFERENCES studysets (studyset_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_SSFC_USER FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE posts(
	post_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    course_id int(10) unsigned NOT NULL,
    user_id int(10) unsigned NOT NULL,
    post_content varchar(250) NOT NULL,
    PRIMARY KEY (post_id),
    CONSTRAINT FK_CRP_COURSE FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_CRP_USER FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE replies(
	reply_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    post_id int(10) unsigned NOT NULL,
    user_id int(10) unsigned NOT NULL,
    reply_content varchar(250) NOT NULL,
    PRIMARY KEY (reply_id),
	CONSTRAINT FK_PR_POST FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_PR_USER FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO courses VALUES(null, "CSC 342");
