var request = require("request");
var async = require("async");
var config = require('./config');
var FUNCTIONS = require("./functions.js");
var moment = require('moment');
var multiparty = require('multiparty');
var randomstring = require("random-string");
const fs = require('fs');
const path = require('path');
const utils = require('util');
const readFile = utils.promisify(fs.readFile);


// variables global
var imageFilePath = config.imageFilePath;

module.exports.blog_category_list = blog_category_list;
module.exports.web_blog_category_list = web_blog_category_list;
module.exports.blog_category_dropdown_list = blog_category_dropdown_list;
module.exports.add_blog_category = add_blog_category;
module.exports.blog_category_details = blog_category_details;
module.exports.update_blog_category_status = update_blog_category_status;

module.exports.add_blog = add_blog;
module.exports.blog_web_list = blog_web_list;
module.exports.blog_admin_list = blog_admin_list;
module.exports.update_blog_status = update_blog_status;
module.exports.blog_view = blog_view;


// blogs category

function add_blog_category(userdata, pool, callback) {
    var resultJson = '';
    var name = '';
    var alias = '';
    var slug = '';
    var image = '';
    var priority = '';
    var description = '';
    var id = '';
    var parent_id = '0';
    var tag = '';

    if (typeof userdata.id != 'undefined' && userdata.id != '') {
        id = userdata.id;
    }
    if (typeof userdata.name != 'undefined' && userdata.name != '') {
        name = userdata.name;
    }

    if (typeof userdata.image != 'undefined' && userdata.image != '') {
        image = userdata.image;
    }
    if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
        slug = userdata.slug;
    }

    if (typeof userdata.parent_id != 'undefined' && userdata.parent_id != '') {
        parent_id = userdata.parent_id;
    }
    if (typeof userdata.priority != 'undefined' && userdata.priority != '') {
        priority = userdata.priority;
    }
    if (typeof userdata.description != 'undefined' && userdata.description != '') {
        description = userdata.description;
    }
    if (typeof userdata.tag != 'undefined' && userdata.tag != '') {
        tag = userdata.tag;
    }

    /* ESTABLISH CONNECTION TO DATABASE */
    pool.getConnection(function(err, connection) {
        alias = name.toLowerCase();
        if (id != '') {
            var queryinsert = 'UPDATE blog_categories SET parent_id="' + parent_id + '",name="' + name + '",alias="' + alias + '",slug="' + slug + '",image="' + image + '",priority="' + priority + '",tag="' + tag + '",description="'+description+'" where blog_categories.id="' + id + '"';
        } else {
            var queryinsert = 'INSERT INTO blog_categories SET parent_id="' + parent_id + '",name="' + name + '",alias="' + alias + '",slug="' + slug + '",image="' + image + '",priority="' + priority + '",tag="' + tag + '",description="'+description+'",created= NOW()';
        }
        console.log(queryinsert);
        connection.query(queryinsert, function(errinsert, resultinsert) {
            if (!errinsert) {
                resultJson = '{"replyCode":"success","replyMsg":"Category updated successfully","cmd":"Category"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"Category"}\n';
                console.log(resultJson);
                connection.release();
                callback(400, null, resultJson);
                return;
            }
        });
    });
}


// Update stsutus
function update_blog_category_status(userdata, pool, callback) {
    var resultJson = '';
    var id = '';
    var status = '0'; //0-inactive , 1-active , 2- delete
    var Uquery = '';


    if (typeof userdata.id != 'undefined' && userdata.id != '') {
        id = userdata.id;
    }

    if (typeof userdata.status != 'undefined' && userdata.status != '') {
        status = userdata.status;
    }

    console.log('----------');
    console.log(userdata);

    pool.getConnection(function(err, connection) {
        Uquery = 'UPDATE blog_categories SET status="' + status + '" WHERE id = ' + id + '';
        connection.query(Uquery, function(errinsert) {
            if (!errinsert) {
                resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"update_status_client"}';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"update_status_client"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        });
    });
}


/*category details*/
function blog_category_details(userdata, pool, callback) {
    var resultJson = '';
    var id = '';
    var slug = '';
    if (typeof userdata.id != 'undefined' && userdata.id != '') {
        id = userdata.id;
    }

    if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
        slug = userdata.slug;
    }

    console.log('----------');
    console.log(userdata);

    pool.getConnection(function(err, connection) {
        if (slug != '') {
            //for slug
            var Catquery = 'SELECT * FROM blog_categories WHERE slug="' + slug + '"';
        } else {
            var Catquery = 'SELECT * FROM blog_categories WHERE id="' + id + '"';
        }
        console.log('qq', Catquery)
        connection.query(Catquery, function(errinsert, resultinsert) {
            if (!errinsert) {
                if (resultinsert.length > 0) {
                    var res = resultinsert[0];
                } else {
                    var res = [];
                }
                resultJson = '{"replyCode":"success","replyMsg":"category details","data":' + JSON.stringify(res) + '}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"category_details"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        });
    });
}


function blog_category_list(userdata, pool, callback) {
    var resultJson = '';
    var Cquery = '';
    var parent_id = '0';
    var tag = '';
    var Keyconditoin = '';

    if (typeof userdata.parent_id != 'undefined' && userdata.parent_id != '') {
        parent_id = userdata.parent_id;
    }
    if (typeof userdata.tag != 'undefined' && userdata.tag != '') {
        tag = userdata.tag;
    }
    if (parent_id != '') {
        Keyconditoin += ' AND blog_categories.parent_id = "' + parent_id + '"';
    }
    if (tag != '') {
        Keyconditoin += ' AND blog_categories.tag ="' + tag + '"';
    }
    pool.getConnection(function(err, connection) {
        Cquery = 'SELECT blog_categories.* FROM blog_categories WHERE blog_categories.status !=  "2" ' + Keyconditoin + '';

        console.log(Cquery);
        connection.query(Cquery, function(err, resPro) {
            if (err) {
                resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"blog_category_list"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                if (resPro.length > 0) {
                    var i = 0;
                    async.eachSeries(resPro, function(rec2, loop2) {
                        var parent_id = rec2.id;
                        console.log('parent_id', parent_id);
                        Ctquery = 'SELECT blog_categories.* FROM blog_categories WHERE blog_categories.parent_id =  "' + parent_id + '"';
                        console.log('Ctquery', Ctquery);
                        connection.query(Ctquery, function(errSelpiMG, respROiMG) {
                            if (errSelpiMG) {
                                console.log('errSelpiMG', errSelpiMG);
                                loop2();
                            } else {
                                resPro[i].sub_category = respROiMG;
                                loop2();
                            }
                            i = i + 1;
                        });
                    }, function(errSelPro) {
                        if (errSelPro) {
                            console.log('errSelPro', errSelPro);
                            resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"teacher_schedule_days_list"}\n';
                            connection.release();
                            callback(200, null, resultJson);
                            return;
                        } else {
                            resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":' + JSON.stringify(resPro) + ',"cmd":"blog_category_assign_list"}\n';
                            console.log('res-suceess');
                            connection.release();
                            callback(200, null, resultJson);
                            return;
                        }
                    });
                } else {
                    resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"teacher_schedule_days_list"}\n';
                    console.log('res-suceess');
                    connection.release();
                    callback(200, null, resultJson);
                    return;
                }

            }
        })
    });
}

function web_blog_category_list(userdata, pool, callback) {
    var resultJson = '';
    var Cquery = '';
    var parent_id = '0';
    var Keyconditoin = '';
    if (typeof userdata.parent_id != 'undefined' && userdata.parent_id != '') {
        parent_id = userdata.parent_id;
    }
   
    if (parent_id != '') {
        Keyconditoin += ' AND blog_categories.parent_id = "' + parent_id + '"';
    }
  
    pool.getConnection(function(err, connection) {
        Cquery = 'SELECT blog_categories.* FROM blog_categories WHERE blog_categories.status =  "1" ' + Keyconditoin + '';

        console.log(Cquery);
        connection.query(Cquery, function(err, ordData) {
            if (err) {
                resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"blog_category_list"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {

                resultJson = '{"replyCode":"success","replyMsg":"blog_category_list Details","data":' + JSON.stringify(ordData) + ',"cmd":"blog_category_list"}\n';
                console.log(resultJson);
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        })
    });
}

function blog_category_dropdown_list(userdata, pool, callback) {
    var resultJson = '';
    var Cquery = '';
    var parent_id = '0';
    var Keyconditoin = '';
    if (typeof userdata.parent_id != 'undefined' && userdata.parent_id != '') {
        parent_id = userdata.parent_id;
    }
   
    if (parent_id != '') {
        Keyconditoin += ' AND blog_categories.parent_id = "' + parent_id + '"';
    }
  
    pool.getConnection(function(err, connection) {
        Cquery = 'SELECT blog_categories.* FROM blog_categories WHERE blog_categories.status =  "1"';

        console.log(Cquery);
        connection.query(Cquery, function(err, ordData) {
            if (err) {
                resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"blog_category_list"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {

                resultJson = '{"replyCode":"success","replyMsg":"blog_category_list Details","data":' + JSON.stringify(ordData) + ',"cmd":"blog_category_list"}\n';
                console.log(resultJson);
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        })
    });
}

// Blogs

function add_blog(userdata, pool, callback) {
    var resultJson = '';
    var id = '';
    var blog_category_id = '';
    var title = '';
    var description = '';
    var html_description = '';
    var image = '';
    var slug = '';
    var priority = '';
    var rating = '';
    var meta_title = '';
    var meta_keyword = '';
    var meta_description = '';

    if (typeof userdata.meta_title != 'undefined' && userdata.meta_title != '') {
        meta_title = userdata.meta_title;
    }
    
    if (typeof userdata.meta_keyword != 'undefined' && userdata.meta_keyword != '') {
        meta_keyword = userdata.meta_keyword;
    }
    if (typeof userdata.meta_description != 'undefined' && userdata.meta_description != '') {
        meta_description = userdata.meta_description;
    }
    if (typeof userdata.id != 'undefined' && userdata.id != '') {
        id = userdata.id;
    }

    if (typeof userdata.title != 'undefined' && userdata.title != '') {
        title = userdata.title;
    }

    if (typeof userdata.blog_category_id != 'undefined' && userdata.blog_category_id != '') {
        blog_category_id = userdata.blog_category_id;
    }

    if (typeof userdata.description != 'undefined' && userdata.description != '') {
        //description = userdata.description;
        description = userdata.description.replace(/"/g, "'");
    }

    if (typeof userdata.html_description != 'undefined' && userdata.html_description != '') {
        //html_description = userdata.html_description;
        html_description = userdata.html_description.replace(/"/g, "'");
    }

    if (typeof userdata.image != 'undefined' && userdata.image != '') {
        image = userdata.image;
    }

    if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
        slug = userdata.slug;
    }
  
    if (typeof userdata.priority != 'undefined' && userdata.priority != '') {
        priority = userdata.priority;
    }
    if (typeof userdata.rating != 'undefined' && userdata.rating != '') {
        rating = userdata.rating;
    }

    /* ESTABLISH CONNECTION TO DATABASE */
    pool.getConnection(function(err, connection) {
        if (id != '') {
            var queryinsert = 'UPDATE blogs SET title="' + title + '",blog_category_id="' + blog_category_id + '" ,description="' + description + '",html_description="' + html_description + '",image="' + image + '",priority="' + priority + '",slug="' + slug + '",rating="'+rating+'",meta_description="'+meta_description+'",meta_keyword="'+meta_keyword+'",meta_title="'+meta_title+'" where blogs.id="' + id + '"';
        } else {
            var queryinsert = 'INSERT INTO blogs SET title="' + title + '",blog_category_id="' + blog_category_id + '",description="' + description + '",html_description="' + html_description + '",image="' + image + '",priority="' + priority + '",slug="' + slug + '",rating="'+rating+'",meta_description="'+meta_description+'",meta_keyword="'+meta_keyword+'",meta_title="'+meta_title+'"';
        }
        console.log(queryinsert);
        connection.query(queryinsert, function(errinsert, resultinsert) {
            if (!errinsert) {
                resultJson = '{"replyCode":"success","replyMsg":"blog updated successfully","cmd":"add_blog","data":' + JSON.stringify(resultinsert) + '}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"add_blog"}\n';
                console.log(resultJson);
                connection.release();
                callback(400, null, resultJson);
                return;
            }
        });
    });
}


/* blog List */
function blog_admin_list(userdata, pool, callback) {
    var resultJson = '';
    var keyword = '';
    var Keyconditoin = '';
   
    var start = '0';
    var limit = '100';
    var limitStr = '';
    var sort_by = '';
    var order_by = '';

    if (typeof userdata.start != 'undefined' && userdata.start != '') {
        start = userdata.start;
    }

    if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
        limit = userdata.limit;
    }
    if (typeof userdata.sort_by != 'undefined' && userdata.sort_by != '') {
        sort_by = userdata.sort_by;
    }


    if (limit != '') {
        limitStr = 'LIMIT ' + start + ', ' + limit + '';
    }
    if (sort_by != '') {
        order_by = 'ORDER BY ' + sort_by + '';
    } else {
        order_by = 'ORDER BY id DESC';
    }

    if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
        keyword = userdata.keyword;
    }

    pool.getConnection(function(err, connection) {

        if (keyword != '') {
            Keyconditoin = ' AND blogs.title LIKE  "%' + keyword + '%"';
        }
      
        var Catquery = 'SELECT blogs.*,blog_categories.name,(SELECT COUNT(id) from blogs where blogs.status !="2" ' + Keyconditoin + ') as totalcount FROM blogs  LEFT JOIN blog_categories as blog_categories ON blog_categories.id = blogs.blog_category_id WHERE blogs.status !="2" ' + Keyconditoin + ' ' + order_by + ' ' + limitStr + '';

        console.log('Catquery', Catquery);

        connection.query(Catquery, function(err, res) {
            if (err) {
                resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"blog_admin_list"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"success","replyMsg":"Blog list found", "data":' + JSON.stringify(res) + ',"cmd":"blog_admin_list"}\n';
                console.log(resultJson);
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        });
    });
}


/* blog List */
function blog_web_list(userdata, pool, callback) {
    var resultJson = '';
    var keyword = '';
    var blog_category_id = '0';
    var Keyconditoin = '';
   
    var start = '0';
    var limit = '100';
    var limitStr = '';
    var sort_by = '';
    var order_by = '';

    if (typeof userdata.start != 'undefined' && userdata.start != '') {
        start = userdata.start;
    }

    if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
        limit = userdata.limit;
    }
    if (typeof userdata.sort_by != 'undefined' && userdata.sort_by != '') {
        sort_by = userdata.sort_by;
    }


    if (limit != '') {
        limitStr = 'LIMIT ' + start + ', ' + limit + '';
    }
    if (sort_by != '') {
        order_by = 'ORDER BY ' + sort_by + '';
    } else {
        order_by = 'ORDER BY id DESC';
    }

    if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
        keyword = userdata.keyword;
    }
    if (typeof userdata.blog_category_id != 'undefined' && userdata.blog_category_id != '') {
        blog_category_id = userdata.blog_category_id;
    }

    pool.getConnection(function(err, connection) {

        if (keyword != '') {
            Keyconditoin += ' AND blogs.title LIKE  "%' + keyword + '%"';
        }

        if (blog_category_id != '0') {
            Keyconditoin += ' AND blogs.blog_category_id ="'+blog_category_id+'"';
        }
      
        var Catquery = 'SELECT blogs.* from blogs WHERE status ="1" ' + Keyconditoin + ' ' + order_by + ' ' + limitStr + '';

        console.log('Catquery', Catquery);

        connection.query(Catquery, function(err, res) {
            if (err) {
                resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"blog_admin_list"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"success","replyMsg":"Blog list found", "data":' + JSON.stringify(res) + ',"cmd":"blog_admin_list"}\n';
                console.log(resultJson);
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        });
    });
}


//update blog status
function update_blog_status(userdata, pool, callback) {
    var resultJson = '';
    var strJson = '';

    var Cquery = '';
    var id = '';
    var status = '0'; //0-inactive,1-active,2-delete

    if (typeof userdata.id != 'undefined' && userdata.id != '') {
        id = userdata.id;
    }

    if (typeof userdata.status != 'undefined' && userdata.status != '') {
        status = userdata.status;
    }
    pool.getConnection(function(err, connection) {

        squery = 'UPDATE blogs SET status = "' + status + '" WHERE id = "' + id + '"';
        connection.query(squery, function(errselect, resultselect) {
            if (!errselect) {
                console.log(resultselect);
                resultJson = '{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_blog_status"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {
                resultJson = '{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_blog_status"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        });
    });
}


/* blog Details */
function blog_view(userdata, pool, callback) {
    var resultJson = '';

    var id = '';
    var slug = '';
    if (typeof userdata.id != 'undefined' && userdata.id != '') {
        id = userdata.id;
    }
   
    if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
        slug = userdata.slug;
    }
   
    pool.getConnection(function(err, connection) {
        if (slug != '') {
            var detailsquery = 'SELECT * FROM blogs WHERE slug="' + slug + '"';
        } else {
            var detailsquery = 'SELECT * FROM blogs WHERE id="' + id + '"';
        }

        console.log('detailsquery', detailsquery);
        connection.query(detailsquery, function(errSelDetails, resSelDetails) {
            if (errSelDetails) {
                resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"blog_view"}\n';
                connection.release();
                callback(200, null, resultJson);
                return;
            } else {

                resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":' + JSON.stringify(resSelDetails[0]) + ',"cmd":"blog_view"}\n';
                console.log(resultJson);
                connection.release();
                callback(200, null, resultJson);
                return;
            }
        });
    });
}
