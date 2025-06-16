import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import seminarpana from "/employabilityskills/seminarpana.png";
import lessionamico from "/employabilityskills/lessionamico.png";
import researcherscuate from "/employabilityskills/researcherscuate.png";
import libraryrafiki from "/employabilityskills/libraryrafiki.png";

const courses = [
  { title: "Certification <br /> Courses" },
  { title: "Summer & Winter <br /> Training for colleges" },
  { title: "Diploma <br /> Courses" },
];
const hybridCourses = [
  { title: "Short Term Course", duration: "30–50 hours" },
  { title: "Mid Term Course", duration: "50–100 hours" },
  { title: "Certification Course", duration: "90–150 hours" },
  { title: "Executive Diploma Course", duration: "90–120 hours" },
  { title: "Summer/Winter Training for College", duration: "20–30 hours" },
];
const coursesOffers = [
  "AI & ML using Python",
  "Industrial IOT",
  "Data Science and Machine Learning",
  "Full Stack Web Developer",
  "Core JAVA",
  "App Developer",
  "Python",
  "Cyber Security",
  "Block chain Development",
  "DevOps Engineering",
  "Big Data Analytics",
  "Embedded Systems and Robotics",
  "Natural Language Processing (NLP)",
  "Graphic Design",
  "Social Media & Digital Marketing",
  "SEO",
  "Video Editing",
  "Photoshop",
  "Financial Modeling & Valuation Analytics",
  "Investment banking",
  "GST & taxation courses",
  "C & Data Structure",
  "AWS & Cloud Infra",
  "Red Hat Linux",
];
const facilities = [
  {
    title: "Classrooms",
    description: "Modern, technology-equipped classrooms",
    image: lessionamico,
  },
  {
    title: "Labs & Workshops",
    description: "Practical training facilities for hands-on learning.",
    image: researcherscuate,
  },
  {
    title: "Library & Resource Center",
    description: "Extensive resources for research and study",
    image: libraryrafiki,
  },
];
const EmployabilitySkills = () => {
  return (
    <Box>
      <Box sx={{ bgcolor: "#FFF8F8", py: { xs: 1, sm: 2, lg: 3 } }}>
        <Container
          maxWidth="md"
          sx={{ textAlign: { xs: "center", sm: "start" } }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "32px",
                sm: "36px",
                md: "40px",
                lg: "44px",
                xl: "48px",
              },
              fontWeight: 600,
              color: "#F83E5F",
              textAlign: "center",
            }}
          >
            Employability Skills
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                sm: "16px",
                lg: "18px",
              },
              textAlign: "center",
            }}
          >
            Our Employability Skill programs are designed to prepare learners
            for real-world career success through technical training, soft
            skills development, professional grooming, and hands-on experience.
            With industry-relevant courses, modern infrastructure, corporate
            training modules, and strategic partnerships, we bridge the gap
            between education and employment—empowering students and
            professionals to thrive in today’s job market.
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          py: { xs: 1, md: 2, },
          textAlign: "center",
          bgcolor: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "28px",
              sm: "32px",
              md: "36px",
              lg: "40px",
              xl: "44px",
            },
            fontWeight: 600,
            color: "#646464",
          }}
        >
          UG/PG Segment
        </Typography>

        <Grid container spacing={{xs: 2, md: 3}} justifyContent="center" alignItems="center" mt={{xs: 1, md: 2}}>
          {courses.map((item, index) => (
            <Grid item xs={10} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 3,
                  height: 120,
                  width: 200,
                  bgcolor: "#F83E5F",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  fontWeight: 500,
                }}
              >
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                  sx={{
                    fontSize: {
                      xs: "16px",
                      sm: "17px",
                      lg: "18px"
                    }, 
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          py: { xs: 1, sm: 2, lg: 3 },
          textAlign: "center",
          bgcolor: "#fff7f5",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ 
              fontSize: {
              xs: "28px",
              sm: "32px",
              md: "36px",
              lg: "40px",
              xl: "44px",
            }, 
              fontWeight: 600,  
            }}
          >
            Hybrid Skill Training Course type
          </Typography>

          <Grid
            container
            spacing={{xs: 2, md: 3}}
            justifyContent="center"
            alignItems="center"
            mt={{xs: 1, md: 2}}
          >
            {hybridCourses.map((course, index) => (
              <Grid item xs={10} sm={6} md={2.4} key={index}>
                <Box
                  sx={{
                    bgcolor: "#F83E5F",
                    color: "#fff",
                    p: 2,
                    height: 130,
                    width: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 2,
                  }}
                >
                  <Typography 
                    sx={{
                      fontSize: {
                        xs: "15px",
                        sm: "16px",
                        lg: "18"
                      }
                    }}
                  >{course.title}</Typography>
                  <Typography
                    // variant="body2"
                    // fontWeight="medium"
                    sx={{ 
                      mt: 0.5, 
                      fontSize: {
                        xs: "15px",
                        sm: "16px",
                        lg: "18"
                      }
                    }}
                  >
                    (Duration: {course.duration})
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#FFF9F3", py: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Typography
            sx={{ 
              fontSize: {
              xs: "28px",
              sm: "32px",
              md: "36px",
              lg: "40px",
              xl: "44px",
            }, 
              fontWeight: 600, 
              textAlign: "center" 
            }}
          >
            Corporate Training
          </Typography>
          <Grid
            container
            spacing={{ xs: 4, sm: 6, lg: 8 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={{ xs: 2, sm: 3, lg: 4 }}
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "20px",
                    md: "24px",
                    lg: "28px",
                    xl: "32px",
                  },
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Empowering Workforces Through Industry-Relevant Training
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                    lg: "16px",
                  },
                  color: "#667085",
                  mt: 1,
                }}
              >
                Our Corporate Training programs are designed to equip
                organizations with future-ready talent by delivering customized
                skill development solutions across technical, soft skill, and
                professional domains. Whether you’re upskilling your existing
                teams or onboarding new talent, our programs are tailored to
                meet your company’s specific goals and industry standards.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "20px",
                    md: "24px",
                    lg: "28px",
                    xl: "32px",
                  },
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                What We Offer
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "18px",
                    md: "20px",
                    lg: "22px",
                    xl: "24px",
                  },
                  fontWeight: 600,
                  mt: { xs: 1, md: 2 },
                }}
              >
                Technical Skills Training
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                    lg: "16px",
                  },
                  color: "#667085",
                }}
              >
                Hands-on training in high-demand technologies like AI, Data
                Science, Cybersecurity, Full Stack Development, Cloud Computing,
                DevOps, and more.
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "18px",
                    md: "20px",
                    lg: "22px",
                    xl: "24px",
                  },
                  fontWeight: 600,
                  mt: { xs: 1, md: 2 },
                }}
              >
                Soft Skills Training
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                    lg: "16px",
                  },
                  color: "#667085",
                }}
              >
                Communication, leadership, teamwork, time management, emotional
                intelligence, and workplace etiquette to foster a productive and
                professional work environment.
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "18px",
                    md: "20px",
                    lg: "22px",
                    xl: "24px",
                  },
                  fontWeight: 600,
                  mt: { xs: 1, md: 2 },
                }}
              >
                Professional Development
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                    lg: "16px",
                  },
                  color: "#667085",
                }}
              >
                Programs focused on business communication, corporate ethics,
                project management, and personal branding to support career
                advancement and organizational impact.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#667085", py: { xs: 2, md: 4 }, color: "#fff" }}>
        <Typography
          sx={{
            fontSize: {
              xs: "28px",
              sm: "32px",
              md: "36px",
              lg: "40px",
              xl: "44px",
            }, 
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Infrastructure & Facilities
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, sm: 2, lg: 3 },
            mt: { xs: 1, sm: 2 },
          }}
        >
          {facilities.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                maxWidth: 300,
                maxHeight: 320,
                bgcolor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "19px",
                    lg: "20px",
                  },
                  color: "#667085",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>

              <Box
                sx={{
                  maxHeight: 180,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "17px",
                    lg: "18px",
                  },
                  color: "#000",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployabilitySkills;
