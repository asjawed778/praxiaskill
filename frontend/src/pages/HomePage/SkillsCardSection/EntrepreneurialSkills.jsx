import {
  Box,
  Grid,
  Typography,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";
import growth from "../../../../public/entrepreneurialskills/growth.png";
import Companyamico from "../../../../public/entrepreneurialskills/Companyamico.png";
import Moneymotivationbro from "../../../../public/entrepreneurialskills/Moneymotivationbro.png";
import Marketingamico from "../../../../public/entrepreneurialskills/Marketingamico.png";
import Lawfirmbro from "../../../../public/entrepreneurialskills/Lawfirmbro.png";
import Teamworkrafiki from "../../../../public/entrepreneurialskills/Teamworkrafiki.png";
import Taskbro from "../../../../public/entrepreneurialskills/Taskbro.png";
import skillset from "../../../../public/entrepreneurialskills/skillset.png";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

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
      <Box sx={{ bgcolor: "#FFF8F8", py: {xs: 2, sm: 4}}}>
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
                  sx={{
                    fontSize: {
                      xs: "32px",
                      sm: "36px",
                      md: "40px",
                      lg: "44px",
                      xl: "48px",
                    },
                    mb: 2,
                    fontWeight: 600,
                    color: "#F83E5F",
                  }}
                >
                  Entrepreneurial Skills
                </Typography>

                <Typography>
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
                  spacing={{ xs: 1, sm: 4 }}
                  mt={3}
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
                        fontSize="small"
                        sx={{ color: "#FF0000" }}
                      />

                      <Typography sx={{ fontSize: "14px" }}>{point}</Typography>
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
        <Container maxWidth="md" sx={{ py: {xs: 2, sm: 4} }}>
          <Typography
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
              mb: 3,
            }}
          >
            Vocational Training for Rural Area
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
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
                  <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                    {firstPart} <br /> {lastWord}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
      <Box sx={{py: {xs: 2, sm: 4} }}>
        <Typography
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
            mb: 3,
          }}
        >
          Entrepreneurship Skill Set Development Courses
        </Typography>
        <Container maxWidth="md">
          {sections?.map((section, index) => (
            <Grid
              key={index}
              container
              spacing={4}
              direction={
                isSmDown ? "column" : index % 2 === 0 ? "row" : "row-reverse"
              }
              alignItems="center"
              sx={{ mb: 6 }}
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
                    mb: 1,
                    color: "#000",
                  }}
                >
                  {section.title}
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  {section.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#0C1B32", py: {xs: 4, sm: 6,}, color: "#fff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              mb: 4,
              color: "#fff",
            }}
          >
            Entrepreneurship Skill Set Development Courses
          </Typography>

          <Grid container spacing={4} alignItems="center">
            {/* Left Image */}
            <Grid size={{xs:12, sm: 6}}>
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
            <Grid size={{xs:12, sm: 6}}>
              <Box>
                {courses?.map((course) => (
                  <Box
                    key={course}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: {xs: 1, md: 2},
                    }}
                  >
                    <TaskAltOutlinedIcon
                      sx={{ fontSize: "18px", color: "#fff" }}
                    />
                    <Typography sx={{ fontSize: "16px", color: "#fff" }}>
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
