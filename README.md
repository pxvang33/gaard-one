
# Gaard One
This repo contains  the complete project code for a Prime Academy group project client - Gaard One.

The goal of this project is to allow customers to directly see the impact their purchase has on furthering conservation efforts.  A user with administrative permissions will be able to print QR codes to attach to product tags, which the customer will then be able to scan to view a parcel of land effectively purchased by them for conservation. 
 


# Getting Started
Before you get started, make sure you have the following software installed on your computer:

* An IDE [VSCode is recommended](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/en/)
* [PostrgeSQL](https://www.postgresql.org/)
* [Nodemon](https://nodemon.io/)
* Download the zip file and unpack


# Database 


Create a new database called 'gaard_one'

```SQL
CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT false,
	"employee" BOOLEAN DEFAULT false
);

CREATE TABLE "product_type" (
	"id" SERIAL PRIMARY KEY,
	"product_name" VARCHAR(40) UNIQUE NOT NULL,
	"cost" INTEGER NOT NULL,
	"description" VARCHAR(100),
	"active" BOOLEAN DEFAULT true
);

CREATE TABLE "product" (
	"id" SERIAL PRIMARY KEY,
	"date-time" DATE NOT NULL DEFAULT 'CURRENT_DATE',
	"claimed" BOOLEAN DEFAULT false,
	"printed" BOOLEAN DEFAULT false,
	"product_type_id" INTEGER REFERENCES "product_type"
);

CREATE TABLE "plot" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "person",
	"product_id" INTEGER REFERENCES "product"
);

CREATE TABLE "unit_squares" (
	"id" SERIAL PRIMARY KEY,
	"bl_corner_lat" DECIMAL,
	"bl_corner_lon" DECIMAL,
	"tr_corner_lat" DECIMAL,
	"tr_corner_lon" DECIMAL,
	"plot_id" INTEGER REFERENCES "plot"
);



--This creates  function to determine distance between 2 points
  
-- Function: geo_distance(double precision, double precision, double precision, double precision)

-- DROP FUNCTION geo_distance(double precision, double precision, double precision, double precision);
CREATE OR REPLACE FUNCTION geo_distance(longitude1 double precision, longitude2 double precision, latitude1 double precision, latitude2 double precision)
  RETURNS double precision AS
$BODY$
DECLARE 
delta_longitude DOUBLE PRECISION;
arc_val DOUBLE PRECISION;
chain1 DOUBLE PRECISION;
chain2 DOUBLE PRECISION;
chain3 DOUBLE PRECISION;
result DOUBLE PRECISION;
BEGIN

delta_longitude:=@(longitude1-longitude2);
chain1:=(cos(latitude2)*sin(delta_longitude))^2;
chain2:=(cos(latitude1)*sin(latitude2)-sin(latitude1)*cos(latitude2)*cos(delta_longitude))^2;
chain3:=sin(latitude1)*sin(latitude2)+cos(latitude1)*cos(latitude2)*cos(delta_longitude);
arc_val:=(|/(chain1+chain2))/chain3;
result:= 6335.439*arc_val;
 return result;
END;$BODY$
  LANGUAGE plpgsql IMMUTABLE
  COST 100;
```
# Important
* In [PostMan](https://www.getpostman.com/) another API develelopment software,
or in your browser window on an account with admin privileges
send a `GET` request to `http://localhost:5000/api/unitSq/fishnet` to setup the `"unit_square"` table


If you would like to name the database something else you will need to change `gaard_one` to the name of your new database in `server/modules/pool.js`

# Domain Name
* update the const `BASE_URL` in 
   - /src/components/Admin/ManageQr/PrintQr.js 
   - /src/components/Admin/ManageQr/QrPdfExport.js

  to your URL or <br>
 	localhost:/3000/home/

 
 
# Development Setup
In the terminal 

* Run `npm install`
* Start postgres if not running already by `brew services start postgresql`
* Run  `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

# Lay of the Land

* `scr/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the compiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App


# Authors

* [Tiana Johnson](https://github.com/TianaJohnson)
* [Peng Xue Vang](https://github.com/TianaJohnson)
* [Cody Troop](https://github.com/RAGSOOK)
* [Julie Zembik](https://github.com/juliezembik)
* [Nicholas Heilman](https://github.com/NicholasHeilman)




 



