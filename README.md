# Curriculum-Vitae
[![Build Status](https://travis-ci.org/ColinGeukes/Curriculum-Vitae.svg?branch=master)](https://travis-ci.org/ColinGeukes/Curriculum-Vitae)
[![Coverage Status](https://coveralls.io/repos/github/ColinGeukes/Curriculum-Vitae/badge.png?branch=master&service=github)](https://coveralls.io/github/ColinGeukes/Curriculum-Vitae?branch=master&service=github)

Basically an overengineered website to show what I am capable of.<br>
Written in `NodeJS` and `Express`.

## Routing
website/ - contains the main page. <br>
website/project/:id - contains a clear description of a project.

## Testing

### Continuous Integration
Since we always want to have the master in a correct state `Travis CI` is used. This helps automatically testing the correctness of the master after a push/merge to it.

### JavaScript Testing
This project will be fully tested, even though testing is not really needed. Fully testing this project will result in minor bugs and glitches being found and fixed, which is always a great thing to add to any project.
The JavaScript testing is done using `chai`. Every JavaScript file that is the connection between the HTML/pug page will merely be tested by a smoke test. Since dom manipulation will be tested using manual visual inspections. Which works way better than testing code for visual effect which are not visible at all.

### Static Analysis
The javascript code should always embrace some standards to make programming a lot easier. `EsLint` provides static analysis for the project.

## Database
The database used is `MySQL`. Always used `MySQL` for the majority of my projects and will continue to do so for this very project. After the final launch updating the project is bothersome for small updates. This is where a database can come in handy to automate that process better. Just insert some more rows into the database and it will automatically be displayed on the website. By using data in the database it is easy to make relations between them and display properly. Which gives the website a more integrated feel.

