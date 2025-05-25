import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const syllabusData = [
  {
    id: "module1",
    title: "Introduction to Digital Marketing + AI Integration",
    points: [
      "What is Digital Marketing? Scope & Evolution",
      "Traditional vs Digital vs AI-Powered Marketing",
      "Overview of Digital Marketing Channels",
      "Understanding AI’s Role in Marketing Today",
      "How ChatGPT and AI Writing Tools Enhance Productivity",
      "Roadmap to Becoming an AI-Powered Digital Marketer",
    ],
    assignments: ["Analyze an AI-led campaign by a major brand"],
    // projects: [],
  },
  {
    id: "module2",
    title: "Website Planning & Basic Development (WordPress)",
    points: [
      "Importance of Websites in Digital Marketing",
      "Domain, Hosting, SSL Basics",
      "WordPress CMS Installation and Setup",
      "Building Pages with Elementor (No Coding)",
      "Creating Lead Forms and Thank You Pages",
      "Installing Essential Plugins (SEO, Security, Analytics)",
      "Performance & Mobile Optimization",
    ],
    // assignments: [],
    projects: ["Create a basic business website or landing page to run paid campaigns"],
  },
  {
    id: "module3",
    title: "AI in Content & Copywriting",
    points: [
      "Understanding Buyer Personas and Content Funnels",
      "AI Tools: ChatGPT, Jasper, Copy.ai for Ad & Blog Copy",
      "Blog Writing using SurferSEO + AI",
      "Prompt Engineering for Content Accuracy",
      "AI in Email Copywriting and Landing Page Design",
    ],
    // assignments: [],
    projects: ["Use ChatGPT to generate SEO-friendly content for a blog or landing page"],
  },
  {
    id: "module4",
    title: "SEO (Search Engine Optimization)",
    points: [
      "SEO Fundamentals: On-page, Off-page, and Technical",
      "AI for Keyword Research & Competitor Analysis",
      "ChatGPT for Meta Descriptions, Blog Titles, FAQs",
      "Structured Data, Canonical Tags, Robots.txt",
      "Google Search Console & Rank Tracking Tools",
      "Voice SEO and Featured Snippets",
    ],
    assignments: ["AI-assisted content audit and optimization plan"],
    projects: ["Rank a blog post using AI tools + on-page SEO tactics"],
  },
  {
    id: "module5",
    title: "Search Engine Marketing (Google Ads)",
    points: [
      "Overview of Google Ads Ecosystem",
      "Campaign Types: Search, Display, Video, Shopping",
      "AI-Powered Bidding Strategies and Recommendations",
      "Responsive Ads, Smart Campaigns",
      "Conversion Tracking and A/B Testing",
      "Keyword Planner and Performance Forecasting",
    ],
    // assignments: [],
    projects: ["Set up and run a local services campaign using Google Ads"],
  },
  {
    id: "module6",
    title: "Social Media Marketing (Meta, Instagram, LinkedIn)",
    points: [
      "Social Media Trends in 2024 & Beyond",
      "Meta Ads Manager Walkthrough",
      "AI for Social Media Scheduling (Buffer, Hootsuite, Meta AI Tools)",
      "Creating Reels & Stories with Canva AI + CapCut",
      "Instagram Ads: Traffic, Leads, and Engagement",
      "LinkedIn B2B Campaigns",
    ],
    assignments: ["Design a week-long AI-scheduled social calendar"],
    projects: ["Launch a Facebook & Instagram Ad Campaign with AI-generated creatives"],
  },
  {
    id: "module7",
    title: "Email Marketing & Automation",
    points: [
      "Basics of Email Marketing and Lead Nurturing",
      "Mailchimp, Brevo, and Sender Setup",
      "Using ChatGPT for Cold Emails & Sequences",
      "Building Lead Magnets with AI Assistance",
      "List Segmentation & A/B Testing",
      "Email Automation Workflows",
    ],
    // assignments: [],
    projects: ["Launch an automated email funnel for a product or webinar"],
  },
  {
    id: "module8",
    title: "Analytics & Data-Driven Marketing",
    points: [
      "Google Analytics 4 (GA4): Setup & Navigation",
      "UTM Tracking, Events, and Goal Setup",
      "AI Insights with Google Looker Studio",
      "Heatmaps (Hotjar, Clarity)",
      "Campaign Reporting Dashboards",
      "A/B Test Analysis & Funnel Reports",
    ],
    assignments: ["Report & optimize a real-time marketing campaign using GA4 data"],
    // projects: [],
  },
  {
    id: "module9",
    title: "E-Commerce & Performance Marketing",
    points: [
      "Shopify & WooCommerce Basics",
      "Google Shopping Ads Setup",
      "Facebook Product Catalog Integration",
      "AI for Predictive Product Recommendations",
      "Retargeting Strategies & Funnel Optimization",
      "Conversion Rate Optimization Tools",
    ],
    // assignments: [],
    projects: ["Create and promote a mock e-commerce store using AI targeting tools"],
  },
  {
    id: "module10",
    title: "Influencer & Affiliate Marketing",
    points: [
      "Influencer Identification using AI Tools",
      "Campaign Budgeting & ROI Tracking",
      "Affiliate Network Setup: Amazon, ShareASale",
      "UTM-Based Affiliate Tracking",
      "AI Tools for Outreach & Collaboration Emails",
    ],
    // assignments: [],
    projects: ["Plan and budget an influencer campaign with AI targeting"],
  },
  {
    id: "module11",
    title: "Online Reputation Management (ORM)",
    points: [
      "Google Reviews & Public Feedback Systems",
      "ORM Tools: Brand24, Google Alerts",
      "AI Sentiment Analysis Tools",
      "Crisis Management & PR in the Digital Era",
    ],
    // assignments: [],
    projects: ["Create a crisis communication plan using real case studies"],
  },
  {
    id: "module12",
    title: "AI Tools, Prompt Engineering & Freelancing",
    points: [
      "Master Prompt Crafting with ChatGPT",
      "Automation Tools (Zapier, Make)",
      "Video Marketing with AI Tools (Pictory, Synthesia)",
      "Freelance Platforms (Upwork, Fiverr, PeoplePerHour)",
      "Proposal Writing with AI Assistance",
      "Resume + LinkedIn Profile Optimization",
    ],
    // assignments: [],
    projects: ["Build and pitch your portfolio with real campaigns, landing pages, and live ads"],
  },
];


const CourseSyllabus = () => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#0d0d0d",
        minHeight: "100vh",
        py: {xs:2, md: 4},
        px: 0.5
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h2"
          color= "#00e676"
          fontWeight="bold"
          textAlign= "center"
          sx={{
            mb: {xs: 4, md: 8},
            fontSize: { xs: '28px', sm: '36px', md: '44px' },
          }}
        >
          Course Curriculum
        </Typography>

        {syllabusData.map((module) => (
          <Accordion
            key={module.id}
            expanded={expanded === module.id}
            onChange={handleChange(module.id)}
            sx={{
              bgcolor: "#1a1a1a",
              mb: 2,
              borderLeft: "6px solid #00e676",
              borderRadius: 2,
              boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#00e676" }} />}
              aria-controls={`${module.id}-content`}
              id={`${module.id}-header`}
              sx={{
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.5 },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <Chip
                  label={
                    module.id.startsWith("module")
                      ? module.id.replace("module", "Module ")
                      : "Capstone"
                  }
                  sx={{
                    mr: 2,
                    mb: { xs: 1, sm: 0 },
                    bgcolor: "#00e676",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: { xs: 16, sm: 20 },
                  }}
                >
                  {module.title}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
              <List dense>
                {module.points.map((point, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#00e676" }} />
                    </ListItemIcon>
                    <ListItemText primary={point} sx={{ color: "#ccc" }} />
                  </ListItem>
                ))}
              </List>

              {module.assignments && (
                <>
                  <Divider sx={{ my: 2, borderColor: "#333" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00e676", fontWeight: 600 }}
                  >
                    Assignments
                  </Typography>
                  <List dense>
                    {module.assignments.map((assignment, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#00e676" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={assignment}
                          sx={{ color: "#ccc" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {module.projects && (
                <>
                  <Divider sx={{ my: 2, borderColor: "#333" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00e676", fontWeight: 600 }}
                  >
                    Projects
                  </Typography>
                  <List dense>
                    {module.projects.map((project, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#00e676" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={project}
                          sx={{ color: "#ccc" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {module.finalDeliverables && (
                <>
                  <Divider sx={{ my: 2, borderColor: "#333" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00e676", fontWeight: 600 }}
                  >
                    Final Deliverables
                  </Typography>
                  <List dense>
                    {module.finalDeliverables.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#00e676" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          sx={{ color: "#ccc" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default CourseSyllabus;
