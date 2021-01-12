const express = require("express");

const {
    renderBlogs,
    renderCreateBlog,
    createBlog,
    renderEditBlog,
    editBlog,
    deleteBlog,
    uploadBlogImage,
    renderCampaigns,
    renderCreateCampaign,
    createCampaign,
    renderEditCampaign,
    editCampaign,
    deleteCampaign,
    uploadCampaignImage,
    renderUsers,
    renderCreateUser,
    createUser,
    deleteUser,
} = require("../controllers/admin-views.controller");
const router = express.Router();

// user routes
router.get("/users", renderUsers);
router.get("/users/create", renderCreateUser);
router.post("/users/create", createUser);
router.get("/users/delete:id", deleteUser);

/**
 * Blog routes
*/
router.get("/blogs", renderBlogs);
router.get("/blogs/create", renderCreateBlog);
router.post("/blogs/create", uploadBlogImage, createBlog);
router.get("/blogs/edit:id", renderEditBlog);
router.post("/blogs/edit:id", editBlog);
router.get("/blogs/delete:id", deleteBlog);

/*
 * Campaign Routes 
*/ 
router.get("/campaigns", renderCampaigns);
router.get("/campaigns/create", renderCreateCampaign);
router.post("/campaigns/create", uploadCampaignImage, createCampaign);
router.get("/campaigns/edit:id", renderEditCampaign);
router.post("/campaigns/edit:id", editCampaign);
router.get("/campaigns/delete:id", deleteCampaign);



module.exports = router;