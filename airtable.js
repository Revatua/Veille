var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyAtAFrpEpIhMVwH'}).base('appoUwKms1DawdP7f');

var template = '<div class="card" style="width: 18rem;">'+
'<img src="" class="card-img-top" alt="">'+
'<div id ="veilleDr"class="card-body">'+
  '<h5 class="card-title">Veille DR</h5>'+
  '<p class="card-text">###Some quick example.###</p>'+
'</div>'+
'<ul class="list-group list-group-flush">'+
  '<li class="list-group-item">###Cras justo odio###</li>'+
  '<li class="list-group-item">###Dapibus ac facilisis in###</li>'+

'</ul>'+
'</div>'+
'</div>';

base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 5,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Date'));
    
    var dateVeille = record.get("Date");
    var subjectVeille = record.get("image");
    var Comment = record.get("Comment");

    var newTemplate = template.replace("###Some quick example.###", dateVeille);
    newTemplate = newTemplate.replace("###Cras justo odio###", subjectVeille);
    newTemplate = newTemplate.replace("###Dapibus ac facilisis in###", Comment );
    
    // newTemplate = newTemplate.replace("###id###",record.id)

   
    $(".card").prepend(newTemplate);
});
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

