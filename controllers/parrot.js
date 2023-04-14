var parrot = require('../models/parrot');
// List of all parrot
exports.parrot_list = async function(req, res) {
    try{
    parr = await parrot.find();
    res.send(parr);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
// for a specific parrot.
exports.parrot_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await parrot.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
// Handle parrot create on POST.
exports.parrot_create_post = async function(req, res) {
    console.log(req.body)
    let document = new parrot();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"parrot_type":"goat", "cost":12, "size":"large"}
    document.parrot_color = req.body.parrot_color;
    document.parrot_weight = req.body.parrot_weight;
    document.parrot_cost = req.body.parrot_cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
// Handle parrot delete form on DELETE.
exports.parrot_delete = function(req, res) {
res.send('NOT IMPLEMENTED: parrot delete DELETE ' + req.params.id);
};
// Handle parrot update form on PUT.
exports.parrot_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await parrot.findById( req.params.id)
    // Do updates of properties
    if(req.body.parrot_color)
    toUpdate.parrot_color = req.body.parrot_color;
    if(req.body.parrot_weight) toUpdate.parrot_weight = req.body.parrot_weight;
    if(req.body.parrot_cost) toUpdate.parrot_cost = req.body.parrot_cost;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
    };

// Handle a show all view
exports.parrot_view_all_Page = async function(req, res) {
    try{
    theparrots = await parrot.find();
    res.render('parrot', { title: 'parrot Search Results', results: theparrots });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };