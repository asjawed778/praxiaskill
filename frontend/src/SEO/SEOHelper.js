
export const generateOrganizationSchema = ({
    name = "Praxia Skill",
    url = "https://praxiaskill.com",
    // logo = "https://praxiaskill.com/logo.png",
    logo = "../../public/logopng.png",
    sameAs = [
      "https://www.facebook.com/praxiaskill",
      "https://twitter.com/praxiaskill",
      "https://www.instagram.com/praxiaskill/",
      "https://www.linkedin.com/company/praxiaskill/",
    ],
  } = {}) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
  });
  