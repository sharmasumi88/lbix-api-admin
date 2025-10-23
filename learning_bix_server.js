var fs                      = require('fs-extra'),
    path                    = require('path');
    config                  = require('./config'),
    PORT                    = config.port,
    Users                   = require('./users.js'),
    Admin                   = require('./admin.js'),
    Blog                    = require('./blogs.js'),
    async                   = require("async");
    https                   = require("https");

// node modules
var logger                  = require('morgan');
var express                 = require('express');
var bodyParser              = require('body-parser');
var mysql                   = require('mysql');
var pool                    = mysql.createPool({
                                host: config.mysql_host,
                                user: config.mysql_user,
                                password: config.mysql_password,
                                database: config.mysql_database,
                                timezone: 'Asia/Calcutta'
                            });
//const { BlobServiceClient } = require('azure-storage');
const { BlobServiceClient } = require("@azure/storage-blob");


//const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=learningbixstorage098;AccountKey=H+TwnMhB3p5FVh4y3VrCJnHYGDCK59GgV4Er2LSrXVA7gvIYvQWfxrx9vobNDhHK8eCOBI+3Cmv9+ASt4Y6EtQ==;EndpointSuffix=core.windows.net";

const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=learningbixcom;AccountKey=UeY6ZvRWWVmzWCSR6Uipt9b1r6t/wJmHn+a2vAk9w/h1KhK3rPSUCHD2OS+PgC2d2ND1DyFBaIDH+AStje1MyQ==;EndpointSuffix=core.windows.net";


const connectionToken = "sp=r&st=2024-06-04T03:18:51Z&se=2024-06-04T11:18:51Z&sv=2022-11-02&sr=c&sig=JMUKYJQDr91XBj5iUk3Eh9x3Oaua4iSbn1DlowPxi88%3D";

//const connectionToken = "sp=r&st=2024-06-04T03:18:51Z&se=2024-06-04T11:18:51Z&sv=2022-11-02&sr=c&sig=JMUKYJQDr91XBj5iUk3Eh9x3Oaua4iSbn1DlowPxi88%3D";


                                         
process.env.TZ = 'Asia/Calcutta';                             
pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});


// parse body data
var app = express();
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

var privateKey = fs.readFileSync('keys/privkey.pem').toString();
var certificate = fs.readFileSync('keys/cert.pem').toString();
var caf = fs.readFileSync('keys/chain.pem').toString();
var credentials = {key: privateKey, cert: certificate,ca:caf};

var httpsServer = https.createServer(credentials, app);

//var httpsServer = http.createServer( app);


var server = httpsServer.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log(config.SITE_TITLE, ' server listening on port', port);
});

app.use(function (req, res, next) {
    var userdata = req.body;
    if (config.DEBUG > 0)
        console.log('####################################### ' + req.url + ' API IS CALLED WITH DATA: ', userdata);
        //console.log('headers',JSON.stringify(req.headers));
    fs.appendFile("postdata.txt",JSON.stringify(userdata), function(err22) {
    
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/* upload file */
const multer = require('multer');

// Define allowed file types

const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     ///var/www/html/mws/uploads
//     cb(null,config.URL_UPLOAD)
//     },
//     filename: function (req, file, cb) {
//         console.log('file',file)
//     //cb(null, file.fieldname + '-' + Date.now()+'.jpeg')
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })


// Define custom file filter function
const fileFilter = (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only PDF, JPEG, PNG, JPG, XLS, XLSX files are allowed.'), false); // Reject file
    }
};


// var upload = multer({ 
//     storage: storage,
//     fileFilter: fileFilter
// });


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "attachment" + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });


app.post("/upload_file", upload.single('attachment'), async (req, res, next) => {
    if (req.method === 'POST') {
        const file = req.file;
        if (!file) {
            return res.status(400).send({ status: false, msg: 'No file uploaded' });
        }

        const fileMime = file.mimetype;
        const cType = fileMime === 'application/pdf' ? 'application/pdf' : 'image/jpg';
        
        try {
            const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
            const containerName = 'learningbixcom';
            const containerClient = blobServiceClient.getContainerClient(containerName);
            
            // Create the container if it does not exist
            await containerClient.createIfNotExists();

            const blobName = file.filename;  // using the file's original name as the blob name
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const filePath = path.join(__dirname, 'uploads', file.filename);

            console.log(`Uploading to Azure storage as blob:\n\t${blobName}`);
            await blockBlobClient.uploadFile(filePath);
            console.log('Upload successful');

            // Optionally, you can delete the local file after upload
            // fs.unlink(filePath, (err) => {
            //     if (err) {
            //         console.error('Error deleting the local file:', err);
            //     }
            // });

            return res.send({ status: true, msg: 'File uploaded successfully', name: file.filename });
        } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).send({ status: false, msg: 'Error uploading file', error: error.message });
        }
    } else {
        return res.status(405).send({ status: false, msg: 'Method not allowed' });
    }
});
//--------------------- USER APIS ---------------------//

app.post('/otp_generate', function (req, res) {
    var userdata = req.body;
    
    Users.otp_generate(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});


app.post('/otp_verify', function (req, res) {
    var userdata = req.body;
    Users.otp_verify(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});


app.post('/user_forgot_password', function (req, res) {
    var userdata = req.body;
    Users.user_forgot_password(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/reset_password', function (req, res) {
    
    var userdata = req.body;
    Users.reset_password(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
          res.status(http_status_code).send(response);
    });
});

app.post('/register_student', function (req, res) {
    
    var userdata = req.body;
    Users.register_student(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
          res.status(http_status_code).send(response);
    });
});

app.post('/update_student_profile', function (req, res) {
    var userdata = req.body;
    Users.update_student_profile(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_profile_image', function (req, res) {
    var userdata = req.body;
    Users.update_profile_image(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/demo_class_time_slots', function (req, res) {
    var userdata = req.body;
    Users.demo_class_time_slots(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/register_teacher', function (req, res) {
    var userdata = req.body;
    Users.register_teacher(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_teacher_profile', function (req, res) {
    var userdata = req.body;
    Users.update_teacher_profile(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/demo_class_details', function (req, res) {
    var userdata = req.body;
    Users.demo_class_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_bank_details', function (req, res) {
    var userdata = req.body;
    Users.add_bank_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/user_bank_details', function (req, res) {
    var userdata = req.body;
    Users.user_bank_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teacher_demo_class_list', function (req, res) {
    var userdata = req.body;
    Users.teacher_demo_class_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teacher_schedule_days_list', function (req, res) {
    var userdata = req.body;
    Users.teacher_schedule_days_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teacher_schedule_slots_list', function (req, res) {
    var userdata = req.body;
    Users.teacher_schedule_slots_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teacher_schedule_slots_list', function (req, res) {
    var userdata = req.body;
    Users.teacher_schedule_slots_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_schedule_day_status', function (req, res) {
    var userdata = req.body;
    Users.update_schedule_day_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_schedule_slot_status', function (req, res) {
    var userdata = req.body;
    Users.update_schedule_slot_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/check_student_subscription', function (req, res) {
    var userdata = req.body;
    Users.check_student_subscription(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/student_teacher_schedule_days_list', function (req, res) {
    var userdata = req.body;
    Users.student_teacher_schedule_days_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_teacher_schedule_slots_list', function (req, res) {
    var userdata = req.body;
    Users.student_teacher_schedule_slots_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_lessons_list', function (req, res) {
    var userdata = req.body;
    Users.student_lessons_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/book_slot_student', function (req, res) {
    var userdata = req.body;
    Users.book_slot_student(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/cancle_slot_booking', function (req, res) {
    var userdata = req.body;
    Users.cancle_slot_booking(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/slot_booking_details', function (req, res) {
    var userdata = req.body;
    Users.slot_booking_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teacher_classes_list', function (req, res) {
    var userdata = req.body;
    Users.teacher_classes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/mark_chapter_complete', function (req, res) {
    var userdata = req.body;
    Users.mark_chapter_complete(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_projects_list', function (req, res) {
    var userdata = req.body;
    Users.student_projects_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_quizzes_list', function (req, res) {
    var userdata = req.body;
    Users.student_quizzes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/student_submit_project_link', function (req, res) {
    var userdata = req.body;
    Users.student_submit_project_link(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
// ADMIN_DASHBOARD



app.post('/update_user_comment', function (req, res) {
    var userdata = req.body;
    Admin.update_user_comment(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/projects_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.projects_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/classes_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.classes_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});


app.post('/quizzes_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.quizzes_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/category_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.category_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/category_list', function (req, res) {
    var userdata = req.body;
    Admin.category_list(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/add_category', function (req, res) {
    var userdata = req.body;
    Admin.add_category(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/category_details', function (req, res) {
    var userdata = req.body;
    Admin.category_details(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/update_category_status', function (req, res) {
    var userdata = req.body;
    Admin.update_category_status(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});


app.post('/admin_login', function (req, res) {
    var userdata = req.body;
    Admin.admin_login(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/forgot_password', function (req, res) {
    var userdata = req.body;
    Admin.forgot_password(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_change_password', function (req, res) {
    var userdata = req.body;
    Admin.admin_change_password(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_admin_profile', function (req, res) {
    var userdata = req.body;
    Admin.update_admin_profile(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/sub_admin_list', function (req, res) {
    var userdata = req.body;
    Admin.sub_admin_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/add_subadmin', function (req, res) {
    var userdata = req.body;
    Admin.add_subadmin(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_subadmin', function (req, res) {
    var userdata = req.body;
    Admin.update_subadmin(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_subadmin_status', function (req, res) {
    var userdata = req.body;
    Admin.update_subadmin_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/subadmin_details', function (req, res) {
    var userdata = req.body;
    Admin.subadmin_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/role_access_list', function (req, res) {
    var userdata = req.body;
    Admin.role_access_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_role_access', function (req, res) {
    var userdata = req.body;
    Admin.add_role_access(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_role_access', function (req, res) {
    var userdata = req.body;
    Admin.update_role_access(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_role_access_status', function (req, res) {
    var userdata = req.body;
    Admin.update_role_access_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/role_details', function (req, res) {
    var userdata = req.body;
    Admin.role_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_banner_image', function (req, res) {
    var userdata = req.body;
    Admin.add_banner_image(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/banner_details', function (req, res) {
    var userdata = req.body;
    Admin.banner_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_banner_status', function (req, res) {
    var userdata = req.body;
    Admin.update_banner_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/coupon_list', function (req, res) {
    var userdata = req.body;
    Admin.coupon_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_coupon', function (req, res) {
    var userdata = req.body;
    Admin.add_coupon(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_coupon_status', function (req, res) {
    var userdata = req.body;
    Admin.update_coupon_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_cms', function (req, res) {
    var userdata = req.body;
    Admin.add_cms(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_cms_status', function (req, res) {
    var userdata = req.body;
    Admin.update_cms_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/cms_details', function (req, res) {
    var userdata = req.body;
    Admin.cms_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/cms_list', function (req, res) {
    var userdata = req.body;
    Admin.cms_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/certificates_list', function (req, res) {
    var userdata = req.body;
    Admin.certificates_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_certificate', function (req, res) {
    var userdata = req.body;
    Admin.add_certificate(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/certificate_details', function (req, res) {
    var userdata = req.body;
    Admin.certificate_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_certificate_status', function (req, res) {
    var userdata = req.body;
    Admin.update_certificate_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/banner_list', function (req, res) {
    var userdata = req.body;
    Admin.banner_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/faqs_details', function (req, res) {
    var userdata = req.body;
    Admin.faqs_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_faqs_status', function (req, res) {
    var userdata = req.body;
    Admin.update_faqs_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_faqs', function (req, res) {
    var userdata = req.body;
    Admin.add_faqs(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_courses', function (req, res) {
    var userdata = req.body;
    Admin.add_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/courses_details', function (req, res) {
    var userdata = req.body;
    Admin.courses_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_courses_status', function (req, res) {
    var userdata = req.body;
    Admin.update_courses_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
         //console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
           // console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/classes_list', function (req, res) {
    var userdata = req.body;
    Admin.classes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_classes', function (req, res) {
    var userdata = req.body;
    Admin.add_classes(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/classes_details', function (req, res) {
    var userdata = req.body;
    Admin.classes_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_classes_status', function (req, res) {
    var userdata = req.body;
    Admin.update_classes_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/age_group_list', function (req, res) {
    var userdata = req.body;
    Admin.age_group_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_age_group', function (req, res) {
    var userdata = req.body;
    Admin.add_age_group(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/age_group_details', function (req, res) {
    var userdata = req.body;
    Admin.age_group_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_age_group_status', function (req, res) {
    var userdata = req.body;
    Admin.update_age_group_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/send_notification', function (req, res) {
    var userdata = req.body;
    Admin.send_notification(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/notifications_list', function (req, res) {
    var userdata = req.body;
    Admin.notifications_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/notifications_delete', function (req, res) {
    var userdata = req.body;
    Admin.notifications_delete(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/supports_list', function (req, res) {
    var userdata = req.body;
    Admin.supports_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/quizzes_list', function (req, res) {
    var userdata = req.body;
    Admin.quizzes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_quizzes', function (req, res) {
    var userdata = req.body;
    Admin.add_quizzes(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/quizzes_details', function (req, res) {
    var userdata = req.body;
    Admin.quizzes_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_quizzes_status', function (req, res) {
    var userdata = req.body;
    Admin.update_quizzes_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/quizzes_questions_list', function (req, res) {
    var userdata = req.body;
    Admin.quizzes_questions_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_quizzes_questions', function (req, res) {
    var userdata = req.body;
    Admin.add_quizzes_questions(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/quizzes_questions_details', function (req, res) {
    var userdata = req.body;
    Admin.quizzes_questions_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_quizzes_questions_status', function (req, res) {
    var userdata = req.body;
    Admin.update_quizzes_questions_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/projects_list', function (req, res) {
    var userdata = req.body;
    Admin.projects_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_project', function (req, res) {
    var userdata = req.body;
    Admin.add_project(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/project_details', function (req, res) {
    var userdata = req.body;
    Admin.project_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_projects_status', function (req, res) {
    var userdata = req.body;
    Admin.update_projects_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_chapters_list', function (req, res) {
    var userdata = req.body;
    Admin.course_chapters_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_chapters_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.course_chapters_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_course_chapter', function (req, res) {
    var userdata = req.body;
    Admin.add_course_chapter(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_chapter_details', function (req, res) {
    var userdata = req.body;
    Admin.course_chapter_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_course_chapters_status', function (req, res) {
    var userdata = req.body;
    Admin.update_course_chapters_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/chapter_lessons_list', function (req, res) {
    var userdata = req.body;
    Admin.chapter_lessons_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_chapter_lesson', function (req, res) {
    var userdata = req.body;
    Admin.add_chapter_lesson(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/chapter_lesson_details', function (req, res) {
    var userdata = req.body;
    Admin.chapter_lesson_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_chapter_lessons_status', function (req, res) {
    var userdata = req.body;
    Admin.update_chapter_lessons_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/view_course_info', function (req, res) {
    var userdata = req.body;
    Admin.view_course_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/view_chapter_lessons_info', function (req, res) {
    var userdata = req.body;
    Admin.view_chapter_lessons_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/view_quiz_info', function (req, res) {
    var userdata = req.body;
    Users.view_quiz_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/view_quiz_info_admin', function (req, res) {
    var userdata = req.body;
    Admin.view_quiz_info_admin(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_demo_class_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_demo_class_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_demo_class_details', function (req, res) {
    var userdata = req.body;
    Admin.admin_demo_class_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teachers_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.teachers_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/assign_teacher_demo_class', function (req, res) {
    var userdata = req.body;
    Admin.assign_teacher_demo_class(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/info_demo_class_settings', function (req, res) {
    var userdata = req.body;
    Admin.info_demo_class_settings(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_demo_class_settings', function (req, res) {
    var userdata = req.body;
    Admin.update_demo_class_settings(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/courses_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.courses_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/user_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.user_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/age_group_list_dropdown', function (req, res) {
    var userdata = req.body;
    Admin.age_group_list_dropdown(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_subscription_list', function (req, res) {
    var userdata = req.body;
    Admin.course_subscription_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/activities_list', function (req, res) {
    var userdata = req.body;
    Admin.activities_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_activities', function (req, res) {
    var userdata = req.body;
    Admin.add_activities(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/activities_details', function (req, res) {
    var userdata = req.body;
    Admin.activities_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_activities_status', function (req, res) {
    var userdata = req.body;
    Admin.update_activities_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_points_settings', function (req, res) {
    var userdata = req.body;
    Admin.update_points_settings(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/info_points_settings', function (req, res) {
    var userdata = req.body;
    Admin.info_points_settings(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_info_list', function (req, res) {
    var userdata = req.body;
    Admin.course_info_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_course_info', function (req, res) {
    var userdata = req.body;
    Admin.add_course_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_info_details', function (req, res) {
    var userdata = req.body;
    Admin.course_info_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_course_info_status', function (req, res) {
    var userdata = req.body;
    Admin.update_course_info_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_faq_list', function (req, res) {
    var userdata = req.body;
    Admin.course_faq_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_course_faq', function (req, res) {
    var userdata = req.body;
    Admin.add_course_faq(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_faq_details', function (req, res) {
    var userdata = req.body;
    Admin.course_faq_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_course_faq_status', function (req, res) {
    var userdata = req.body;
    Admin.update_course_faq_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_testimonials_list', function (req, res) {
    var userdata = req.body;
    Admin.student_testimonials_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_student_testimonials', function (req, res) {
    var userdata = req.body;
    Admin.add_student_testimonials(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_testimonials_details', function (req, res) {
    var userdata = req.body;
    Admin.student_testimonials_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_student_testimonials_status', function (req, res) {
    var userdata = req.body;
    Admin.update_student_testimonials_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/enquiries_list', function (req, res) {
    var userdata = req.body;
    Admin.enquiries_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_course_achievement', function (req, res) {
    var userdata = req.body;
    Admin.add_course_achievement(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_achievement_details', function (req, res) {
    var userdata = req.body;
    Admin.course_achievement_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_course_achievement_status', function (req, res) {
    var userdata = req.body;
    Admin.update_course_achievement_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/course_achievement_list', function (req, res) {
    var userdata = req.body;
    Admin.course_achievement_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/group_post_list', function (req, res) {
    var userdata = req.body;
    Users.group_post_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/like_post', function (req, res) {
    var userdata = req.body;
    Users.like_post(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/post_comment', function (req, res) {
    var userdata = req.body;
    Users.post_comment(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/delete_post', function (req, res) {
    var userdata = req.body;
    Users.delete_post(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/delete_post_comment', function (req, res) {
    var userdata = req.body;
    Users.delete_post_comment(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/report_post_abuse', function (req, res) {
    var userdata = req.body;
    Users.report_post_abuse(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/group_post_details', function (req, res) {
    var userdata = req.body;
    Users.group_post_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/my_orders', function (req, res) {
    var userdata = req.body;
    Users.my_orders(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/self_page_courses_list', function (req, res) {
    var userdata = req.body;
    Users.self_page_courses_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/live_courses_list', function (req, res) {
    var userdata = req.body;
    Users.live_courses_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/student_subscription', function (req, res) {
    var userdata = req.body;
    Users.student_subscription(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/web_student_testimonials_list', function (req, res) {
    var userdata = req.body;
    Users.web_student_testimonials_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/send_feedback', function (req, res) {
    var userdata = req.body;
    Users.send_feedback(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_track_info', function (req, res) {
    var userdata = req.body;
    Users.student_track_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_weekly_status', function (req, res) {
    var userdata = req.body;
    Users.student_weekly_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/pix_contents_list', function (req, res) {
    var userdata = req.body;
    Admin.pix_contents_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_pix_contents', function (req, res) {
    var userdata = req.body;
    Admin.add_pix_contents(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/pix_contents_details', function (req, res) {
    var userdata = req.body;
    Admin.pix_contents_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_pix_contents_status', function (req, res) {
    var userdata = req.body;
    Admin.update_pix_contents_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/bonus_classes_list', function (req, res) {
    var userdata = req.body;
    Users.bonus_classes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/category_classes_list', function (req, res) {
    var userdata = req.body;
    Users.category_classes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/day_live_classes_list', function (req, res) {
    var userdata = req.body;
    Users.day_live_classes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/teacher_payout_details', function (req, res) {
    var userdata = req.body;
    Admin.teacher_payout_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/create_adjustment', function (req, res) {
    var userdata = req.body;
    Admin.create_adjustment(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/apply_coupon', function (req, res) {
    var userdata = req.body;
    Users.apply_coupon(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/social_login', function (req, res) {
    var userdata = req.body;
    Users.social_login(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

// ----------------------------work madan----------

app.post('/update_course_start_date', function (req, res) {
    var userdata = req.body;
    Admin.update_course_start_date(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/update_subscrption_course', function (req, res) {
    var userdata = req.body;
    Admin.update_subscrption_course(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_coupon_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_list_dropdown', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_dropdown(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_add_coupon', function (req, res) {
    var userdata = req.body;
    Admin.admin_add_coupon(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_details', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_update_coupon_status', function (req, res) {
    var userdata = req.body;
    Admin.admin_update_coupon_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_coupon_list_users', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_users(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_add_coupon_users', function (req, res) {
    var userdata = req.body;
    Admin.admin_add_coupon_users(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_details_users', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_details_users(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_update_coupon_status_users', function (req, res) {
    var userdata = req.body;
    Admin.admin_update_coupon_status_users(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_list_dropdown_users', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_dropdown_users(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/admin_coupon_list_courses', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_list_dropdown_courses', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_dropdown_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_add_coupon_courses', function (req, res) {
    var userdata = req.body;
    Admin.admin_add_coupon_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_details_courses', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_details_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_update_coupon_status_courses', function (req, res) {
    var userdata = req.body;
    Admin.admin_update_coupon_status_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/admin_coupon_list_age_groups', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_age_groups(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_update_coupon_status_age_groups', function (req, res) {
    var userdata = req.body;
    Admin.admin_update_coupon_status_age_groups(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_list_dropdown_age_groups', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_list_dropdown_age_groups(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_add_coupon_age_groups', function (req, res) {
    var userdata = req.body;
    Admin.admin_add_coupon_age_groups(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_coupon_details_age_groups', function (req, res) {
    var userdata = req.body;
    Admin.admin_coupon_details_age_groups(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/all_age_group_list_dropdown', function (req, res) {
    var userdata = req.body;
    Admin.all_age_group_list_dropdown(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_course_shipping_no', function (req, res) {
    var userdata = req.body;
    Admin.update_course_shipping_no(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/coupon_user_list', function (req, res) {
    var userdata = req.body;
    Admin.coupon_user_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/duplicate_course', function (req, res) {
    var userdata = req.body;
    Admin.duplicate_course(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/generate_invoice', function (req, res) {
    var userdata = req.body;
    Users.generate_invoice(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/get_tracking_info', function (req, res) {
    var userdata = req.body;
    Users.get_tracking_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/country_list', function (req, res) {
    var userdata = req.body;
    Admin.country_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/state_list', function (req, res) {
    var userdata = req.body;
    Admin.state_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/city_list', function (req, res) {
    var userdata = req.body;
    Admin.city_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_school_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_school_list_dropdown', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_list_dropdown(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_add_school', function (req, res) {
    var userdata = req.body;
    Admin.admin_add_school(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_update_school_status', function (req, res) {
    var userdata = req.body;
    Admin.admin_update_school_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/admin_school_commission_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_commission_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_school_commission_list_dropdown', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_commission_list_dropdown(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_add_school_commission', function (req, res) {
    var userdata = req.body;
    Admin.admin_add_school_commission(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_school_commission_details', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_commission_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/admin_update_school_commission_status', function (req, res) {
    var userdata = req.body;
    Admin.admin_update_school_commission_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/add_assessments', function (req, res) {
    var userdata = req.body;
    Admin.add_assessments(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/assessments_list', function (req, res) {
    var userdata = req.body;
    Admin.assessments_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/assessments_details', function (req, res) {
    var userdata = req.body;
    Admin.assessments_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/update_assessments_status', function (req, res) {
    var userdata = req.body;
    Admin.update_assessments_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_assessment_questions', function (req, res) {
    var userdata = req.body;
    Admin.add_assessment_questions(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/assessment_questions_list', function (req, res) {
    var userdata = req.body;
    Admin.assessment_questions_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/assessment_questions_details', function (req, res) {
    var userdata = req.body;
    Admin.assessment_questions_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/update_assessment_questions_status', function (req, res) {
    var userdata = req.body;
    Admin.update_assessment_questions_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_student_assessments', function (req, res) {
    var userdata = req.body;
    Admin.add_student_assessments(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/student_assessments_list', function (req, res) {
    var userdata = req.body;
    Admin.student_assessments_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/student_assessments_details', function (req, res) {
    var userdata = req.body;
    Admin.student_assessments_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/update_student_assessments_status', function (req, res) {
    var userdata = req.body;
    Admin.update_student_assessments_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_assessment_marks', function (req, res) {
    var userdata = req.body;
    Admin.add_assessment_marks(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/assessment_marks_list', function (req, res) {
    var userdata = req.body;
    Admin.assessment_marks_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/assessment_marks_details', function (req, res) {
    var userdata = req.body;
    Admin.assessment_marks_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/update_assessment_marks_status', function (req, res) {
    var userdata = req.body;
    Admin.update_assessment_marks_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_student_assessment_summary', function (req, res) {
    var userdata = req.body;
    Admin.add_student_assessment_summary(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/student_assessment_summary_list', function (req, res) {
    var userdata = req.body;
    Admin.student_assessment_summary_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/student_assessment_summary_details', function (req, res) {
    var userdata = req.body;
    Admin.student_assessment_summary_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/update_student_assessment_summary_status', function (req, res) {
    var userdata = req.body;
    Admin.update_student_assessment_summary_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/assessments_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.assessments_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/sections_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.sections_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_school_payout_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_payout_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_school_generated_payout_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_school_generated_payout_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/generate_school_payout', function (req, res) {
    var userdata = req.body;
    Admin.generate_school_payout(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/school_reset_password', function (req, res) {
    var userdata = req.body;
    Users.school_reset_password(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/fetch_assesment_report_student', function (req, res) {
    var userdata = req.body;
    Admin.fetch_assesment_report_student(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_user_generated_payout_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_user_generated_payout_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/admin_user_wallet_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_user_wallet_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/generate_user_payout', function (req, res) {
    var userdata = req.body;
    Admin.generate_user_payout(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/fetchStudentAssessmentReport', function (req, res) {
    var userdata = req.body;
    Admin.fetchStudentAssessmentReport(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/student_assesment_list', function (req, res) {
    var userdata = req.body;
    Admin.student_assesment_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/assesment_question_list', function (req, res) {
    var userdata = req.body;
    Users.assesment_question_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_assesment_submit', function (req, res) {
    var userdata = req.body;
    Users.student_assesment_submit(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_assesment_teacher_comment', function (req, res) {
    var userdata = req.body;
    Users.update_assesment_teacher_comment(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/fetchStudentAssessmentReportAll', function (req, res) {
    var userdata = req.body;
    Admin.fetchStudentAssessmentReportAll(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_student_assessments_info', function (req, res) {
    var userdata = req.body;
    Admin.update_student_assessments_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_assesment_marks_list', function (req, res) {
    var userdata = req.body;
    Users.student_assesment_marks_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/make_payment', function (req, res) {
    var userdata = req.body;
    Users.make_payment(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/check_payment_status', function (req, res) {
    var userdata = req.body;
    Users.check_payment_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/make_payment_lazypay', function (req, res) {
    var userdata = req.body;
    Users.make_payment_lazypay(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});
app.post('/check_payment_lazypay', function (req, res) {
    var userdata = req.body;
    Users.check_payment_lazypay(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/fetch_terms_courses', function (req, res) {
    var userdata = req.body;
    Users.fetch_terms_courses(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            //console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
        // if (config.DEBUG == 2)
        //    // console.log(response);
        // res.status(http_status_code).send(response);
    });
});

app.post('/web_user_refferal_list', function (req, res) {
    var userdata = req.body;
    Users.web_user_refferal_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            //console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
        // if (config.DEBUG == 2)
        //    // console.log(response);
        // res.status(http_status_code).send(response);
    });
});

app.get('/student_assesment_cron', function (req, res) {
    var userdata = req.body;
    Admin.student_assesment_cron(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            //console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
        // if (config.DEBUG == 2)
        //    // console.log(response);
        // res.status(http_status_code).send(response);
    });
});

app.post('/youtube_class_list', function (req, res) {
    var userdata = req.body;
    Users.youtube_class_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
        // if (config.DEBUG == 2)
        //    // console.log(response);
        // res.status(http_status_code).send(response);
    });
});


app.post('/school_otp_generate', function (req, res) {
    var userdata = req.body;
    Users.school_otp_generate(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});

app.post('/school_otp_verify', function (req, res) {
    var userdata = req.body;
    Users.school_otp_verify(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});


app.post('/create_teacher', function (req, res) {
    var userdata = req.body;
    Users.create_teacher(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});


app.post('/class_duration_template_list', function (req, res) {
    var userdata = req.body;
    Admin.class_duration_template_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});

app.post('/add_class_duration_template', function (req, res) {
    var userdata = req.body;
    Admin.add_class_duration_template(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});

app.post('/class_duration_template_details', function (req, res) {
    var userdata = req.body;
    Admin.class_duration_template_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});

app.post('/update_class_duration_template_status', function (req, res) {
    var userdata = req.body;
    Admin.update_class_duration_template_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			//console.log(err);
            throw err;
        }else{
            res.status(http_status_code).send(response); 
        }
    });
});


//youtube classes
app.post('/admin_youtube_classes_list', function (req, res) {
    var userdata = req.body;
    Admin.admin_youtube_classes_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_youtube_classes', function (req, res) {
    var userdata = req.body;
    Admin.add_youtube_classes(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/youtube_classes_details', function (req, res) {
    var userdata = req.body;
    Admin.youtube_classes_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_youtube_classes_status', function (req, res) {
    var userdata = req.body;
    Admin.update_youtube_classes_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/awards_list', function (req, res) {
    var userdata = req.body;
    Admin.awards_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/web_awards_list', function (req, res) {
    var userdata = req.body;
    Admin.web_awards_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_awards', function (req, res) {
    var userdata = req.body;
    Admin.add_awards(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/awards_details', function (req, res) {
    var userdata = req.body;
    Admin.awards_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_awards_status', function (req, res) {
    var userdata = req.body;
    Admin.update_awards_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/class_languages_list', function (req, res) {
    var userdata = req.body;
    Admin.class_languages_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_class_languages', function (req, res) {
    var userdata = req.body;
    Admin.add_class_languages(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/class_languages_details', function (req, res) {
    var userdata = req.body;
    Admin.class_languages_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_class_languages_status', function (req, res) {
    var userdata = req.body;
    Admin.update_class_languages_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/send_invite_link', function (req, res) {
    var userdata = req.body;
    Users.send_invite_link(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



const redis_schoolData = (req,res,next)=>{
	client.get('schoolData',(err,redis_data)=>{
		if(err){
			throw err;
		}else if(redis_data){
			res.send(JSON.parse(redis_data));
		}else{
			next();
		}
	})
} 


app.post('/register_user_fun_android', function (req, res) {
    var userdata = req.body;
    Admin.register_user_fun_android(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});



app.post('/teacher_assesment_submit', function (req, res) {
    var userdata = req.body;
    Users.teacher_assesment_submit(userdata, pool, function (http_status_code, err, response) {
		
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

app.post('/add_badges', function (req, res) {
    var userdata = req.body;
    Admin.add_badges(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/badges_details', function (req, res) {
    var userdata = req.body;
    Admin.badges_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_badges_status', function (req, res) {
    var userdata = req.body;
    Admin.update_badges_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_student_badges_points', function (req, res) {
    var userdata = req.body;
    Admin.update_student_badges_points(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/school_enquiry', function (req, res) {
    var userdata = req.body;
    Admin.school_enquiry(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/school_enquiries_list', function (req, res) {
    var userdata = req.body;
    Admin.school_enquiries_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_school_enquiry_status', function (req, res) {
    var userdata = req.body;
    Admin.update_school_enquiry_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_courses_validation_code', function (req, res) {
    var userdata = req.body;
    Admin.add_courses_validation_code(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/courses_validation_code_list', function (req, res) {
    var userdata = req.body;
    Admin.courses_validation_code_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/teacher_grade_list', function (req, res) {
    var userdata = req.body;
    Admin.teacher_grade_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/assign_course_to_batch', function (req, res) {
    var userdata = req.body;
    Admin.assign_course_to_batch(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/concepts_list', function (req, res) {
    var userdata = req.body;
    Admin.concepts_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_concepts', function (req, res) {
    var userdata = req.body;
    Admin.add_concepts(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_concepts_status', function (req, res) {
    var userdata = req.body;
    Admin.update_concepts_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/concepts_details', function (req, res) {
    var userdata = req.body;
    Admin.concepts_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_chapter_concepts', function (req, res) {
    var userdata = req.body;
    Admin.add_chapter_concepts(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/chapter_concept_list', function (req, res) {
    var userdata = req.body;
    Admin.chapter_concept_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/save_user_concept', function (req, res) {
    var userdata = req.body;
    Admin.save_user_concept(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/fetch_user_concepts', function (req, res) {
    var userdata = req.body;
    Admin.fetch_user_concepts(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_school_grade', function (req, res) {
    var userdata = req.body;
    Admin.add_school_grade(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/overall_details_student', function (req, res) {
    var userdata = req.body;
    Users.overall_details_student(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/robotics_courses_dropdown_list', function (req, res) {
    var userdata = req.body;
    Admin.robotics_courses_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/generate_teacher_slots', function (req, res) {
    var userdata = req.body;
    Admin.generate_teacher_slots(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/create_review', function (req, res) {
    var userdata = req.body;
    Users.create_review(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_reviews_status', function (req, res) {
    var userdata = req.body;
    Users.update_reviews_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/create_doubt', function (req, res) {
    var userdata = req.body;
    Users.create_doubt(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/student_dashboard_info', function (req, res) {
    var userdata = req.body;
    Users.student_dashboard_info(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/send_class_badges', function (req, res) {
    var userdata = req.body;
    Users.send_class_badges(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/class_badges_list', function (req, res) {
    var userdata = req.body;
    Users.class_badges_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/fetchStudentAssessmentReportBix', function (req, res) {
    var userdata = req.body;
    Admin.fetchStudentAssessmentReportBix(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/coding_course_lesson_track', function(req, res) {
    var userdata = req.body;
    Users.coding_course_lesson_track(userdata, pool, function(http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});

// new Teacher Admin
app.post('/teacher_admin_login', function (req, res) {
    var userdata = req.body;
    Admin.teacher_admin_login(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

// new Teacher Admin
app.post('/super_teacher_admin_list', function (req, res) {
    var userdata = req.body;
    Admin.super_teacher_admin_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


// new studet course track
app.post('/teacher_student_course_summary_track', function (req, res) {
    var userdata = req.body;
    Users.teacher_student_course_summary_track(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



// Email templates

app.post('/email_templates_list', function (req, res) {
    var userdata = req.body;
    Admin.email_templates_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_email_templates', function (req, res) {
    var userdata = req.body;
    Admin.add_email_templates(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/email_templates_details', function (req, res) {
    var userdata = req.body;
    Admin.email_templates_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_email_templates_status', function (req, res) {
    var userdata = req.body;
    Admin.update_email_templates_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/send_enquiry_email', function (req, res) {
    var userdata = req.body;
    Users.send_enquiry_email(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/redeem_course_code', function (req, res) {
    var userdata = req.body;
    Admin.redeem_course_code(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/link_setting_update', function (req, res) {
    var userdata = req.body;
    Admin.link_setting_update(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/link_setting_details', function (req, res) {
    var userdata = req.body;
    Admin.link_setting_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

//Left


app.post('/user_list', function (req, res) {
    var userdata = req.body;
    Admin.user_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/courses_list', function (req, res) {
    var userdata = req.body;
    Admin.courses_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});



app.post('/assign_course_to_student', function (req, res) {
    var userdata = req.body;
    Admin.assign_course_to_student(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/assign_course_to_student_bulk', function (req, res) {
    var userdata = req.body;
    Admin.assign_course_to_student_bulk(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/faqs_list', function (req, res) {
    var userdata = req.body;
    Admin.faqs_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/school_grades_list', function (req, res) {
    var userdata = req.body;
    Admin.school_grades_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/overall_details_teacher', function (req, res) {
    var userdata = req.body;
    Users.overall_details_teacher(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/badges_list', function (req, res) {
    var userdata = req.body;
    Admin.badges_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/grades_list', function (req, res) {
    var userdata = req.body;
    Users.grades_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/school_user_list',function (req, res) {
    var userdata = req.body;
    Users.school_user_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }else{
           // client.flushall('ASYNC');
           //redis-cli flushall
            console.log(response);
           // client.setex('schoolData',3600,JSON.stringify(response));
            res.status(http_status_code).send(response);
        }
    });
});


app.post('/reviews_list', function (req, res) {
    var userdata = req.body;
    Users.reviews_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/blog_category_list', function (req, res) {
    var userdata = req.body;
    Blog.blog_category_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/blog_category_dropdown_list', function (req, res) {
    var userdata = req.body;
    Blog.blog_category_dropdown_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/web_blog_category_list', function (req, res) {
    var userdata = req.body;
    Blog.web_blog_category_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/add_blog_category', function (req, res) {
    var userdata = req.body;
    Blog.add_blog_category(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/blog_category_details', function (req, res) {
    var userdata = req.body;
    Blog.blog_category_details(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/update_blog_category_status', function (req, res) {
    var userdata = req.body;
    Blog.update_blog_category_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/add_blog', function (req, res) {
    var userdata = req.body;
    Blog.add_blog(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/blog_admin_list', function (req, res) {
    var userdata = req.body;
    Blog.blog_admin_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/blog_web_list', function (req, res) {
    var userdata = req.body;
    Blog.blog_web_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/update_blog_status', function (req, res) {
    var userdata = req.body;
    Blog.update_blog_status(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/blog_view', function (req, res) {
    var userdata = req.body;
    Blog.blog_view(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/assign_course_to_student', function (req, res) {
    var userdata = req.body;
    Admin.assign_course_to_student(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

app.post('/login', function (req, res) {
    var userdata = req.body;
    Admin.login(userdata, pool, function (http_status_code, err, response) {
        
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
        res.status(http_status_code).send(response);
    });
});


// new studet course track
app.post('/student_course_summary_track', function (req, res) {
    var userdata = req.body;
    Admin.student_course_summary_track(userdata, pool, function (http_status_code, err, response) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/overall_leaderboard', function (req, res) {
    var userdata = req.body;
    Admin.overall_leaderboard(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});


app.post('/user_badges_point_list', function (req, res) {
    var userdata = req.body;
    Admin.user_badges_point_list(userdata, pool, function (http_status_code, err, response) {
        if (err) {
			console.log(err);
            throw err;
        }
        if (config.DEBUG == 2)
            console.log(response);
            res.status(http_status_code).send(response);
    });
});

module.exports = app;