const express = require("express");
const {
    renderHome,
    renderAbout,
    renderBlogs,
    renderBlog,
    renderCampaigns,
    renderCampaign,
    renderContactUs,
    renderMedia
} = require("../controllers/public-views.controller");
const router = express.Router();

router.get("/", renderHome);
router.get("/about", renderAbout);
router.get("/contact-us", renderContactUs);
router.get("/media", renderMedia);

router.get("/blogs", renderBlogs);
router.get("/blogs/:id", renderBlog);

router.get("/campaigns", renderCampaigns);
router.get("/campaigns/:id", renderCampaign);

module.exports = router;