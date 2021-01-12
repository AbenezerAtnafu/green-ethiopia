const {
  Op
} = require("sequelize");
const Blog = require("../models").Blog;
const Campaign = require("../models").Campaign;
const {
  catchAsync
} = require("./error.controller");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// static views render
exports.renderHome = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: ["images"]
  }

  const campaigns = await Campaign.findAll(options);
  res.render("guests/index", {
    campaigns,
    query: req.query.q,
    page,
  });
});

exports.renderAbout = catchAsync(async (req, res, next) => {
  res.render("guests/about");
});

exports.renderContactUs = catchAsync(async (req, res, next) => {
  res.render("guests/contact-us");
});

exports.renderMedia = catchAsync(async (req, res, next) => {
  res.render("guests/media");
});

exports.renderLogin = catchAsync(async (req, res, next) => {
  res.render("guests/login");
})
// exports.renderBlogs = catchAsync(async (req, res, next) => {
//   res.render("guests/blogs");
// });

//dynamic views render
exports.renderBlogs = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: ["images", "sources"]
  }
  const blogs = await Blog.findAll(options);
  res.render("guests/blogs", {
    blogs,
    query: req.query.q,
    page,
    months,
  });
});

exports.renderBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findByPk(req.params.id, {
    include: ["images", "sources"],
  });

  res.render("guests/blog", {
    blog,
    months,
  });
})

exports.renderCampaigns = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;
  let options = {
    offset,
    limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: ["images"]
  }
  const campaigns = await Campaign.findAll(options);

  res.render("guests/campaigns", {
    campaigns,
    query: req.query.q,
    page,
    months,
  });
});

exports.renderCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.findByPk(req.params.id, {
    include: ["images"],
  });
  res.render("guests/campaign", {
    campaign,
    months,
  })
})