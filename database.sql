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

--Dummy Data for product_type 
INSERT INTO "product_type" ("product_name", "cost", "description")
VALUES 
('One-Charge',75,'Power Bank + Jumper Cables'),
('The All4One',149,'35L Backpack with Detachable Stool and Solar Panel'),
('The Bright One',49,'Winter Hat + Headband LED Light Set'),
('WearOne',20,'Short Sleeve T-Shirt' ),
('Gift Card',10,'Gift Card'),
('Gift Card + The Bright One',74,'Gift Card + Winter Hat + Headband LED Light Set');