import React from "react";
import "./Terms.css";
// import Accordion from 'react-bootstrap/Accordion';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Terms() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="terms">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            Terms and Conditions of Use
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Welcome to OldyGoldyHouse. Please read these terms and conditions
            carefully before using the Website. By accessing or using the
            Website, you agree to be bound by these terms and conditions. If you
            do not agree with any part of these terms and conditions, please do
            not use the Website.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            Intellectual Property
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The content, design, and intellectual property on this Website are
            owned by OldyGoldyHouse and protected by copyright and trademark
            laws. You may not reproduce, modify, distribute, or display any part
            of this site without our prior written consent.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            User Content
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            By submitting content to the Website, you grant OldyGoldyHouse a
            non-exclusive, royalty-free, perpetual, irrevocable, and fully
            sublicensable right to use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, and display
            such content throughout the world in any media.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            Privacy Policy
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Please review our Privacy Policy to understand how we collect, use
            and protect your personal information.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            Disclaimer
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The information provided on the Website is for general informational
            purposes only. We make no representations or warranties about the
            accuracy, completeness, or suitability of this information for any
            purpose.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            Links to Third-Party Websites
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The Website may contain links to third-party websites. We have no
            control over the content, privacy policies, or practices of these
            websites and assume no responsibility for them.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>
            Changes to Terms and Conditions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            These terms and conditions are governed by and construed in
            accordance with the laws. Any disputes relating to these terms and
            conditions will be subject to the exclusive jurisdiction of the
            courts.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* <span>Terms and Conditions of Use </span>
      <p>
        Welcome to OldyGoldyHouse. Please read these terms and conditions
        carefully before using the Website. By accessing or using the Website,
        you agree to be bound by these terms and conditions. If you do not agree
        with any part of these terms and conditions, please do not use the
        Website.
      </p>

      <span>Intellectual Property </span>
      <p>
        The content, design, and intellectual property on this Website are owned
        by OldyGoldyHouse and protected by copyright and trademark laws. You may
        not reproduce, modify, distribute, or display any part of this site
        without our prior written consent.
      </p>

      <span>User Content</span>
      <p>
        By submitting content to the Website, you grant OldyGoldyHouse a
        non-exclusive, royalty-free, perpetual, irrevocable, and fully
        sublicensable right to use, reproduce, modify, adapt, publish,
        translate, create derivative works from, distribute, and display such
        content throughout the world in any media.
      </p>

      <span>Privacy Policy</span>
      <p>
        Please review our Privacy Policy to understand how we collect, use and
        protect your personal information.
      </p>

      <span>Disclaimer</span>
      <p>
        The information provided on the Website is for general informational
        purposes only. We make no representations or warranties about the
        accuracy, completeness, or suitability of this information for any
        purpose.
      </p>

      <span>Links to Third-Party Websites </span>
      <p>
        The Website may contain links to third-party websites. We have no
        control over the content, privacy policies, or practices of these
        websites and assume no responsibility for them.
      </p>

      <span>Changes to Terms and Conditions </span>
      <p>
        We reserve the right to modify these terms and conditions at any time.
        It is your responsibility to review them regularly. By continuing to use
        the Website after changes are posted, you agree to the revised terms.
      </p>

      <span>Governing Law</span>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws. Any disputes relating to these terms and conditions will
        be subject to the exclusive jurisdiction of the courts.
      </p> */}
    </div>
  );
}
