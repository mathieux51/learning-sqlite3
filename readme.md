# Learning about sqlite

I want to node and sqlite to interact with each other. My goal is to create a table that I can use in petList. I want to be able :
* Create a pet
* Remove a pet
* ...

### About database
 
 A **relational database** is a database that organizes information into one or more tables. 
 A **table** is a collection of data organized into rows and columns. Tables are sometimes referred to as relations.
 A **row** is a single record in a table

 Most common data types are:

* Integer, a positive or negative whole number 
* Text, a text string 
* Date, the date formatted as YYYY-MM-DD for the year, month, and day 
* Real, a decimal value 

```sql
select * from table_name;
.show
```
### Basics

To create a table :

```sql
create table table_name (
  1_column_name data_type
  2_column_name data_type
  3_column_name data_type
  ...
  );
```

Let's create a table for the pets.

```sql
create table pets (
  id integer primary key,
  name text
);
```

`Insert` statement inserts new rows into a table. Let's insert a new pet.

```sql
insert into pets (name) values ("Max");
```

Update a data knowing the id. 

```sql
update pets
set name = "Maxou"
where id = 1;
```

Add a new column to the table. 

```sql
alter table pets add column age integer; 
```

Delete the entire line.

```sql
delete from pets where name = "Maxou";
```

### Like

With `like` it's possible to filter. Let's add two new pets. We want to display the pets with a 'a' in their name.

```sql
insert into pets (name) values ("Shafty");
insert into pets (name) values ("Bogey");
select * from pets where name like '%a%';
```
and the result is :

```bash
id          name        age
----------  ----------  ----------
1           Max
2           Shafty
```
 

### To be continue...

[DerekBanas sqlite3-3](https://www.youtube.com/watch?v=jKpeHIyMotg&ab_channel=DerekBanas "DerekBanas")
