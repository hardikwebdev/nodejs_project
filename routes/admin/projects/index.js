let express = require('express');
let router = express.Router();
let controller = require("./index.controller");


/**
 * @api {get} admin/projects/ A. All Projects List
 * @apiName All Projects List
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
       "payload": {
        "data": {
            "count": 2,
            "rows": [
                {
                    "id": 85,
                    "title": "N95 Mask",
                    "campaign_id": "#08331394",
                    "description": "Stock Availabel",
                    "category_id": 0,
                    "status": 1,
                    "isCompleted": 1,
                    "start_date": "2020-02-02T00:00:00.000Z",
                    "end_date": "2021-02-02T00:00:00.000Z",
                    "deletedAt": null,
                    "createdAt": "2022-03-03T11:04:44.000Z",
                    "updatedAt": "2022-03-04T02:00:00.000Z",
                    "UserProjects": [
                        {
                            "user_id": 107,
                            "User": {
                                "id": 107,
                                "username": "test18",
                                "email": "test18@gmail.com"
                            }
                        },
                        {
                            "user_id": 3,
                            "User": {
                                "id": 3,
                                "username": "DEF",
                                "email": "def@app.com"
                            }
                        }
                    ],
                    "Users": [
                        {
                            "id": 107,
                            "username": "test18",
                            "email": "test18@gmail.com"
                        },
                        {
                            "id": 3,
                            "username": "DEF",
                            "email": "def@app.com"
                        }
                    ],
                    "total_sales": 4,
                    "total_quantity": "4",
                    "total_amount": 20000,
                    "outletCount": 1,
                    "total_stock": "1"
                },
                {
                    "id": 84,
                    "title": "Kansuee",
                    "campaign_id": "#35192387",
                    "description": "Stock",
                    "category_id": 1,
                    "status": 1,
                    "isCompleted": 0,
                    "start_date": "2020-02-02T00:00:00.000Z",
                    "end_date": "2022-04-10T00:00:00.000Z",
                    "deletedAt": null,
                    "createdAt": "2022-03-02T05:07:28.000Z",
                    "updatedAt": "2022-03-03T02:00:00.000Z",
                    "UserProjects": [
                        {
                            "user_id": 105,
                            "User": {
                                "id": 105,
                                "username": "test16",
                                "email": "test16@gmail.com"
                            }
                        },
                        {
                            "user_id": 3,
                            "User": {
                                "id": 3,
                                "username": "DEF",
                                "email": "def@app.com"
                            }
                        }
                    ],
                    "Users": [
                        {
                            "id": 105,
                            "username": "test16",
                            "email": "test16@gmail.com"
                        },
                        {
                            "id": 3,
                            "username": "DEF",
                            "email": "def@app.com"
                        }
                    ],
                    "total_sales": 6,
                    "total_quantity": "6",
                    "total_amount": 10069.6,
                    "outletCount": 1,
                    "total_stock": "3"
                },
            ]
        }
    },
    "success": true,
    "message": "Projects fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch project!",
    "code": 401
}
 */
router.get('/', controller.projectList);

/**
 * @api {post} admin/projects/add B. Add Project
 * @apiName Add Project
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} id              Project ID.
 * @apiParam {String} title           Project Title.
 * @apiParam {String} description     Project Description.
 * @apiParam {Number} user_id         User ID.



 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Project created successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Project already exist with same name!",
    "code": 500
}
 */

router.post('/add', controller.addProject);

/**
 * @api {post} projects/edit C. Edit Project
 * @apiName Edit Project
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} id              Project ID.
 * @apiParam {String} title           Project Title.
 * @apiParam {String} description     Project Description.
 * @apiParam {Number} user_id         User ID.



 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Project updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update Project!",
    "code": 400
}
 */

router.post('/edit', controller.editProject);

/**
 * @api {post} admin/projects/delete D. Delete Project
 * @apiName Delete project
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Number} id       Project ID.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Project deleted successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to delete Project!",
    "code": 400
}
 */

router.post('/delete', controller.deleteProject);

/**
 * @api {post} admin/projects/addStock E. Add Stock
 * @apiName Add Stock
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} project_id       Project ID.
 * @apiParam {Number} stock_id         Stock ID.
 * @apiParam {String} quantity         Products Quantity.




 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Stocks updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Please provide products to update their stock!",
    "code": 500
}
 */

router.post('/addStock', controller.addStock);

/**
 * @api {get} admin/projects/getStockDetail F. Get Stocks List
 * @apiName  Get Stocks List
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 2,
            "rows": [
                {
                    "image_url": "http://127.0.0.1:8005/media/thumbnail/PT_44_W3kqoiyRyV.jpg",
                    "id": 44,
                    "name": "Dell Min Series",
                    "amount": 100,
                    "brand_name": "Black Hats",
                    "brand_id": 5,
                    "balance": 72,
                    "close": 1167,
                    "projectsArr": [
                        34,
                        35,
                        38,
                        44,
                        46,
                        45,
                        49,
                        50,
                        61,
                        71
                    ]
                },
                {
                    "image_url": "http://127.0.0.1:8005/media/thumbnail/PT_51_ekfvt5v1dJ.jpg",
                    "id": 51,
                    "name": "teass",
                    "amount": 5000,
                    "brand_name": "ghh",
                    "brand_id": 15,
                    "balance": 20,
                    "close": 27,
                    "projectsArr": [
                        75,
                        76,
                        77,
                        78,
                        79,
                        80,
                        73,
                        81,
                        82,
                        83,
                        52,
                        84,
                        85
                    ]
                },
            ]
        }
    },
    "success": true,
    "message": "Stocks fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Stocks",
    "code": 401
}
 */

router.get('/getStockDetail', controller.getStockDetail);

/**
 * @api {get} admin/projects/getProductStockList G. Get Product Stocks List
 * @apiName  Get Product Stocks List
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * 
 * @apiParam {Number} project_id         Project ID.
 *


 * @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 1,
            "rows": [
                        {
                "id": 1,
                "name": "ghh",
                "Products": [
                    {
                        "image_url": "http://127.0.0.1:8005/media/thumbnail/PT_51_ekfvt5v1dJ.jpg",
                        "id": 51,
                        "name": "teass",
                        "amount": 5000,
                        "stock_id": 0,
                        "balance": 0
                    }
                ]
            },
          ]
      },   
    }
    "success": true,
    "message": "Stocks fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Stocks",
    "code": 401
}
 */

router.get("/getProductStockList", controller.getProductStockList);

/**
 * @api {post} admin/projects/updateStock H. Update Stock
 * @apiName Update Stock
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} project_id       Project ID.
 * @apiParam {Number} stock_id         Stock ID.
 * @apiParam {String} quantity         Product Quantity.


 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Stocks updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Please provide products to update their stock!",
    "code": 500
}
 */

router.post("/updateStock", controller.updateStock);

/**
 * @api {get} admin/projects/getAllOrders I. Get All Orders
 * @apiName  Get All Orders
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 1,
            "rows": [
                {
                    "brands_variant": [],
                    "project_id": 78,
                    "outlet_id": 661,
                    "id": 12110,
                    "visitation_id": 3328,
                    "user_id": 112,
                    "status": 1,
                    "isEffective": 1,
                    "isFree": 0,
                    "isVerified": 0,
                    "description": null,
                    "gender": "Male",
                    "age_group": "25-35",
                    "group_segment": "Hipsters",
                    "effective_name": null,
                    "effective_email": null,
                    "effective_contact": null,
                    "deletedAt": null,
                    "createdAt": "2022-03-09T12:06:53.000Z",
                    "updatedAt": "2022-03-09T12:06:53.000Z",
                    "Outlet": {
                        "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                        "outlet_name": "Gamer3",
                        "city": "Lyon",
                        "state": "France",
                        "postal_code": "69001"
                    },
                    "OrderDetails": [
                        {
                            "id": 6617,
                            "order_id": 12110,
                            "product_id": 51,
                            "amount": 5000,
                            "quantity": 1,
                            "total_amount": 5000,
                            "isOutletStock": 0,
                            "deletedAt": null,
                            "createdAt": "2022-03-09T12:06:53.000Z",
                            "updatedAt": "2022-03-09T12:06:53.000Z",
                            "Product": {
                                "image_url": "http://127.0.0.1:8005/media/thumbnail/PT_51_ekfvt5v1dJ.jpg",
                                "id": 51,
                                "name": "teass"
                            },
                            "product_name": "teass",
                            "product_url": "PT_51_ekfvt5v1dJ.jpg"
                        },
                        {
                            "id": 6618,
                            "order_id": 12110,
                            "product_id": 2,
                            "amount": 17.4,
                            "quantity": 1,
                            "total_amount": 17.4,
                            "isOutletStock": 0,
                            "deletedAt": null,
                            "createdAt": "2022-03-09T12:06:53.000Z",
                            "updatedAt": "2022-03-09T12:06:53.000Z",
                            "Product": {
                                "image_url": "http://127.0.0.1:8005/media/thumbnail/PT_2_vIncsK3tlK.png",
                                "id": 2,
                                "name": "Mevius LSS Menthol White"
                            },
                            "product_name": "Mevius LSS Menthol White",
                            "product_url": "PT_2_vIncsK3tlK.png"
                        }
                    ],
                    "VisitationHistory": {
                        "execution_url": [],
                        "id": 3328,
                        "user_id": 112,
                        "project_id": 78,
                        "outlet_id": 661,
                        "type": 0,
                        "check_in": "2022-03-09T12:06:16.000Z",
                        "check_out": null,
                        "reason": null,
                        "day": "wednesday",
                        "feedback_title": null,
                        "feedback_description": null,
                        "deletedAt": null,
                        "createdAt": "2022-03-09T12:06:16.000Z",
                        "updatedAt": "2022-03-09T12:06:16.000Z"
                    },
                    "project_name": "Water Bottle",
                    "user_name": "Kamal",
                    "outlet_name": "Gamer3",
                    "outlet_address": "3 Rue Paul Chenavard",
                    "effectiveFC": 0,
                    "effectiveSOB": 0,
                    "total_quantity": 2,
                    "total_amount": 5017.4
                },
            ]
        }
    },
    "success": true,
    "message": "Projects fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch project!",
    "code": 401
}
 */

router.get("/getAllOrders", controller.getAllOrders);

/**
 * @api {post} admin/projects/updateOrderStatus J. Update Order Status
 * @apiName Update Order Status
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} id              Order ID.
 * @apiParam {String} status           Order Status.


 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Order updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Order failed to update!",
    "code": 500
}
 */

router.post("/updateOrderStatus", controller.updateOrderStatus);

/**
 * @api {get} admin/projects/exportOrdersCSV K. Export Orders CSV
 * @apiName  Export Orders CSV
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam  {String} start_date       Start date from which need to fetch orders
 * @apiParam  {String} end_date         End date to which needs to fetch orders


 * @apiSuccessExample Success Response
 * {
     "payload": {
      url: ""
    },
    "success": true,
    "message": "CSV file exporting is in progress, it might take sometime in downloading.",
    "code": 200  

}
 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to create CSV!",
    "code": 400
}
 */

router.post("/exportOrdersCSV", controller.exportOrdersCSV);

/**
 * @api {get} admin/projects/downloadcsv L. Download CSV
 * @apiName Download CSV
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *

 * @apiSuccessExample Success Response
 * {
    "payload": {
        url: http://127.0.0.1:8005/media/download/EXPORT_ORDERS_LOG.csv
        
    },
    "success": true,
    "message": "CSV file exported successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to export CSV file!",
    "code": 401
}
 */

router.get("/downloadcsv", controller.downloadcsv);

/**
 * @api {get} admin/projects/deletecsvfile M. Delete CSV File
 * @apiName Delete CSV File
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * {
 
    "success": true,
    "message": "File deleted successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "File not exist!",
    "code": 401
}
 */

router.get("/deletecsvfile", controller.deletecsvfile);


/**
 * @api {get} admin/projects/allProjects N. All Projects
 * @apiName All Projects
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token

 * @apiSuccessExample Success Response
 * {
    "payload": {
            "count": 2,
            "rows": [
                 {
                "execution_url": [],
                "id": 3328,
                "user_id": 112,
                "project_id": 78,
                "outlet_id": 661,
                "type": 0,
                "check_in": "2022-03-09T12:06:16.000Z",
                "check_out": null,
                "reason": null,
                "day": "wednesday",
                "feedback_title": null,
                "feedback_description": null,
                "deletedAt": null,
                "createdAt": "2022-03-09T12:06:16.000Z",
                "updatedAt": "2022-03-09T12:06:16.000Z",
                "User": {
                    "username": "Kamal"
                },
                "Project": {
                    "title": "Water Bottle",
                    "campaign_id": "#92127248"
                },
                "outlet_name": "Gamer3",
                "outlet_url": "",
                "address": "3 Rue Paul Chenavard, Lyon, 69001, France"
            },
            {
                "execution_url": [],
                "id": 3327,
                "user_id": 112,
                "project_id": 78,
                "outlet_id": 612,
                "type": 1,
                "check_in": "2022-03-08T08:29:12.000Z",
                "check_out": "2022-03-08T10:01:23.000Z",
                "reason": null,
                "day": "others",
                "feedback_title": null,
                "feedback_description": null,
                "deletedAt": null,
                "createdAt": "2022-03-08T08:29:12.000Z",
                "updatedAt": "2022-03-08T10:01:23.000Z",
                "User": {
                    "username": "Kamal"
                },
                "Project": {
                    "title": "Water Bottle",
                    "campaign_id": "#92127248"
                },
                "outlet_name": "testing",
                "outlet_url": "",
                "address": "3 Rue Paul Chenavard, Lyon, 69001, France"
           }
        ]
    },
    "success": true,
    "message": "Visitation detail fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Visitation detail",
    "code": 401
}
 */

router.get("/visitationLogs", controller.visitationLogs);

/**
 * @api {get} admin/projects/allProjects O. All Projects
 * @apiName All Projects
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 

 * @apiSuccessExample Success Response
 * {
    "payload": {
        "data": {
            "count": 2,
            "rows": [
                {
                    "id": 1,
                    "title": "Kansuee",
                    "campaign_id": "#35192387",
                    "description": "Stock",
                    "category_id": 1,
                    "status": 1,
                    "isCompleted": 0,
                    "start_date": "2020-02-02T00:00:00.000Z",
                    "end_date": "2022-04-10T00:00:00.000Z",
                    "deletedAt": null,
                    "createdAt": "2022-03-02T05:07:28.000Z",
                    "updatedAt": "2022-03-03T02:00:00.000Z"
                },
                {
                    "id": 2,
                    "title": "Marker",
                    "campaign_id": "#05316781",
                    "description": "Marker",
                    "category_id": 1,
                    "status": 1,
                    "isCompleted": 0,
                    "start_date": "2012-02-22T00:00:00.000Z",
                    "end_date": "2022-03-22T00:00:00.000Z",
                    "deletedAt": null,
                    "createdAt": "2022-03-01T06:03:13.000Z",
                    "updatedAt": "2022-03-02T02:00:00.000Z"
                },
            ]
        }
    },
    "success": true,
    "message": "Projects fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Projects",
    "code": 401
}
 */

router.get('/allProjects', controller.allProjects);

/**
 * @api {get} admin/projects/getTradeList P. Get Trade List
 * @apiName Get Trade List
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiParam {String} search   search value

 * @apiSuccessExample Success Response
 * {
   "payload":{
      "data":{
         "count":2,
         "rows":[
            {
               "image_url":null,
               "id":44,
               "user_id":106,
               "campaign_id":"#92127248",
               "project_id":76,
               "accepter_id":null,
               "description":"dfd",
               "deletedAt":null,
               "createdAt":"2022-03-03T10:51:04.000Z",
               "updatedAt":"2022-03-03T10:51:04.000Z",
               "TradeProducts":[
                  {
                     "id":47,
                     "trade_id":44,
                     "product_id":51,
                     "quantity":1,
                     "status":0,
                     "deletedAt":null,
                     "createdAt":"2022-03-03T10:51:05.000Z",
                     "updatedAt":"2022-03-03T10:51:05.000Z",
                     "project_id":76,
                     "product_name":"teass",
                     "product_amount":5000
                  }
               ],
               "Project":{
                  "id":76,
                  "title":"Mouse",
                  "campaign_id":"#99792196"
               },
               "User":{
                  "id":106,
                  "username":"test17",
                  "system_id":"#31380410"
               },
               "username":"test17",
               "system_id":"#31380410",
               "totalQuantity":1,
               "status":0
            },
            {
               "image_url":"https://vogue-api.demosite.my/media/thumbnail/GwnynjwnMN.jpg",
               "id":39,
               "user_id":101,
               "campaign_id":"#48210242",
               "project_id":82,
               "accepter_id":null,
               "description":"hiii",
               "deletedAt":null,
               "createdAt":"2022-02-22T11:22:00.000Z",
               "updatedAt":"2022-02-22T11:22:00.000Z",
               "TradeProducts":[
                  {
                     "id":42,
                     "trade_id":39,
                     "product_id":51,
                     "quantity":1,
                     "status":0,
                     "deletedAt":null,
                     "createdAt":"2022-02-22T11:22:00.000Z",
                     "updatedAt":"2022-02-22T11:22:00.000Z",
                     "project_id":82,
                     "product_name":"teass",
                     "product_amount":5000
                  }
               ],
               "Project":{
                  "id":82,
                  "title":"Black Supari",
                  "campaign_id":"#57333429"
               },
               "User":{
                  "id":101,
                  "username":"BABA",
                  "system_id":"#95196155"
               },
               "username":"BABA",
               "system_id":"#95196155",
               "totalQuantity":1,
               "status":0
            },
         ]
      }
   },
   "success":true,
   "message":"Trade list fetched successfully.",
   "code":200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch trade list",
    "code": 401
}
 */

router.get("/getTradeList", controller.getTradeList);


/**
 * @api {post} admin/projects/getProductStockListByProjects Q. Get Product Stocks List By Projects
 * @apiName  Get Product Stocks List By Projects
 * @apiGroup Projects(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Array} projectsArr         Project Array.
 * @apiParam {Array} id                  Product ID.

 * @apiSuccessExample Success Response
 * {
   "payload":{
      "data":[
         
         {
            "project_name":"Lenskart",
            "open":6,
            "close":0
         },
         {
            "project_name":"Electric Wire",
            "open":1,
            "close":0
         },
         {
            "project_name":"MCDONALD'S  Ahemedabad",
            "open":1,
            "close":0
         },
         {
            "project_name":"Kansuee",
            "open":1,
            "close":0
         },
         {
            "project_name":"N95 Mask",
            "open":1,
            "close":0
         },
         {
            "project_name":"Wireless Keyboard",
            "open":8,
            "close":0
         }
      ]
   },
   "success":true,
   "message":"Stocks fetched successfully.",
   "code":200
}
 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Stocks based on projects",
    "code": 401
}
 */

router.post("/getProductStockListByProjects", controller.getProductStockListByProjects);

module.exports = router;