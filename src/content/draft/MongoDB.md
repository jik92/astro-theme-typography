title: MongoDB
date: 2020/04/10 00:00:00
categories:

 - dev
 - db

tags:
 - mongodb
---

* Grammar 

```
.update_one()
# $set/$unset
{ _id: 100 },
{ $set: { <field1>: <value1>, ... } }

.find()
# $or 
{ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } 
# $in
{ quantity: { $in: [20, 50] } }
# $and
{
  "$and": [
		{"$eq": ["$table_name", "$$table_name"]},
		{"$eq": ["$email", request["email"]]},
	]
}
# $not

# $nor
{ $nor: [ { price: 1.99 }, { qty: { $lt: 20 } }, { sale: true } ] }

.collection().filter().aggregate()
# $lookup 连表查询left outer join 
{
  $lookup: {
		"from": "b",
		"as": "a",
		"let": {"b": "$_id"},
		"pipeline": [
			{"$match": {"$expr": {"$eq": ["$_id", "$$_id"]}}},
			{"$project": {"_id": False, "external_id": True}},
		],
}
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}

other
$project
createIndex( { price: 1 } )


```

https://cloud.tencent.com/developer/article/1406529