import {
  Box,
  Grid,
  Typography,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import growth from "@/assets/images/growth.png";
import Companyamico from "@/assets/images/companyamico.png";
import Moneymotivationbro from "@/assets/images/moneymotivationbro.png";
import Marketingamico from "@/assets/images/marketingamico.png";
import Lawfirmbro from "@/assets/images/lawfirmbro.png";
import Teamworkrafiki from "@/assets/images/teamworkrafiki.png";
import Taskbro from "@/assets/images/taskbro.png";
import skillset from "@/assets/images/skillset.png";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SEOHelmet from "../../../SEO/SEOHelmet";
import { entrepreneurialSkills } from "../../../SEO/meta-data";

const sections = [
  {
    img: Companyamico,
    title: "Foundation Business Skills",
    description:
      "Develop a strong entrepreneurial foundation by learning essential business practices such as planning, operations management, decision-making, communication, and customer service—skills needed to confidently start and run a business.",
  },
  {
    img: Moneymotivationbro,
    title: "Financial Literacy",
    description:
      "Gain practical knowledge of financial management, including budgeting, profit calculation, bookkeeping, taxation, pricing strategies, investment planning, and understanding funding sources to make informed business decisions.",
  },
  {
    img: Marketingamico,
    title: "Marketing and Sales",
    description:
      "Master the core principles of identifying target markets, building brand identity, creating compelling marketing campaigns, and executing sales strategies—both traditional and digital—to effectively promote and grow your venture.",
  },
  {
    img: Lawfirmbro,
    title: "Legal and Regulatory Knowledge",
    description:
      "Understand key legal requirements for setting up and running a business, including registrations, licenses, intellectual property rights, contracts, labor laws, and tax regulations to ensure compliance and reduce risk.",
  },
  {
    img: Teamworkrafiki,
    title: "Sector-Specific Training",
    description:
      "Receive in-depth, hands-on training customized to specific industries such as Agribusiness, IT, Tourism, Food Processing, and more—equipping you with the specialized skills and insights needed to thrive in your chosen field.",
  },
  {
    img: Taskbro,
    title: "Government Schemes and Support",
    description:
      "Get guidance on navigating and utilizing various government initiatives, funding programs, startup schemes, and subsidies that are designed to support new and small business owners in launching and scaling their ventures.",
  },
];
const courses = [
  "Agribusiness",
  "Handicrafts and Cottage Industries",
  "Tourism and Ecotourism",
  "Dairy and Animal Husbandry",
  "Fisheries and Aquaculture",
  "Food Processing",
  "Renewable Energy",
  "Hardware & Networking",
  "Information Technology (IT) and Digital Services",
];
const EntrepreneurialSkills = () => {
  const vocational = [
    "Entrepreneur Skill Development",
    "Rural Agri-preneur development",
    "MSME Setup Module",
    "Basic Financial Training",
  ];
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <SEOHelmet
        title={entrepreneurialSkills.title}
        description={entrepreneurialSkills.description}
        keywords={entrepreneurialSkills.keywords}
        url={entrepreneurialSkills.url}
        image={entrepreneurialSkills.image}
      />
      <Box sx={{ bgcolor: "#FFF8F8", py: { xs: 1, sm: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid size={{ xs: 12, sm: 7 }}>
              <Box sx={{ textAlign: { xs: "center", sm: "start" } }}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: {
                      xs: "32px",
                      sm: "36px",
                      md: "40px",
                      lg: "44px",
                      xl: "48px",
                    },
                    mb: { xs: 1, md: 2 },
                    fontWeight: 600,
                    color: "#F83E5F",
                  }}
                >
                  Entrepreneurial Skills
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                    },
                  }}
                >
                  Our Entrepreneurial Skills program equips learners with
                  essential business knowledge, hands-on sector-specific
                  training, financial literacy, marketing, legal know-how, and
                  access to government schemes. Delivered through a hybrid
                  learning model, guided by expert mentors, and backed by
                  academic, industry, and government partnerships — this program
                  is designed to turn your ideas into real, sustainable
                  businesses.
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                  mt={{ xs: 1, sm: 2, md: 3 }}
                >
                  {[
                    "Practical Business Skills",
                    "Industry-Specific Training",
                    "Hybrid Learning & Certification",
                  ].map((point) => (
                    <Box
                      key={point}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <VerifiedOutlined
                        sx={{
                          color: "#FF0000",
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            md: "16px",
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: {
                            xs: "12px",
                            md: "14px",
                            xl: "15px",
                          },
                        }}
                      >
                        {point}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <Box
                sx={{
                  maxWidth: 350,
                  maxHeight: 398,
                  // height: {xs: 300, sm: 350, md: 358},
                  bgcolor: "inherit",
                  mx: "auto",
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src={growth}
                  alt="Entrepreneurial Growth"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#EEF4FF" }}>
        <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: "24px",
                sm: "28px",
                md: "32px",
                lg: "36px",
              },
              color: "#F60101",
              textAlign: "center",
              fontWeight: 600,
              mb: { xs: 1, sm: 2, md: 3 },
            }}
          >
            Vocational Training for Rural Area
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 3 },
              justifyContent: "center",
            }}
          >
            {vocational?.map((item, index) => {
              const words = item.trim().split(" ");
              const lastWord = words.pop();
              const firstPart = words.join(" ");

              return (
                <Box
                  key={index}
                  sx={{
                    bgcolor: "#22B286",
                    width: 193,
                    height: 75,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                    px: 1,
                    textWrap: "balance",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        lg: "18px",
                      },
                      fontWeight: 500,
                    }}
                  >
                    {firstPart} <br /> {lastWord}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
      <Box sx={{ py: { xs: 2, sm: 2, md: 4 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
              lg: "36px",
            },
            color: "#F60101",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Entrepreneurship Skill Set Development Courses
        </Typography>
        <Container maxWidth="md">
          {sections?.map((section, index) => (
            <Grid
              key={index}
              container
              spacing={{ xs: 2, md: 4 }}
              direction={
                isSmDown ? "column" : index % 2 === 0 ? "row" : "row-reverse"
              }
              alignItems="center"
              sx={{ mt: { xs: 2, sm: 3, md: 4 } }}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  component="img"
                  src={section.img}
                  alt={section.title}
                  sx={{ width: "100%", maxHeight: 240, objectFit: "contain" }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "24px",
                      md: "28px",
                      lg: "32px",
                    },
                    fontWeight: 600,
                    mt: { xs: 0, sm: 0.5 },
                    color: "#000",
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      lg: "18px",
                    },
                  }}
                >
                  {section.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Box>
      <Box
        sx={{ bgcolor: "#0C1B32", py: { xs: 2, sm: 4, md: 6 }, color: "#fff" }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: "24px",
                sm: "28px",
                md: "32px",
                lg: "36px",
              },
              textAlign: "center",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Entrepreneurship Skill Set Development Courses
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 4, lg: 6 }} alignItems="center">
            {/* Left Image */}
            <Grid
              size={{ xs: 12, sm: 6 }}
              sx={{
                mt: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Box
                component="img"
                src={skillset}
                alt="Entrepreneurship Courses"
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            </Grid>

            {/* Right Content */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box>
                {courses?.map((course) => (
                  <Box
                    key={course}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1, sm: 2 },
                      mt: { xs: 1, md: 2 },
                    }}
                  >
                    <TaskAltOutlinedIcon
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                          md: "18px",
                        },
                        color: "#fff",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                          md: "18px",
                        },
                        color: "#fff",
                      }}
                    >
                      {course}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default EntrepreneurialSkills;
