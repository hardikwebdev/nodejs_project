let express = require("express");

let controller = require("./index.controller");
let router = express.Router();

/**
 * @api {get} admin/general/ A. Get General Config
 * @apiName Get General Config
 * @apiGroup General(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * {
     "payload": {
        "id": 1,
        "gender": [
            "Male",
            "Female"
        ],
        "age_group": [
            "18-25",
            "25-35",
            "36-45",
            "46+",
            "50",
            "80"
        ],
        "group_segment": [
            "Mat Lepak",
            "Hipsters",
            "High Achiever",
            "Middle Class Joe",
            "sss"
        ],
        "deletedAt": null,
        "createdAt": "2021-11-27T05:36:28.000Z",
        "updatedAt": "2022-02-17T06:48:51.000Z"
    },
    "success": true,
    "message": "General configs fetched!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "No general configs found!",
    "code": 401
}
 */

router.get("/", controller.general_configs);

/**
 * @api {post} admin/general/update B. Update General Config
 * @apiName Update General Config
 * @apiGroup General(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} id              ID of particular General Config.
 * @apiParam {String} gender          Gender of particular General Config.
 * @apiParam {Text} age_group         Age group of particular General Config.
 * @apiParam {Text} group_segment     Group segment of particular General Config.

 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "General Configs updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "invalid signature!",
    "code": 500
}
 */

router.post("/update", controller.updateConfigs);

/**
 * @api {get} admin/general/brands_variant C. Get Brands Variant
 * @apiName Get Brands Variant
 * @apiGroup General(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * {
     "payload": {
        "data": {
            "count": 3,
            "rows": [
                {
                    "variants": [
                        "white"
                    ],
                    "id": 32,
                    "brands": "black",
                    "isCompany": 1,
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-16T07:14:03.000Z",
                    "updatedAt": "2022-02-16T07:14:03.000Z"
                },
                {
                    "variants": [
                        "Others"
                    ],
                    "id": 31,
                    "brands": "Others",
                    "isCompany": 0,
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-14T06:12:01.000Z",
                    "updatedAt": "2022-02-14T06:12:01.000Z"
                },
                {
                    "variants": [
                        "ABC Red",
                        "ABC Classic",
                        "ABC Blue",
                        "ABC Evoque",
                        "ABC Menthol",
                        "ABC Boost",
                        "ABC Switch"
                    ],
                    "id": 1,
                    "brands": "ABC",
                    "isCompany": 0,
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-01-24T12:44:15.000Z",
                    "updatedAt": "2022-01-24T12:48:13.000Z"
                }
            ]
        }
    },
    "success": true,
    "message": "Brands variant fetched!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Brands variant not found!",
    "code": 401
}
 */
router.get("/brands_variant", controller.brands_variant);

/**
 * @api {post} admin/general/brands_variant D. Create Brands Variant
 * @apiName Create Brands Variant
 * @apiGroup General(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} brands          Brand to be created.
 * @apiParam {LONGTEXT} variants      Variants for particular Brand Variant.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Brands variant updated successfully!!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Brand exist with same name!",
    "code": 401
}
 */
router.post("/brands_variant", controller.create_brands_variant);

/**
 * @api {post} general/update_brands_variant E. Update Brands Variant
 * @apiName Update Brands Variant
 * @apiGroup General(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Integer} id             id of Brand Variant.
 * @apiParam {LONGTEXT} variants      variants of particular Brand to updated.
 * @apiParam {String} brands          Brand name to be updated.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Brands variant updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update brands variant!",
    "code": 401
}
 */
router.post("/update_brands_variant", controller.update_brands_variant);

/**
 * @api {post} admin/general/delete_brands_variant F. Delete Brands Variant
 * @apiName Delete Brands Variant
 * @apiGroup General(admin)
 * @apiVersion 0.0.0
 * 
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Integer} id            id of Brand Variant.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Brands variant deleted successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to delete brand variant!",
    "code": 400
}
 */

router.post("/delete_brands_variant", controller.delete_brands_variant);

module.exports = router;